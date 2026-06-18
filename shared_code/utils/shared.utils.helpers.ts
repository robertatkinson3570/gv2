const Decimal = require('decimal.js');
const { PLAYER_WALLET_SUPPORTED_TOKENS, GAME_CONFIG } = require('../constants/const.game');
const itemShopItemsById = require('../data/item-shop.json');

export const toUpperCaseFirst = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

// GPT-3.5 generated function for converting to camelCase
export function convertToCamelCase(obj) {
  const newObj = {};

  for (const key in obj) {
    const newKey = key.toLowerCase().replace(/_([a-z])/g, (m, p1) => p1.toUpperCase());
    const value = obj[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      newObj[newKey] = convertToCamelCase(value);
    } else {
      newObj[newKey] = value;
    }
  }

  return newObj;
}

// this shared validator is run when we need to deduct token values from an existing player wallet
// it will validate the parameters of the request and return a sanitized version of the request object OR
// a consistent error message.
// playerWallet format EG {FUD: 34, FOMO:2.4}
// returns { errorMessage, cleanDeductAmountBySymbol }
export function validateWalletTokenDeductRequest(address, playerWallet, deductAmountBySymbol, LOADED_MAP, isTipAction) {
  let validationErrorMsg, cleanDeductAmountBySymbol, errorCode;
  const supportedTokenTypes = isTipAction ? LOADED_MAP.TIP_SUPPORTED_TOKENS : PLAYER_WALLET_SUPPORTED_TOKENS;

  // first sanity check input vars
  if (!address || !playerWallet || !deductAmountBySymbol || !supportedTokenTypes?.length) {
    validationErrorMsg = 'Uh oh, your request was malformed. Please try again.';
    errorCode = 1;
  } else {
    // then clean up the request and validate tip values
    cleanDeductAmountBySymbol = Object.assign({}, deductAmountBySymbol);
    for (const [key, value] of Object.entries(cleanDeductAmountBySymbol)) {
      cleanDeductAmountBySymbol[key] = Number(value);
      // check that all deduct amounts are above zero
      if (!cleanDeductAmountBySymbol[key]) {
        validationErrorMsg = "Can't deduct zero from your balance fren!";
        errorCode = 2;
        break;
      }
      // check that player wallet has enough funds for each token type being deducted
      if (!playerWallet[key] || cleanDeductAmountBySymbol[key] > playerWallet[key]) {
        validationErrorMsg = `You have ${playerWallet[key] || 0} ${key} which isn't enough to deduct ${cleanDeductAmountBySymbol[key]}!`;
        errorCode = 3;
        break;
      }
    }
  }

  if (!validationErrorMsg) {
    if (!GAME_CONFIG.enablePlayerWallet) {
      validationErrorMsg = 'Player wallet features are currently disabled!';
      errorCode = 4;
    } else if (!GAME_CONFIG.enableTipping && isTipAction) {
      validationErrorMsg = 'Tipping / SuperChat features are currently disabled!';
      errorCode = 5;
    }
  }

  // check if an unsupported token type is passed
  if (!validationErrorMsg) {
    const tipTokenTypes = Object.keys(cleanDeductAmountBySymbol);
    const supportedTokensPassed = tipTokenTypes.filter((token) => {
      return supportedTokenTypes.includes(token);
    });
    if (tipTokenTypes.length !== supportedTokensPassed.length) {
      validationErrorMsg = `One or more token types you are deducting are not supported. These are currently supported: ${supportedTokenTypes}`;
      errorCode = 6;
    }
  }

  // check if the tip sum is less than the min allowed or more than the max allowed
  if (!validationErrorMsg) {
    const deductTokenAmounts = (deductAmountBySymbol && Object.values(deductAmountBySymbol)) || [];
    // @ts-ignore
    const deductTotalTokenQuantity = deductTokenAmounts.reduce((a, b) => a + b, 0);
    // hard coded min 1 token Player Wallet withdrawls and max 100k for now
    const minDeductTokenCountAllowed = isTipAction ? LOADED_MAP.TIP_MIN_TOKEN_AMOUNT : 1;
    const maxDeductTokenCountAllowed = isTipAction ? LOADED_MAP.TIP_MAX_TOKEN_AMOUNT : 100000;
    if (deductTotalTokenQuantity < minDeductTokenCountAllowed) {
      validationErrorMsg = `Combined token quantity must be at least ${minDeductTokenCountAllowed}!`;
      errorCode = 7;
    } else if (deductTotalTokenQuantity > maxDeductTokenCountAllowed) {
      validationErrorMsg = `Combined token quantity must be less than ${maxDeductTokenCountAllowed}!`;
      errorCode = 8;
    }
  }

  return {
    validationErrorMsg,
    cleanDeductAmountBySymbol,
    errorCode,
  };
}

// this shared validator is run when making a Player Wallet purchase in the Item Shop
// see validateWalletTokenDeductRequest above. The purchaseOrder parameter should contain an array of Item Store IDs to quantities
// for example [{id: 1, quantity 2}, {id: 2, quantity 3}]
export function validateStorePurchaseRequest(address, playerWallet, remainingInventoryCapacity, purchaseOrder) {
  let purchaseValidationErrorMsg, deductAmountBySymbol, purchaseErrorCode;

  try {
    // first check that the store is enabled and has items
    if (!GAME_CONFIG.enableItemShop || !itemShopItemsById || !Object.keys(itemShopItemsById).length) {
      purchaseValidationErrorMsg = 'The Item Shop is temporarily closed.';
      purchaseErrorCode = 9;
    }

    // then check that all purchasing items exist in inventory and are enabled for purchase
    if (!purchaseValidationErrorMsg) {
      const purchaseItem2ValidState = purchaseOrder.map((item) => Boolean(item.id && itemShopItemsById[item.id]?.purchasable));
      if (purchaseItem2ValidState.includes(false)) {
        const invalidItemId = purchaseOrder[purchaseItem2ValidState.indexOf(false)].id;
        const invalidItemTitle = itemShopItemsById[invalidItemId]?.label || 'UNKNOWN ITEM';
        purchaseValidationErrorMsg = `Item "${invalidItemTitle}" is currently not available for purchase!`;
        purchaseErrorCode = 10;
      }
    }

    // then check that the user inventory has enough space for all items being purchased
    if (!purchaseValidationErrorMsg) {
      const purchaseWeight = purchaseOrder.reduce((sum, item) => sum + item.quantity * Number(itemShopItemsById[item.id].inventory.weight || 0), 0);
      if (remainingInventoryCapacity < purchaseWeight) {
        purchaseValidationErrorMsg = `You need ${purchaseWeight} units of space for this purchase but you have ${remainingInventoryCapacity} remaining!`;
        purchaseErrorCode = 11;
      }
    }

    if (!purchaseValidationErrorMsg) {
      // then add up the purchase token count
      const puchaseAmountBySymbol = {};
      purchaseOrder.forEach((item) => {
        const costPerTokenForItem = itemShopItemsById[item.id].cost;
        for (const key in costPerTokenForItem) {
          const costForTypeQuantity = Number(Decimal.mul(costPerTokenForItem[key], item.quantity));
          if (!puchaseAmountBySymbol[key]) {
            puchaseAmountBySymbol[key] = costForTypeQuantity;
          } else {
            puchaseAmountBySymbol[key] = Number(Decimal.add(puchaseAmountBySymbol[key], costForTypeQuantity));
          }
        }
      });

      // and validate the withdraw from Player Wallet
      const { validationErrorMsg, cleanDeductAmountBySymbol, errorCode } = validateWalletTokenDeductRequest(address, playerWallet, puchaseAmountBySymbol, null, false);
      if (validationErrorMsg) {
        purchaseValidationErrorMsg = validationErrorMsg;
        purchaseErrorCode = errorCode;
      } else {
        deductAmountBySymbol = cleanDeductAmountBySymbol;
      }
    }

    if (purchaseValidationErrorMsg) {
      purchaseValidationErrorMsg = `Purchase failed: ${purchaseValidationErrorMsg}`;
    }
  } catch (er) {
    console.warn('shared.utils.helpers.validateStorePurchaseRequest error thrown', er);
    purchaseValidationErrorMsg = 'Uh oh, the shop had an issue completing your request! Please try again later.';
    purchaseErrorCode = 12;
  }

  return {
    purchaseValidationErrorMsg,
    deductAmountBySymbol,
    errorCode: purchaseErrorCode,
  };
}

// simply return the single item cost by symbols
export function getItemCost(itemId) {
  const puchaseAmountBySymbol = {};
  const costPerTokenForItem = itemShopItemsById[itemId].cost;
  for (const key in costPerTokenForItem) {
    const costForTypeQuantity = Number(Decimal.mul(costPerTokenForItem[key], 1));
    if (!puchaseAmountBySymbol[key]) {
      puchaseAmountBySymbol[key] = costForTypeQuantity;
    } else {
      puchaseAmountBySymbol[key] = Number(Decimal.add(puchaseAmountBySymbol[key], costForTypeQuantity));
    }
  }
  return puchaseAmountBySymbol;
}
