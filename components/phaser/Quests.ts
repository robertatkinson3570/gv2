/* eslint-disable @typescript-eslint/no-var-requires */

import { scene } from 'components/controllers/SceneController';
import { Quest, QuestEvent, RootJSON } from 'types';
import _ from 'lodash';
import { createContainer, focusContainer, setZoomLevel, toggleZooming, wait } from 'helpers/phaser.helper';
import AnimationsController from 'components/controllers/animationsController';
import { GOTCHI_SIZE, MAP_ID_CITAADEL } from '../../shared_code/constants/const.game';
import rootsJson from '../../shared_code/data/quests.json';
import rootsChatTexts from 'data/rootsChatTexts.json';
import SFXController from 'components/controllers/SFXController';
import GlobalState from 'contexts/GlobalState';
import MapController from 'components/controllers/MapController';
import GameController from 'components/controllers/GameController';
import Players from './Players';
let ChatBubblePhaser;

interface QuestInterface {
  init: () => void;
  create: (quests: Quest[]) => void;
  destroy: (quests: Quest[]) => void;
  handleEvent: (event: QuestEvent) => void;
  toggleHint: (event: boolean) => void;

  destroyAll: () => void;
}
const rootsData = _.keyBy(rootsJson.root, 'releaseId');

const init = (): void => {
  ChatBubblePhaser = require('components/phaser/ChatBubblePhaser').default;
};

const create = (quests: Quest[]): void => {
  // spawn sacreed roots
  _.each(quests, (quest: Quest) => {
    console.log('@Quests.create:quest', quest);

    // Create quest based on use. For now we have only use: root
    switch (quest.use) {
      case 'root':
        createRoot(quest);
        break;
      default:
        break;
    }
  });
};

const destroy = (quests: Quest[]): void => {
  console.log('@Quests.destroy', quests);
  _.each(quests, ({ id }) => {
    const containers = scene.quests.get(id);
    if (!containers) return;
    SFXController.setSpatialAudios({ id: `${id}_MUSIC` }, false);
    SFXController.setSpatialAudios({ id: `${id}_SFX` }, false);
    _.each(containers, (container) => container.destroy());
    scene.quests.delete(id);
  });
};

const destroyAll = (): void => {
  // destroy all objects
  if (scene.quests) {
    scene.quests.forEach((quest) => {
      quest.forEach((container) => container.destroy());
    });
    scene.quests = new Map();
  }
};

const handleEvent = async (event: QuestEvent): Promise<void> => {
  switch (event.use) {
    case 'root':
      await handleRootEvent(event);
      break;

    default:
      break;
  }
};

const toggleHint = (active: boolean): void => {
  // console.log('@Quests.toggleHint', active);
  if (GameController.MAP !== MAP_ID_CITAADEL) return;

  if (active) {
    const latestRootId = GlobalState.GAME.state.gameConfig.quests.root;
    if (!latestRootId) {
      console.warn("@Quests.toggleHint:latestRootId doesn't exist");
      return;
    }
    const latestRoot: RootJSON = rootsData[latestRootId] as unknown as RootJSON;
    if (!latestRoot) {
      console.warn("@Quests.toggleHint:latestRoot doesn't exist");
      return;
    }

    const hintPos = {
      x: latestRoot.position.x * GOTCHI_SIZE.UNIT,
      y: latestRoot.position.y * GOTCHI_SIZE.UNIT,
    };

    console.log('@Quests.toggleHint:latestRoot', latestRoot, hintPos);

    GameController.handleToastNotification({
      message: 'Saacred Roots Hint:\n' + latestRoot.hint,
      autoClose: false,
      type: 'info',
    });

    const hint = MapController.addMiniMapElement(hintPos.x, hintPos.y, 'minimap_roots', 'minimap_roots');
    if (hint) AnimationsController.play(hint, 'minimap_roots');
  } else {
    MapController.removeMinimapElement('minimap_roots');
  }
};

// ROOT ACTIONS

const createRoot = (quest: Quest): void => {
  // quests now receive position V2 instead of separate x and y.
  const { id, position, use } = quest;
  if (scene.quests.has(id)) return;

  // Creating 2 containers for default width 9x4 gotchis.
  // we need 2 containers since we have them displayed pe
  const container = createContainer(9 * GOTCHI_SIZE.UNIT, 4 * GOTCHI_SIZE.UNIT, false);
  const bottomContainer = createContainer(9 * GOTCHI_SIZE.UNIT, 4 * GOTCHI_SIZE.UNIT, false);
  const verseContainer = createContainer(9 * GOTCHI_SIZE.UNIT, 4 * GOTCHI_SIZE.UNIT, false);

  container.setPosition(position.x, position.y).setName('base_container').setDepth(299).setDataEnabled();
  bottomContainer.setPosition(position.x, position.y).setName('bottom_container').setDepth(199);
  verseContainer.setPosition(position.x, position.y).setName('bottom_container').setDepth(400); // verse visual pririty is highest than all objects

  const base = scene.add.sprite(0, -64, 'sacred_root_base').setName('base');
  const bottom = scene.add.sprite(0, 128, 'sacred_root_base_bottom').setName('bottom');
  const root = scene.add.sprite(32, -64, 'sacred_root_idle_reveal', 0).setName('root');
  const magic = scene.add.sprite(0, 0, 'sacred_root_magic', 0).setName('magic');

  AnimationsController.play(root, `${use}_idle`);
  AnimationsController.play(magic, 'sacred_root_magic');
  // SFXController.soundLoopPlay(`${use}_idle`);

  // Adding all sprints in once
  container.add([base, root, magic]);
  bottomContainer.add([bottom]);

  SFXController.setSpatialAudios({ id: `${quest.id}_SFX`, container, key: 'root_idle' }, true);
  SFXController.setSpatialAudios({ id: `${quest.id}_MUSIC`, container, key: 'theme_sacredroot_zane' }, true);

  // adding both containers as array to the same ID.
  scene.quests.set(id, [container, bottomContainer, verseContainer]);
};

const secondsToWaitReveal = 45;
const handleRootEvent = async (data: QuestEvent) => {
  // console.log('@rootEvent', data);
  // server quest id which is USE_ID + collision enter/exit as boolean
  const { id, use, enter, create, totalNeededPlayers, remainingNeededPlayers } = data;
  if (!enter) toggleZooming(true);

  const container = scene.quests.get(id)?.[0]; // get only main container
  const verseContainer = scene.quests.get(id)?.[2]; // get only verse container
  if (!container) return; // main container is missing;

  const root = container.getByName(use);
  if (!root) return;

  const now = Date.now();

  if (!enter) return;
  /*  Idle (chat bubble)
  > Reveal
  > Post (display verse and scale; Rofl disappears  Poof¹ anim VFX)
  > Empty
  > after 3 minutes Rofl appears w/ Poof¹ anim VFX
  > loop back to start
  */
  const player = scene[Players.selectedPlayer.id];

  if (!create) {
    if (container.getData('hasChat')) return;

    container.setData('hasChat', true);
    // console.log('enter', totalNeededPlayers, remainingNeededPlayers);
    const visited = player.getData('visitedRoot');
    // console.log('visited', visited);
    if (!visited) {
      player.setData('visitedRoot', true);
      await handleChatBubble(container, 'Too many interruptions.');
      const message = 'I will share only when...';
      await handleChatBubble(container, message);
      const SecondMsg = `${remainingNeededPlayers} more ${remainingNeededPlayers === 1 ? 'fren arrives' : 'frens arrive'}!`;
      await handleChatBubble(container, SecondMsg);
    }
    const SecondMsg = `Need ${remainingNeededPlayers} more ${remainingNeededPlayers === 1 ? 'fren' : 'frens'} here!`;
    await handleChatBubble(container, SecondMsg);

    container.setData('hasChat', false);
    return;
  }

  const verse = verseContainer.getByName('verse');
  const createdAt = container.getData('createdAt');

  // animation already played. We need to wait for secontsToWaitReveal minutes.
  if (verse || (createdAt && (now - createdAt) / 1000 < secondsToWaitReveal)) return;
  // Zoom in to the NPC.
  setZoomLevel(1, 2000);
  toggleZooming(false);
  focusContainer(container, { x: 0, y: -200 }, true);
  player.setData('onFocus', true);
  // Align close button to the top right of the verse container
  const closeButton = scene.add.image(400, -200, 'xBtn').setInteractive({ cursor: 'url(/cursors/pointer.png), auto' });
  container.add(closeButton);

  closeButton.on('pointerdown', () => {
    focusContainer(null, null, true);
    closeButton.destroy();
    player.setData('onFocus', false);
  });

  if (createdAt) {
    SFXController.playFX(`${use}_spawn`);
    // set time when animation played and wait for 3 minutes.
    container.setData('createdAt', now);
    // it was already created so we need to poof and display the idle ;)
    AnimationsController.play(root, `${use}_idle`);
    // SFXController.soundLoopPlay(`${use}_idle`);
    SFXController.setSpatialAudios({ id: `${id}_SFX`, container, key: 'root_idle' }, true);
    const poof = scene.add.sprite(0, -100, 'poof', 0).setName('poof').setOrigin(0.5).setScale(2.5).setDepth(303);
    SFXController.playFX('poof');
    container.add(poof);
    AnimationsController.play(poof, 'poof');
    const safeToContinue = await wait(3000);
    if (!safeToContinue) return;
  } else {
    // set time when animation played and wait for 3 minutes.
    container.setData('createdAt', now);
  }

  // trigger chat bubble squence here  and wait for a couple of seconds.
  await handleChatBubble(container);

  // SFXController.soundLoopStop(`${use}_idle`);
  SFXController.setSpatialAudios({ id: `${id}_idle` }, false);
  SFXController.playFX(`${use}_reveal`);
  AnimationsController.play(root, `${use}_reveal`, () => {
    const rootId = id.split('_')[1]; // Used to display the verse frame.
    const verse = scene.add.sprite(10, -145, 'sacred_root_verses', rootId);
    verse.setName('verse').setScale(0.23).setOrigin(0.5, 1);

    // scaling up the verse
    scene.tweens.add({
      targets: verse,
      scale: 1,
      delay: 0,
      duration: 2000,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        setTimeout(() => {
          const fadeOutVerseTween = scene.tweens.add({
            targets: verse,
            alpha: 0,
            delay: 4000,
            duration: 2000,
            ease: Phaser.Math.Easing.Linear,
            onComplete: () => {
              verse.destroy();
              focusContainer(null, null, true);
              fadeOutVerseTween.remove();
              closeButton.destroy();
            },
          });
        }, 15000);

        // const removeHandler = (duration: number, delay: number) => {
        //   focusContainer(null, null, true);
        //   fadeOutVerseTween = scene.tweens.add({
        //     targets: verse,
        //     alpha: 0,
        //     delay,
        //     duration,
        //     ease: Phaser.Math.Easing.Linear,
        //     onComplete: () => {
        //       closeButton.off('pointerdown');
        //       closeButton.destroy();
        //       verse.destroy();
        //       fadeOutVerseTween.remove();
        //     },
        //   });
        // };

        // closeButton.setVisible(true);
        // closeButton.on('pointerdown', () => removeHandler(500, 1));
        // setTimeout(() => removeHandler(2000, 4000), 15000);
      },
    });

    AnimationsController.play(root, `${use}_post`);
    const poof = scene.add.sprite(0, -100, 'poof', 0).setName('poof').setOrigin(0.5).setScale(2.5).setDepth(303);
    SFXController.playFX('poof');
    AnimationsController.play(poof, 'poof');
    AnimationsController.play(root, `${use}_empty`);
    SFXController.setSpatialAudios({ id: `${id}_SFX`, container, key: 'root_idle' }, false);
    SFXController.playFX(`${use}_exit`);
    verseContainer.add(verse); // verse visual priority is higher
    container.add(poof); // lower than verse visual priority
  });
};

const handleChatBubble = async (container: Phaser.GameObjects.Container, message?: string): Promise<void> => {
  if (!container) return;
  const currentChatId: number = Number(localStorage.getItem('rootChatId')) || 0;

  const ellipsis = new ChatBubblePhaser(scene, '...', false);
  ellipsis.x = container.x;
  ellipsis.y = container.y - 200;
  let safeToContinue = await wait(2500);
  if (!safeToContinue) return;

  ellipsis.disappear();
  const bubble = new ChatBubblePhaser(scene, message || rootsChatTexts[currentChatId], false);
  bubble.x = container.x;
  bubble.y = container.y - 200;

  // calculate and store next chatId;
  const nextChatId = currentChatId < rootsChatTexts.length - 1 ? currentChatId + 1 : 0;
  localStorage.setItem('rootChatId', nextChatId.toString());
  safeToContinue = await wait(3000);
  if (!safeToContinue) return;

  bubble.disappear();
};

// const getRootDataById = (id: string): RootJSON => {
//   // get actual rootId from
//   const rootId = id.split('_')[1];
//   if (!rootId) return;
//   return rootsData[rootId];
// };

const Quests: QuestInterface = {
  init,
  create,
  destroy,
  destroyAll,
  handleEvent,
  toggleHint,
};

export default Quests;
