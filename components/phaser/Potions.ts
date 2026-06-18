import { Potion, PotionConsume } from 'types';
import { scene } from 'components/controllers/SceneController';
import Players from './Players';
import AnimationsController from 'components/controllers/animationsController';
import SFXController from 'components/controllers/SFXController';
import { moveToLastOrder } from 'helpers/phaser.helper';
import AssetsController from 'components/controllers/assetsController';
import { shopItemsById } from 'helpers/items.helpers';
import _ from 'lodash';
import MapController from 'components/controllers/MapController';

export interface PotionsInterface {
  create: (items: Potion[]) => void;
  destroy: (items: Potion[]) => void;
  destroyAll: () => void;
  consume: (item: PotionConsume) => void;
}

const potionsTint = {
  FUD: 0x01c300,
  FOMO: 0xff0000,
  ALPHA: 0x0ed0ff,
  KEK: 0xc048f7,
  GLTR: 0xffc700,
  GMLS: 0xff22b6,
};

const create = (items: Potion[]): void => {
  // console.log('@Potions.create', items);
  _.each(items, (item) => {
    const { id, itemId, x, y, created } = item;
    const shopItem = _.cloneDeep(shopItemsById[itemId]);

    const key = shopItem?.category === 'boosts' ? `potion_spawn_${shopItem.alchemicaType}` : 'GMLS_pickup';
    const jsonConfig = AssetsController.jsonAssets[key];
    const potion = scene.add.sprite(x + (jsonConfig?.leftOffset?.x || 0), y + (jsonConfig?.leftOffset?.y || 0), key, 0);
    potion.setData('itemId', itemId); // since itemId wont be sent in destroy
    potion.setData('tint', potionsTint[shopItem?.category === 'boosts' ? shopItem.alchemicaType : 'GMLS']);
    potion.setDepth(125);
    MapController.addMiniMapElement(x, y, 'minimap-potion', id, 0.2);
    // play animaion and SFX only if it was just created
    if (created) {
      AnimationsController.play(potion, key);
      SFXController.playSpatialFX([{ id: item.id, container: potion, key: 'potion_spawn' }]);
    } else {
      if (shopItem?.category === 'boosts') potion.setFrame(20);
      else AnimationsController.play(potion, key);
    }
    scene.potionsGroup.set(id, potion);
  });
};

const consume = (potion: PotionConsume): void => {
  const { id, gotchiId } = potion;
  const item = shopItemsById[id];

  // SanityCheck
  if (!item) return;
  const key = `potion_drink_${item.alchemicaType}`;

  const player = scene[gotchiId];
  if (!player) return;
  const drinkVfx = scene.add.sprite(0, 0, key, 0);
  Phaser.Display.Align.In.BottomCenter(drinkVfx, scene[gotchiId].getByName('gotchi_sprite'));
  player.add(drinkVfx);
  moveToLastOrder(gotchiId, drinkVfx);
  AnimationsController.play(drinkVfx, key);
  if (Players.isSelectedPlayer(gotchiId)) SFXController.playFX('potion_drink');
};

const destroy = (items: Potion[]): void => {
  // console.log('@Potions.destroyAll', items);
  _.each(items, (item) => {
    const { id, destroyed } = item;
    if (scene.potionsGroup) {
      const potionToDestroy = scene.potionsGroup.get(id);

      if (potionToDestroy) {
        if (destroyed) {
          const collectAnim = scene.add.sprite(potionToDestroy.x, potionToDestroy.y, 'potion_collect', 0);
          collectAnim.setDepth(300).setOrigin(0.4, 0.6);
          MapController.removeMinimapElement(id);
          SFXController.playSpatialFX([{ id: item.id, container: potionToDestroy, key: 'potion_collect' }]);
          AnimationsController.play(collectAnim, 'potion_collect');

          const tint = potionToDestroy.getData('tint');
          if (tint) collectAnim.setTint(tint);
        }
        potionToDestroy.destroy(true);
        scene.potionsGroup.delete(id);
      }
    }
  });
};

const destroyAll = (): void => {
  // console.log('@Potions.destroy.all');
  if (scene.potionsGroup) {
    scene.potionsGroup.forEach((item) => item.destroy(true));
    scene.potionsGroup = new Map();
  }
};

const Potions: PotionsInterface = {
  create,
  destroy,
  destroyAll,
  consume,
};

export default Potions;
