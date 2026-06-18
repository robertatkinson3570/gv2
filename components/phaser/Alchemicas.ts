/* eslint-disable no-case-declarations */
import {
  Alchemica,
  PlayerAlchemica,
  AlchemicaEvent,
  AlchemicaCounters,
  Vector2,
  AlchemicaWithdraw,
  AlchemicaNumbers,
  PlayerWalletWithdraw,
  PlayerWalletDepositUpdate,
  WalletTransactionStatus,
} from 'types';
import Players from './Players';
import _ from 'lodash';
import { updateInGameAlchemica, updateTransactionState, updateTransactionStatusUpdate, updateWithdrawDialog } from 'contexts/UIContexts/actions';
import depositsJson from 'shared_code/data/maps/citaadel/collisions/deposites.json';
import { TransactionState } from 'contexts/UIContexts/store';
import SFXController from 'components/controllers/SFXController';
import AnimationsController from 'components/controllers/animationsController';
import GameController from 'components/controllers/GameController';
import { scene } from 'components/controllers/SceneController';
import GlobalState from 'contexts/GlobalState';
import { updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';

const deposits = _.flattenDeep(_.values(depositsJson));

let vortexGlow;
const itemsCount = 20;
const offsetXY = { x: 130, y: -85 };

export interface AlchemicaInterace {
  create: (items: Alchemica[]) => void;
  destroy: (items: Alchemica[]) => void;
  handleEvent: (data: AlchemicaEvent) => void;
  destroyAll: () => void;
  initAlchemicaHUD: () => void;
  setAlchemicaHUD: (isVisible: boolean, position?: Vector2) => void;
  updateItemsCounter: (playerData: PlayerAlchemica, triggerSound: string, position: Vector2) => void;
  handleOnDepositAnimation: (depositId: number) => void;
  updatePlayerWallet: (playerWallet: AlchemicaNumbers) => void;
  itemsCount: number;
}

const initAlchemicaHUD = () => {
  // interaction key
  scene.interactionContainer = scene.add.container(0, 0);
  const interactImage = scene.add.image(0, 0, 'e_interact').setOrigin(0.5).setScale(0.7);
  interactImage.setName('e_interact');
  interactImage?.setInteractive({ cursor: 'url(/cursors/pointer.png), auto' });

  scene.interactionContainer.add(interactImage);
  scene.interactionContainer.setDepth(400);
  scene.interactionContainer.setActive(false);
  scene.interactionContainer.setVisible(false);

  vortexGlow = scene.add.image(0, 0, 'vortex_glow').setOrigin(0.5).setScale(0.5);
  vortexGlow.setVisible(false);
};

const setAlchemicaHUD = (state: boolean, position?: Vector2) => {
  if (scene?.interactionContainer) {
    scene.activeDeposit = state;

    scene.interactionContainer.setVisible(state);
    vortexGlow.setVisible(state);

    if (position) {
      scene.interactionContainer.setPosition(position.x * 64 + offsetXY.x, position.y * 64 + offsetXY.y);
      vortexGlow.setPosition(position.x * 64, position.y * 64 - 32);
    }
    if (!state) {
      updateWithdrawDialog({ withdrawDialogState: false, alchemica: undefined, depositId: undefined }, GlobalState.UI.dispatch);
    }
  }
};

const create = (items: Alchemica[]): void => {
  // console.log('@Alchemicas.create:', items);
  _.each(items, (item) => {
    const chunkSize = item.quantity;
    if (!chunkSize) return;
    if (chunkSize <= GlobalState.GAME.state.gameConfig.alchemicaChunkSizes[0]) {
      // console.log('@small graphic', chunkSize);
      spawnAlchemica(item, 'small');
    } else if (chunkSize <= GlobalState.GAME.state.gameConfig.alchemicaChunkSizes[1]) {
      // console.log('@medium graphic', chunkSize);
      spawnAlchemica(item, 'medium');
    } else {
      // console.log('@large graphic');
      spawnAlchemica(item, 'large');
    }
  });
};

const spawnAlchemica = (item: Alchemica, size: string) => {
  if (!scene?.sys) return;
  const { id, x, y, label, created, quantity, breadcrumb } = item;
  const frame = AnimationsController.alchemicaSpritesFrames[`${label}_${size}`];
  const key = GlobalState.GAME.state.gameConfig.gotchiverseTheme === 'halloween' ? 'alchemica_candy_x3' : 'alchemica_x3';

  const alchemicaContainer = scene.add
    .container(x, y - 500)
    .setAlpha(0)
    .setDepth(125);

  const pickupItem = scene.add.sprite(0, 0, key, frame).setOrigin(0.5, 0.5).setScale(1.2).setName(item.id.toString());

  alchemicaContainer.add(pickupItem);
  alchemicaContainer.setDataEnabled();
  alchemicaContainer.data.set('quantity', quantity);
  alchemicaContainer.data.set('type', label);
  scene.itemsGroup.set(id, alchemicaContainer);
  AnimationsController.play(pickupItem, `${label}_${size}_${key}`);
  if (created && !breadcrumb) {
    // play anim and sound fx
    handlePickUpFX(alchemicaContainer, item);
  } else {
    alchemicaContainer.y += 500;
    alchemicaContainer.setAlpha(1);
  }
};

const handlePickUpFX = (target, item) => {
  scene.tweens.add({
    targets: [target],
    props: {
      alpha: { value: 1, duration: 500, ease: 'Power2' },
      y: { value: '+=500', duration: 2000, ease: 'Bounce.easeOut' },
    },
    onStart: () => {
      SFXController.playSpatialFX([{ id: `${item.label}_${item.x}_${item.y}`, key: `spillover_spawn_${item.label}`, x: item.x, y: item.y }]);
    },
    delay: Phaser.Math.RND.between(300, 10000),
  });
};

const destroy = (items: Alchemica[]): void => {
  _.each(items, (item) => {
    const { id, destroyed } = item;
    if (scene.itemsGroup) {
      const childToDestroy = scene.itemsGroup.get(id);

      if (childToDestroy) {
        if (destroyed) {
          const pickupAnim = scene.add.sprite(childToDestroy.x, childToDestroy.y, 'pickup', 0).setOrigin(0.5);
          pickupAnim.setDepth(300);
          AnimationsController.play(pickupAnim, 'pickup');
          showQuantityAnimation(childToDestroy);
        }
        childToDestroy.destroy(true);
        scene.itemsGroup.delete(id);
      }
    }
  });
};

const showQuantityAnimation = (container: Phaser.GameObjects.Container) => {
  const quantity = container.getData('quantity');
  const type = container.getData('type');
  const colours = {
    fud: '#3EE88D',
    fomo: '#DD2C26',
    alpha: '#4ADBFB',
    kek: '#CC39FF',
  };

  let pixels = (1 - scene.zoom) * 100;
  pixels = pixels <= 34 ? 34 : pixels;
  pixels = pixels > 80 ? 100 : pixels;
  const yOffset = pixels + 50;
  const quantityText = scene.add.text(container.x, container.y, '+' + quantity.toString(), {
    fontFamily: 'Pixelar',
    fontSize: pixels + 'px',
    stroke: 'bold',
    color: colours[type],
  });
  quantityText.setStroke('#00000066', 3).setDepth(500).setOrigin(0.5);
  scene.tweens.add({
    targets: [quantityText],
    props: {
      alpha: { value: 0, delay: 200, duration: 800, ease: 'Linear' },
      y: { value: `-=${yOffset}`, duration: 800, ease: 'Power2' },
    },
    onComplete: () => {
      quantityText.destroy();
    },
  });
};

const destroyAll = () => {
  if (scene.itemsGroup) {
    scene.itemsGroup.forEach((item) => item.destroy());
    scene.itemsGroup = new Map();
  }
};

const updateItemsCounter = (playerData: PlayerAlchemica, triggerSound?: string): void => {
  const { alchemica, id } = playerData;
  if (Players.isSelectedPlayer(id)) {
    const alchemicaCounters: AlchemicaCounters = {
      fud: alchemica[0],
      fomo: alchemica[1],
      alpha: alchemica[2],
      kek: alchemica[3],
      total: playerData.alchemicaSum ?? 0,
    };

    GlobalState.REALM.dispatch({
      type: 'UPDATE_ALCHEMICA',
      alchemica: alchemicaCounters,
    });

    if (triggerSound) {
      // pickup_fomo_sound_small (e.g. sound)
      SFXController.playFX(triggerSound);
    }
    // console.log(`Alchemica for player ${id}, ${JSON.stringify(alchemicaCounters)}`);
  }
};

const updatePlayerWallet = (playerWallet: AlchemicaNumbers): void => {
  // console.log('@updatePlayerWallet:playerWallet', playerWallet);
  const amounts = { fud: 0, fomo: 0, alpha: 0, kek: 0 };

  _.each(playerWallet, (val, token) => {
    amounts[token.toLowerCase()] = val;
  });

  GlobalState.REALM.dispatch({
    type: 'UPDATE_PLAYER_WALLET',
    playerWallet: amounts,
  });
};

const handleEvent = (data: AlchemicaEvent) => {
  const { items, playerItems, triggerSound } = data;

  switch (data.action) {
    case 'update':
      if (playerItems) {
        updateItemsCounter(playerItems, triggerSound);
      }
      break;

    case 'full-pocket':
      // console.log('full-pocket', data);
      SFXController.playFX('pocket_full');
      break;
    case 'withdraw':
      // console.log('withdraw', data);
      initWithdrawStation(data.data as AlchemicaWithdraw);
      break;

    case 'withdraw-confirmation':
      if (data.transactionState) handleWithdrawConfirmation(data.transactionState);
      break;

    case 'status-update':
      if (data.transactionState) handleWithdrawStatusUpdate(data.transactionState);
      break;

    case 'player-wallet-update':
      updatePlayerWallet(data.items);
      break;

    case 'player-wallet-withdraw-confirmation':
      console.log(`${data.action} response! ${JSON.stringify(data)}`);

      const notificationId = GlobalState.NOTIFICATION.state.withdrawlNotificationId;
      const update: PlayerWalletWithdraw = data.data as PlayerWalletWithdraw;
      if (notificationId) {
        if (update.status && update.status !== 'PENDING') {
          const status = update.status === 'ERRORED' ? 'error' : 'success';
          updateTransactionNotificationStatus(GlobalState.NOTIFICATION.dispatch, notificationId, status);
        }
      }
      if (update.status && update.status === 'ERRORED') {
        GameController.handleToastNotification({ type: 'error', message: `Transaction Error: ${update.error}` });
      }

      break;
    case 'player-wallet-deposit-confirmation':
      const withdrawUpdate: PlayerWalletDepositUpdate = data.data as PlayerWalletDepositUpdate;
      if (!withdrawUpdate.amount || !withdrawUpdate.symbol) return;
      let message = `Deposit ${withdrawUpdate.amount} ${withdrawUpdate.symbol} status: ${withdrawUpdate.status}`;
      if (withdrawUpdate.status === 'COMPLETED') message = `You successfully deposited ${withdrawUpdate.amount} ${withdrawUpdate.symbol}`;

      GameController.handleToastNotification({
        message: message,
        autoClose: true,
        type: getNotificationStatus(withdrawUpdate.status),
      });
      break;

    case 'destroy':
      destroy(items);
      break;

    default:
      break;
  }
};

const getNotificationStatus = (status: WalletTransactionStatus) => {
  switch (status) {
    // 'PENDING' | 'TRANSFERRED' | 'ERRORED' | 'COMPLETED':
    case 'PENDING':
    case 'TRANSFERRED':
      return 'info';
    case 'ERRORED':
      return 'error';
    case 'COMPLETED':
      return 'success';
    default:
      return 'info';
  }
};

const initWithdrawStation = (withdrawData: AlchemicaWithdraw) => {
  console.log('withdrawData', withdrawData);
  const { type, depositId, alchemica } = withdrawData;

  if (deposits[depositId]) {
    const { x, y } = deposits[depositId].position || undefined;
    setAlchemicaHUD(type, { x, y });
    scene.currentAlchemica = type ? alchemica : undefined;
    scene.currentDepositId = type ? depositId : undefined;
  }
};

const handleWithdrawConfirmation = (transactionState: TransactionState) => {
  updateTransactionState(transactionState, GlobalState.UI.dispatch);
};

const handleWithdrawStatusUpdate = (statusUpdate: TransactionState) => {
  updateTransactionStatusUpdate(statusUpdate, GlobalState.UI.dispatch);
};

const handleInGameAlchemica = (inGameAlchemica: number[]) => {
  updateInGameAlchemica(inGameAlchemica, GlobalState.UI.dispatch);
};

const handleOnDepositAnimation = (depositId) => {
  if (scene && deposits[depositId]) {
    const pos = deposits[depositId].position;
    const vfx = scene.add
      .sprite(pos.x * 64, pos.y * 64, 'alchemica_deposit', 0)
      .setOrigin(0.5)
      .setDepth(301);
    AnimationsController.play(vfx, 'alchemica_deposit');
  }
};

const Alchemicas: AlchemicaInterace = {
  handleEvent,
  create,
  destroy,
  destroyAll,
  initAlchemicaHUD,
  setAlchemicaHUD,
  updateItemsCounter,
  handleOnDepositAnimation,
  updatePlayerWallet,
  itemsCount,
};

export default Alchemicas;
