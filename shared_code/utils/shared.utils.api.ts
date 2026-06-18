import { fetchUserAavegotchis } from '../web3/shared.queries.helper';

const _ = require('lodash');
const fetch = require('node-fetch');
const Decimal = require('decimal.js');
const WEARABLES = require('../data/wearables_combat_specs.json');

const url = process.env.NEXT_PUBLIC_API_URL || 'https://api.gotchiverse.io';

const { DEFAULT_GOTCHI_PROPERTIES, ALCHEMICA_MAX_CARRY_QUANTITY, GAME_CONFIG } = require('../constants/const.game');

let logger = console;

export async function fetchParcelMetadata(parcelId) {
  try {
    return fetch(`${url}/realm/parcel/info?parcelId=${parcelId}`)
      .then((response) => response.json())
      .then(({ data }) => data);
  } catch (e) {
    console.warn('Failed to load selected parcel Metadata via API', e);
  }
}

export async function fetchParcelMetadataByParcelIds(parcelIds) {
  try {
    return fetch(`${url}/realm/parcel/info?parcelId=${parcelIds.join(',')}`)
      .then((response) => response.json())
      .then(({ data }) => data);
  } catch (e) {
    console.warn('Failed to load selected parcel Metadata via API', e);
  }
}

export async function fetchParcelMetadataByTokenId(tokenId) {
  try {
    return fetch(`${url}/realm/parcel/info?tokenId=${tokenId}`)
      .then((response) => response.json())
      .then(({ data }) => data[0]);
  } catch (e) {
    console.warn('Failed to load selected parcel Metadata via API', e);
  }
}

export async function fetchParcelMetadataByTokenIds(tokenIds) {
  try {
    return fetch(`${url}/realm/parcel/info?tokenId=${tokenIds.join(',')}`)
      .then((response) => response.json())
      .then(({ data }) => data);
  } catch (e) {
    console.warn('Failed to load selected parcel Metadata via API', e);
  }
}

export function parcelMetadataToContractInput(parcelMetadata) {
  const parcelArray = parcelMetadata.parcelId.split('-');
  //  const region = parcelArray[0];
  const x = parcelArray[1];
  const y = parcelArray[2];
  const orientation = parcelArray[3];

  const size = _sizeNameToId(orientation);

  return {
    coordinateX: x,
    coordinateY: y,
    parcelId: parcelMetadata.parcelId,
    size,
    boost: parcelMetadata.boost,
    parcelAddress: parcelMetadata.parcelHash,
    district: parcelMetadata.district,
  };
}

function _sizeNameToId(
  orientation // H=humble, R=reasonable, U=horizontal, S=spacious
) {
  // 0=humble, 1=reasonable, 2=spacious vertical, 3=spacious horizontal, 4=partner
  if (orientation === 'H') return 0;
  if (orientation === 'R') return 1;
  if (orientation === 'V') return 2;
  if (orientation === 'U') return 3;
  return 0;
}

export async function fetchParcelImageData(parcelId, size) {
  return fetch(`${url}/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${parcelId},${size}`)
    .then((response) => response.json())
    .then((data) => data);
}

export async function getGotchiData(address, gotchiId) {
  let gotchis;
  let matchingGotchiFromGraph;
  try {
    gotchis = await fetchUserAavegotchis(address, gotchiId);
    matchingGotchiFromGraph = _.find(gotchis, (gotchi) => (gotchi.tokenId ? String(gotchi.tokenId) : String(gotchi.id)) === String(gotchiId));
  } catch (er) {
    console.warn(er);
    return {};
  }

  if (!matchingGotchiFromGraph) {
    return {};
  }

  return gotchis[0];
}

export function applyWearables(obj, loggerInstance = null) {
  // todo: can we get WeaponType enum from server into shared ?
  const WeaponType = {
    Melee: 'Melee Weapon',
    Ranged: 'Ranged Weapon',
  };

  const trackWearableBonus = (trait, increase) => {
    if (!obj.wearableTraitBonuses) {
      obj.wearableTraitBonuses = {};
    }
    if (!obj.wearableTraitBonuses[trait]) {
      obj.wearableTraitBonuses[trait] = 0;
    }
    obj.wearableTraitBonuses[trait] = Number(Decimal.sum(obj.wearableTraitBonuses[trait], increase));
  };

  obj.leftWeapon = {
    type: WeaponType.Ranged,
    APCostMultiplier: 1,
    power: 0,
  };
  obj.rightWeapon = {
    type: WeaponType.Melee,
    APCostMultiplier: 1,
    power: 0,
  };

  Decimal.set({ precision: 4 });
  // Names of the wearables slots in the order they are stored in the obj.wearables array
  const wearableSlots = ['Body', 'Face', 'Eyes', 'Hat', 'Right hand', 'Left hand', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];

  let wearableSlot = 0;
  for (const wearableId in obj.wearables) {
    if (loggerInstance) loggerInstance.info('Applying wearable: ', obj.wearables[wearableId]);
    const wearableData = WEARABLES[obj.wearables[wearableId]];

    if (wearableData) {
      const type = wearableData['Type'];
      if (type === 'Ranged Weapon' || type === 'Melee Weapon') {
        const APCostMultiplier = Number(wearableData['AP Cost Multiplier']) || 1;
        if (wearableSlots[wearableSlot] === 'Right hand') {
          obj.rightWeapon.type = type;
          obj.rightWeapon.APCostMultiplier = APCostMultiplier;
          obj.rightWeapon.power = Number(obj.rightWeapon.type === WeaponType.Melee ? wearableData['Melee Power'] : wearableData['Ranged Power']) || 0;
        } else if (wearableSlots[wearableSlot] === 'Left hand') {
          obj.leftWeapon.type = type;
          obj.leftWeapon.APCostMultiplier = APCostMultiplier;
          obj.leftWeapon.power = Number(obj.leftWeapon.type === WeaponType.Melee ? wearableData['Melee Power'] : wearableData['Ranged Power']) || 0;
        }
      }
    }

    for (const stat in wearableData) {
      const value = wearableData[stat];
      switch (stat) {
        case 'Carrying Capacity':
          obj.alchemicaCarryingCapacity = Number(Decimal.sum(obj.alchemicaCarryingCapacity, value));
          trackWearableBonus('alchemicaCarryingCapacity', value);
          if (loggerInstance) loggerInstance.info(`Carrying Capacity increased by  ${value} with total ${obj.alchemicaCarryingCapacity}`);
          break;
        case 'AP Regen':
          obj.apRegenAmount = Number(Decimal.sum(obj.apRegenAmount, value));
          trackWearableBonus('apRegenAmount', value);
          if (loggerInstance) loggerInstance.info(`AP Regen increased by  ${value}`);
          break;
        case 'HP Regen':
          obj.healthRegenAmount = Number(Decimal.sum(obj.healthRegenAmount, value));
          trackWearableBonus('healthRegenAmount', value);
          if (loggerInstance) loggerInstance.info(`HP Regen increased by  ${value}`);
          break;
        case 'AP Capacity':
          obj.maxAP = Number(Decimal.sum(obj.maxAP, value));
          trackWearableBonus('maxAP', value);
          if (loggerInstance) loggerInstance.info(`Max AP increased by  ${value}  with total ${obj.maxAP}`);
          break;
        case 'HP Capacity':
          // @ts-ignore
          obj.maxHealth = Math.ceil(Decimal.sum(obj.maxHealth, value));
          trackWearableBonus('maxHealth', value);
          if (loggerInstance) loggerInstance.info(`Max HP increased by  ${value} with total ${obj.maxHealth}`);
          break;
        case 'Evasion':
          obj.evasion = Number(Decimal.sum(obj.evasion, value));
          trackWearableBonus('evasion', value);
          if (loggerInstance) loggerInstance.info(`Evasion increased by  ${value}`);
          break;
        case 'Armor Power':
          obj.defense = Number(Decimal.sum(obj.defense, value));
          trackWearableBonus('defense', value);
          if (loggerInstance) loggerInstance.info(`Defense power increased by  ${value} with total ${obj.defense}`);
          break;
        case 'Movement Speed':
          obj.baseSpeed = Number(Decimal.sum(obj.baseSpeed, value));
          trackWearableBonus('baseSpeed', value);
          if (loggerInstance) loggerInstance.info(`Movement speed increased by  ${value} with total ${obj.baseSpeed}`);
          break;
        case 'Road Speed':
          obj.roadSpeedBonus = Number(Decimal.sum(obj.roadSpeedBonus, value));
          trackWearableBonus('roadSpeedBonus', value);
          if (loggerInstance) loggerInstance.info(`Road speed boost increased by  ${value} with total ${obj.roadSpeedBonus}`);
          break;
        case 'Alchemica Speed':
          obj.alchemicaSpeedBonus = Number(Decimal.sum(obj.alchemicaSpeedBonus, value));
          trackWearableBonus('alchemicaSpeedBonus', value);
          if (loggerInstance) loggerInstance.info(`Alchemica speed boost increased by  ${value} with total ${obj.alchemicaSpeedBonus}`);
          break;
        case 'Luck':
          obj.luck = Number(Decimal.sum(obj.luck, value));
          trackWearableBonus('luck', value);
          if (loggerInstance) loggerInstance.info(`Luck increased by  ${value} with total ${obj.luck}`);
          break;
        case 'Melee Power':
          // note we don't modify meleePower here because that is the base gotchi value and hand weapon attack bonus is added on top of that unique to the hand
          // so we just track the bonus here
          trackWearableBonus('meleePower', value);
          break;
        case 'Ranged Power':
          // note we don't modify rangedPower here because that is the base gotchi value and hand weapon attack bonus is added on top of that unique to the hand
          // so we just track the bonus here
          trackWearableBonus('rangedPower', value);
          break;
        default:
          break;
      }
    }
    wearableSlot++;
  }
}

export function getPlayerMaxHealth(player) {
  let base = DEFAULT_GOTCHI_PROPERTIES.health;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerMaxHealth: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const nrg = player.traitStats.NRG;
    if (nrg < threshold) {
      const diff = Number(Decimal.sub(threshold, nrg));
      const baseInc = Number(Decimal.mul(GAME_CONFIG.maxHealthBuffCoef, diff));
      base = Number(Decimal.add(base, baseInc));
    }
  }
  return Math.min(base, GAME_CONFIG.maxHealth); // Add a cap on possible health
}

export function getPlayerMaxAP(player) {
  let base = DEFAULT_GOTCHI_PROPERTIES.ap;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerMaxAP: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const nrg = player.traitStats.NRG;
    if (nrg > threshold) {
      const diff = Number(Decimal.sub(nrg, threshold - 1));
      const baseInc = Number(Decimal.mul(GAME_CONFIG.maxAPBuffCoef, diff));
      base = Number(Decimal.add(base, baseInc));
    }
  }
  return Math.min(base, GAME_CONFIG.maxAP); // Add a cap on possible AP
}

export function getPlayerRangedPower(player) {
  let base = GAME_CONFIG.baseRangedPower;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerRangedPower: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const brn = player.traitStats.BRN;
    if (brn > threshold) {
      const diff = Number(Decimal.sub(brn, threshold - 1));
      const diffTimesCoef = Number(Decimal.mul(GAME_CONFIG.rangeBuffCoef, diff));
      base = Number(Decimal.add(base, diffTimesCoef));
    }
  }
  return base;
}

export function getPlayerMeleePower(player) {
  let base = GAME_CONFIG.baseMeleePower;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerMeleePower: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const brn = player.traitStats.BRN;
    if (brn < threshold) {
      const diff = Number(Decimal.sub(threshold, brn));
      const diffTimesCoef = Number(Decimal.mul(GAME_CONFIG.meleeBuffCoef, diff));
      base = Number(Decimal.add(base, diffTimesCoef));
    }
  }
  return Math.round(base);
}

export function getPlayerDefense(player) {
  let base = GAME_CONFIG.baseDefense;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerDefense: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const agg = player.traitStats.AGG;
    if (agg < threshold) {
      const diff = Number(Decimal.sub(threshold, agg));
      const diffTimesCoef = Number(Decimal.mul(1, diff));
      base = Number(Decimal.add(base, diffTimesCoef));
    }
  }
  return base;
}

export function getPlayerAlchemicaCarryingCapacity(player) {
  // @ts-ignore
  if (!player.traitStats) {
    return ALCHEMICA_MAX_CARRY_QUANTITY;
  }

  // @ts-ignore
  return Math.max(ALCHEMICA_MAX_CARRY_QUANTITY, Math.ceil(100 * Math.pow(player.traitStats.BRS / 300, 2)));
}

function getPlayerBaseSpeed(LOADED_MAP) {
  return LOADED_MAP.GOTCHI_SPEED;
}

export function getPlayerEvasion(player) {
  // this returns base evasion, no longer modified by SPK>50 which now increases evasion through the luck stat which is used during evade()
  return GAME_CONFIG.baseEvasion;
}

function getPlayerLuck(player) {
  let base = GAME_CONFIG.baseLuck;
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerLuck: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    const spk = player.traitStats.SPK;
    if (spk >= threshold) {
      const diff = Number(Decimal.sub(spk, threshold));
      const diffTimesCoef = Number(Decimal.mul(GAME_CONFIG.luckBuffCoef, diff));
      base = Number(Decimal.add(base, diffTimesCoef));
    }
  }
  // calculate down to 3rd decimal
  return Number(base.toFixed(3));
}

export function getPlayerAttackSpeed(player) {
  let base = 1;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerAttackSpeed: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const agg = player.traitStats.AGG;
    if (agg > threshold) {
      const diff = Number(Decimal.sub(agg, threshold - 1));
      const diffTimesCoef = Number(Decimal.mul(GAME_CONFIG.actionSpeedBuffCoef, diff));
      base = Number(Decimal.add(base, diffTimesCoef));
    }
  }
  base = Math.min(GAME_CONFIG.maxAttackSpeedModifier, base);
  return base;
}

// Return a minimum amount of ms between two atacks
function getPlayerAttackIntervals(player) {
  player.attackSpeed = getPlayerAttackSpeed(player);
  const calcFireRate = Number(Decimal.mul(GAME_CONFIG.fireRate, player.attackSpeed));
  let minFireInterval = 1000 / Math.ceil(calcFireRate);
  // round to no more than 3 decimals
  minFireInterval = Number(minFireInterval.toFixed(3));
  const calcMeleeRate = Number(Decimal.mul(GAME_CONFIG.meleeRate, player.attackSpeed));
  // round to no more than 3 decimals
  let minMeleeInterval = 1000 / Math.ceil(calcMeleeRate);
  minMeleeInterval = Number(minMeleeInterval.toFixed(3));
  return { minFireInterval, minMeleeInterval };
}

export function getPlayerRegenAmount(player, type) {
  let base = type === 'health' ? GAME_CONFIG.healthRegenPerSecond : GAME_CONFIG.apRegenPerSecond;
  // @ts-ignore
  if (!player.traitStats) {
    if (logger) logger.info(`getPlayerRegenAmount: Player "${player.name}" (${player.id}) has no traitStats props!`);
  } else {
    const threshold = 50;
    // @ts-ignore
    const spk = player.traitStats.SPK;
    if (spk < threshold) {
      const diff = Number(Decimal.sub(threshold, spk));
      const diffTimesCoef = Number(Decimal.mul(GAME_CONFIG.regenBuffCoef, diff));
      base = Number(Decimal.mul(base, 1 + diffTimesCoef));
    }
  }
  return base;
}

export function getPlayerDamageReduction(player) {
  const calculatedDefense = Number(Decimal.mul(player.defense, 0.005));
  // calculating down to the 3rd decimal
  return Number(Math.min(1, Number(Decimal.div(calculatedDefense, 1 + calculatedDefense))).toFixed(3));
}

export function applyTraitsAndWearables(obj, gotchiData, loggerInstance = null) {
  obj.traitStats = {
    NRG: gotchiData.withSetsNumericTraits?.[0] || 0,
    AGG: gotchiData.withSetsNumericTraits?.[1] || 0,
    SPK: gotchiData.withSetsNumericTraits?.[2] || 0,
    BRN: gotchiData.withSetsNumericTraits?.[3] || 0,
    BRS: parseInt(gotchiData.withSetsRarityScore),
  };
  obj.wearables = gotchiData.equippedWearables;
  if (loggerInstance) {
    loggerInstance.info(`Player ${obj.id} assigned traits: ${JSON.stringify(obj.traitStats)}`);
    loggerInstance.info(`Player ${obj.id} assigned wearables: ${JSON.stringify(obj.wearables)}`);
  }
}

export function applyGotchiTraits(obj, simulateSocket = false, LOADED_MAP, loggerInstance = null) {
  // these get copied from player.socket server to other servers but initted on player.socket server
  if (obj.socket || simulateSocket) {
    obj.maxHealth = getPlayerMaxHealth(obj);
    obj.maxAP = getPlayerMaxAP(obj);
  }

  if (!obj.health) {
    _.assign(obj, { health: obj.maxHealth });
  }
  if (!obj.ap) {
    _.assign(obj, { ap: obj.maxAP });
  }

  // these properties are trait based (player.traitStats)
  // only try to regenerate them if they are not already present
  obj.rangedPower = getPlayerRangedPower(obj);
  obj.meleePower = getPlayerMeleePower(obj);
  obj.defense = getPlayerDefense(obj);
  obj.alchemicaCarryingCapacity = getPlayerAlchemicaCarryingCapacity(obj);
  obj.baseSpeed = getPlayerBaseSpeed(LOADED_MAP);
  obj.evasion = getPlayerEvasion(obj);
  obj.luck = getPlayerLuck(obj);
  obj.apCostMultiplier = 1;
  obj.roadSpeedBonus = 0;
  obj.alchemicaSpeedBonus = 0;

  if (!obj.minFireInterval || !obj.minMeleeInterval) {
    const { minFireInterval, minMeleeInterval } = getPlayerAttackIntervals(obj);
    obj.minFireInterval = minFireInterval;
    obj.minMeleeInterval = minMeleeInterval;
  }

  // add trait based HP and Health regen
  if (GAME_CONFIG.enableHealthRegen) {
    obj.healthRegenAmount = getPlayerRegenAmount(obj, 'health');
    obj.apRegenAmount = getPlayerRegenAmount(obj, 'AP');
  }

  // note this should be set before initial lastSaved based regen below as wearables impact max health / AP
  if (GAME_CONFIG.enableWearables) {
    applyWearables(obj, loggerInstance);
  }

  // Needs to be computed after applying wearables since the wearables might impact some of the base stats
  // this depends on
  obj.damageReduction = getPlayerDamageReduction(obj);

  if (loggerInstance) {
    loggerInstance.info(`computeGotchiTraits, player: ${obj.id}, health: ${obj.health}, maxHealth: ${obj.maxHealth}, ap: ${obj.ap}, maxAP: ${obj.maxAP}`);
    loggerInstance.info(`computeGotchiTraits, player: ${obj.id}, rangedPower: ${obj.rangedPower}, meleePower: ${obj.meleePower}, defense: ${obj.defense}, damageReduction: ${obj.damageReduction}`);
    loggerInstance.info(`computeGotchiTraits, player: ${obj.id}, alchemicaCarryingCapacity: ${obj.alchemicaCarryingCapacity}, baseSpeed: ${obj.baseSpeed}, evasion: ${obj.evasion}, luck: ${obj.luck}`);
    loggerInstance.info(`computeGotchiTraits, player: ${obj.id}, minFireInterval: ${obj.minFireInterval}, minMeleeInterval: ${obj.minMeleeInterval}, apCostMultiplier: ${obj.apCostMultiplier}`);
    loggerInstance.info(`computeGotchiTraits, player: ${obj.id}, healthRegenAmount: ${obj.healthRegenAmount}, apRegenAmount: ${obj.apRegenAmount}`);
  }
}

export default {};
