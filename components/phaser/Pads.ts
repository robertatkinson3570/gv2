import AnimationsController from 'components/controllers/animationsController';
import AssetsController from 'components/controllers/assetsController';
import { scene } from 'components/controllers/SceneController';
import SFXController from 'components/controllers/SFXController';
import GlobalState from 'contexts/GlobalState';
import _ from 'lodash';
import { PadShape } from 'types';

interface PadsInterface {
  create: (data: PadShape[]) => void;
  destroy: (data: PadShape[]) => void;
  destroyAll: () => void;
  toggleAarena: (state: boolean) => void;
}

const AARENA_MUSIC_THEME = 'theme_aarena-exterior_zane';

const create = (data: PadShape[]): void => {
  console.log('@Pad.create:', data);
  _.each(data, (item: PadShape) => {
    switch (item.use) {
      case 'aarena':
        void createAarena(item);
        if (GlobalState.GAME.state.gameConfig.combatIsLive) SFXController.musicPlay(AARENA_MUSIC_THEME);

        break;
      default:
        break;
    }
  });
};

const createAarena = async (item: PadShape) => {
  if (scene.pads.get(item.id)) return;
  const container = scene.add.container(item.x, item.y).setVisible(true).setDepth(10);
  container.setName(item.id).setDataEnabled().setData('type', 'aarena');

  SFXController.setSpatialAudios({ id: `${item.id}_FX`, container, key: 'aarena01_ext' }, true);
  SFXController.setSpatialAudios({ id: `${item.id}_MUSIC`, container, key: 'theme_aarena-exterior_zane' }, true);

  const landmarkAssets = [
    { key: 'bg', depth: 0 },
    { key: 'south', depth: 0 },
    { key: 'back', depth: 300 },
    { key: 'north', depth: 301 },
    { key: 'overlay', depth: 301 },
  ];

  _.each(landmarkAssets, async (asset) => {
    const key = `aarena01_ext_${asset.key}`;
    const jsonConfig = await AssetsController.getJsonAssets(key);
    let offset = { x: 0, y: 0 };
    if (jsonConfig) {
      offset = {
        x: jsonConfig.leftOffset.x,
        y: jsonConfig.leftOffset.y,
      };
    }

    const phaserAsset = scene.add
      .sprite(asset.key !== 'south' ? item.x + offset.x : offset.x, asset.key !== 'south' ? item.y + offset.y : offset.y, key, 0)
      .setOrigin(0)
      .setDepth(asset.depth);
    if (asset.key !== 'south') AnimationsController.play(phaserAsset, key);
    else {
      phaserAsset.setName('south');
      container.add(phaserAsset);
      if (GlobalState.GAME.state.gameConfig.combatIsLive) AnimationsController.play(phaserAsset, key);
    }
  });

  scene.pads.set(item.id, container);
  if (scene?.gameConfig.combatIsLive) toggleAarena(true);
};

const toggleAarena = (state: boolean): void => {
  scene.pads.forEach((container, id) => {
    if (container.getData('type') === 'aarena') {
      const door = container.getByName('south');
      if (!door) return;
      SFXController.setSpatialAudios({ id: `${id}_MUSIC`, container, key: 'theme_aarena-exterior_zane' }, state);
      if (state) {
        SFXController.musicPlay(AARENA_MUSIC_THEME);
        SFXController.playFX('aarena01_ext_open');
        AnimationsController.play(door, 'aarena01_ext_south');
      } else {
        SFXController.musicPlay(SFXController.getDefaultMusicTheme());
        door.stop(null, true);
        door.setFrame(0);
      }
    }
  });
};

const destroy = (pads: PadShape[]): void => {
  _.each(pads, (pad: PadShape) => {
    const phaserObject = scene.pads.get(pad.id);
    if (!phaserObject) return;
    phaserObject.destroy();
  });
};

const destroyAll = () => {
  if (scene.pads) {
    scene.pads.forEach((object) => {
      object.destroy();
    });
    scene.pads = new Map();
  }
};

const Pads: PadsInterface = {
  create,
  destroy,
  toggleAarena,
  destroyAll,
};

export default Pads;
