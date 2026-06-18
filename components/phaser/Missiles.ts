import GameController from 'components/controllers/GameController';
import Players from './Players';
import { Missile, RangedAttackData, Vector2 } from 'types';
import {
  getAngleByDirV2,
  getDirectionByVector360,
  getDynamics,
  getGroupMemberById,
  getOffsetByDirection,
  interpolatePositionUpdate,
  random,
  randomIntInRange,
} from 'helpers/phaser.helper';
import SFXController from 'components/controllers/SFXController';
import { scene } from 'components/controllers/SceneController';
import _ from 'lodash';
import AnimationsController from 'components/controllers/animationsController';

import GlobalState from 'contexts/GlobalState';
import Enemies from './Enemies';

let allowFire = true;
let shootTimeout;

interface MissilesInterface {
  create: (missiles: Missile[]) => void;
  onAttack: (data: RangedAttackData) => void;
  destroy: (missiles: Missile[]) => void;
  updatePosition: (missiles: Missile[]) => void;
  setAllowFire: (type: boolean, delay?: number) => void;
  destroyAll: () => void;
}

const create = (missiles: Missile[]): void => {
  // console.log('@Missiles.create:', missiles);
  _.each(missiles, (missile: Missile) => {
    const { id, direction, x, y, size, isCharged } = missile;
    const [creatorId] = id.split('#');

    const creatorType = isNaN(Number(creatorId)) ? 'enemy' : 'player';

    const creator = creatorType === 'player' ? scene[creatorId] : getGroupMemberById(creatorId, 'enemiesGroup')?.[0]; // gmls enemy is a list
    // console.log('creatorId', creatorId, creatorType, creator);

    const offset = creatorType === 'player' ? getOffsetByDirection(direction, 30) : { x: 0, y: 0 };
    const attackType = isCharged ? 'snip' : 'shot';

    if (!creator) return;
    if (creatorType === 'player') Players.checkInvisible(creatorId, 'shoot');

    let animationKey = `${attackType}_bas`;

    // handle Enemy shooting
    let enemyType;
    if (creatorType === 'enemy') {
      enemyType = creator.getData('data').type;
      animationKey = `${enemyType}_shot`;
    }

    const dir = getDirectionByVector360(direction);

    if (GlobalState.SETTINGS.state.allowPlayerAnimation && creatorType === 'player') {
      // const orientation = getOriginByDirection(direction);
      const muzzleKey = `${attackType}_muz`;
      const muzzleSprite = scene.add.sprite(offset.x, offset.y, muzzleKey, 0).setOrigin(0.5, 0.5);
      muzzleSprite.setAngle(-90 + getAngleByDirV2(direction));
      creator.add(muzzleSprite);
      AnimationsController.play(muzzleSprite, muzzleKey);
    } else {
      if (enemyType === 'GMLS') {
        const animKey = `GMLS_shot_muz_${dir}`;
        const muzzleSprite = scene.add.sprite(offset.x, offset.y, 'GMLS_shot_muz', 0).setOrigin(0.5, 0.5);
        creator.add(muzzleSprite);
        SFXController.playSpatialFX([{ id: `${id}_muz`, container: creator, key: 'GMLS_shot_muz' }]);
        AnimationsController.play(muzzleSprite, animKey);
      }
    }

    const sprite = scene.add
      .sprite(x || creator.x + offset.x, y || creator.y + offset.y, animationKey, 0)
      .setOrigin(0.5)
      .setDepth(201)
      .setDataEnabled()
      .setAngle(-90 + getAngleByDirV2(direction))
      .setData('attackType', attackType)
      .setData('created', Date.now())
      .setData('direction', direction);

    if (GlobalState.SETTINGS.state.allowPlayerAnimation) {
      AnimationsController.play(sprite, animationKey);
    }
    scene.missiles.set(id, sprite);

    if (Players.isSelectedPlayer(creatorId)) {
      // play sound fx for shot and snip attack
      if (attackType === 'snip') {
        SFXController.playFX('charge_shot');
      }
      SFXController.playFX(`shot_bas_${randomIntInRange(1, 3)}`);
    } else {
      // enemy
      // GMLS_shot
      if (enemyType) SFXController.playSpatialFX([{ id: `${id}_shot`, container: creator, key: `${enemyType}_shot` }]);
    }
    // if (GlobalState.GAME.state.gameConfig.enableDebugGraphics) {
    //   if (!scene.debugObjects) scene.debugObjects = {};
    //   // console.log('Creating ', id);
    //   scene.debugObjects[id] = scene.add.image(x, y, 'debugSquare').setDepth(500).setDisplaySize(size, size).setOrigin(0.5);
    // }
  });
};

const setAllowFire = (type: boolean, delay?: number): void => {
  if (allowFire !== type) {
    allowFire = type;
    if (delay) {
      shootTimeout = setTimeout(() => {
        allowFire = !allowFire;
      }, delay);
    } else {
      if (shootTimeout) {
        clearTimeout(shootTimeout);
      }
    }
  }
};

const updatePosition = (missiles: Missile[]): void => {
  // console.log('@Missiles.updatePosition:', missiles);
  if (!scene) return;
  _.each(missiles, (missile) => {
    const missileSprite = scene.missiles.get(missile.id);
    if (!missileSprite) return;
    if (GlobalState.SETTINGS.state.allowPlayerAnimation) tailEmitterThrottle(missile);
    interpolatePositionUpdate(missileSprite, missile);

    // if (GlobalState.GAME.state.gameConfig.enableDebugGraphics) {
    //   const x = missile.x;
    //   const y = missile.y;
    //   interpolatePositionUpdate(scene.debugObjects[missile.id], { x, y });
    // }
  });
};

const tailEmitterThrottle = _.throttle(
  (missile) => {
    // moved everything on adelay so that the last emit will not play since the missileSprite will already be destroyed
    _.delay(() => {
      const missileSprite = scene.missiles.get(missile.id);
      if (!missileSprite) return;
      const type = missileSprite.getData('attackType');
      const animationKey = `${type}_emi`;
      const emit = scene?.add.sprite(missile.x, missile.y, animationKey, 0).setDepth(10);
      AnimationsController.play(emit, animationKey);
    }, 100);
  },
  120,
  { leading: true, trailing: true },
);

const onAttack = (data: RangedAttackData): void => {
  // Sanity Check to prevent a break if players click on the scene before initial player spawn
  if (!scene[Players.selectedPlayer.id]) return;
  // prevent shooting for 5 seconds grace period
  if (scene[Players.selectedPlayer.id].isGracePeriod) {
    SFXController.playFX('cannot_attack');
    return;
  }
  const shootMode = scene?.mapConfig.SHOOT_MODE;
  const shootModeEnabled = shootMode;
  if (Date.now() - scene.lastRangedAttack < 50) return;
  if (shootModeEnabled) {
    GameController.sendData('combat', 'fire', data);
    scene.lastRangedAttack = Date.now();
  }

  if (!shootModeEnabled) SFXController.playFX('noshoot_sound');
};

const destroy = (missiles: Missile[]): void => {
  // console.log('@Missiles.destroy: ', missiles);
  _.each(missiles, (missile: Missile) => {
    // console.log('@Missile.destroy: ', missile);
    const { id } = missile;
    const [creatorId, missileId] = id.split('#'); // hit object id = objectId
    const objectType = creatorId.split('-')[0]; // GMLS or other enemy type
    const sprite = scene.missiles.get(id);
    if (!sprite) return;

    // console.log('@Missles.destroy', sprite.data.has('playerHitId'), sprite.data.has('hitObjectType'));

    const hitObjectType: 'wall' | 'player' = sprite.getData('hitType');
    // console.log('@Missile.destroy:hitObjectType', hitObjectType, damageType);
    // console.log('@Melee.destroy:hitObjectType', hitObjectType);
    const type = AnimationsController.getAttackDestoryTypeByHitObjectType(hitObjectType) || 'air';
    let posToDestroy = { x: sprite.x, y: sprite.y };
    if (sprite.data.has('playerHitId')) {
      const playerHitId = sprite.getData('playerHitId');
      posToDestroy = { x: scene[playerHitId].x, y: scene[playerHitId].y };
    }
    const destroyAnimKey = `shot_${type}`;
    const destroyAnim = scene.add.sprite(posToDestroy.x, posToDestroy.y, destroyAnimKey, 0).setDepth(500);

    const direction: Vector2 = sprite.getData('direction');
    if (direction) destroyAnim.setAngle(-90 + getAngleByDirV2(direction));

    AnimationsController.play(destroyAnim, destroyAnimKey);

    sprite.setVisible(false); // make it invisible

    if (Players.isSelectedPlayer(creatorId)) {
      const player = scene[Players.selectedPlayer.id];
      if (!player) return;
      const damageType = getDynamics(player.getData('damageDiff'));
      if (type === 'dud') SFXController.playFX(`shot_dud_${randomIntInRange(1, 3)}`); // shot_dud_x (wall)
      if (type === 'imp' && damageType) SFXController.playFX(`shot_imp_${damageType}`); // player

      // gotchi projectile hit GMLS
      if (sprite.getData('hitObjectType') === 'enemy') {
        const hitObjectId = sprite.getData('hitObjectId');
        Enemies.applyEnemyHitVfx(hitObjectId, true);
        SFXController.playSpatialFX([{ id: `${creatorId}_hit`, container: sprite, key: 'GMLS_hit' }]);
      }
    }
    if (objectType === 'GMLS') {
      // GMLS projectile hit gotchi
      const gmlsContainers = getGroupMemberById(creatorId, 'enemiesGroup');
      if (!gmlsContainers) return;

      const impactVfx = scene.add.sprite(sprite.x, sprite.y, 'GMLS_imp', 0).setDepth(500);
      if (direction) impactVfx.setAngle(-90 + getAngleByDirV2(direction));
      AnimationsController.play(impactVfx, 'GMLS_imp');
      SFXController.playSpatialFX([{ id: `${creatorId}_imp`, container: sprite, key: 'GMLS_imp' }]);
    }

    // clear garbage
    sprite.destroy(true);
    scene.missiles.delete(id);

    // if (Players.isSelectedPlayer(playerId)) SFXController.playSpatialFX([{ id, x: sprite.x, y: sprite.y, key: `impact_${type}` }]);
  });
};

const destroyAll = () => {
  if (scene.missiles) {
    scene.missiles.forEach((missile) => {
      missile.destroy(true);
    });
    scene.missiles = new Map();
  }
};

const getProjectileType = (): string => {
  if (GlobalState.GAME.state.gameConfig.gotchiverseTheme === 'halloween') {
    return random(['skull', 'bone']);
  } else if (GlobalState.GAME.state.gameConfig.gotchiverseTheme === 'tooorkey') {
    return 'pie';
  } else {
    return 'heart';
  }
};

const Missiles: MissilesInterface = {
  create,
  onAttack,
  updatePosition,
  setAllowFire,
  destroy,
  destroyAll,
};

export default Missiles;
