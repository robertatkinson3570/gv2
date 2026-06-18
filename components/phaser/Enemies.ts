/* eslint-disable @typescript-eslint/no-var-requires */
import { Enemy, Damage, SpatialAudioFX, Vector2, PieIndicatorConfig, EnemyTypeModels, GMLSComponents, ROFLComponents } from 'types';
import _ from 'lodash';
import SFXController from 'components/controllers/SFXController';
import AnimationsController from 'components/controllers/animationsController';
import { scene } from 'components/controllers/SceneController';
import { HealthBarType } from './HealthBar';
import { ENEMY_DEFAULTS } from 'shared_code/constants/const.game';
import { getDirectionByVector360, interpolatePositionUpdate, showDamage, wait } from 'helpers/phaser.helper';
import AssetsController from 'components/controllers/assetsController';
import MapController from 'components/controllers/MapController';
import { getOrFetchAavegotchiURL } from 'helpers/gotchi.helper';
import { ENABLE_TESTS } from 'components/controllers/GameController';
import loreJson from '../../shared_code/data/rofl-lore.json';

let ChatBubblePhaser;

type AnimationType = 'idle' | 'destroy' | 'hit' | 'run';

type ROFLAnimationType =
  | 'idle'
  | 'run_up'
  | 'run_right'
  | 'run_down'
  | 'run_left'
  | 'eat_up'
  | 'eat_right'
  | 'eat_down'
  | 'eat_left'
  | 'spot_up'
  | 'spot_right'
  | 'spot_down'
  | 'spot_left'
  | 'burp'
  | 'lore'
  | 'destroy';

const ROFL_SFX = ['idle', 'run', 'eat', 'spot', 'burp'] as const;
export type RoflFx = typeof ROFL_SFX[number];

type GMLSAnimationType = 'spawn' | 'idle' | 'destroy' | 'transition' | 'run' | 'shoot_idle' | 'shoot_walk';
let HealthBar;
let PieIndicator;

const enemyConfig = {
  pumpkin: {
    spawnOffsetY: -55,
  },
  turkey: {
    spawnOffsetY: 0,
  },
  GMLS: {
    spawnOffsetY: 0,
  },
  ROFL: {
    spawnOffsetY: 0,
  },
};

export interface EnemiesInterace {
  init: () => void;
  create: (enemies: Enemy[]) => Promise<void>;
  destroy: (enemies: Enemy[]) => void;
  destroyAll: () => void;
  triggerAction: (data: { id: string; action: { type: 'run'; state: boolean } }) => void;
  updateHealthBar: (data: Damage, wasHit: boolean) => void;
  updateAP: (data: { id: string; ap: number }) => void;
  updatePosition: (data: Enemy[]) => void;
  applyEnemyHitVfx: (id: string, isVisible: boolean) => void;
  runTests: (action: boolean) => void;
}

const init = (): void => {
  HealthBar = require('components/phaser/HealthBar').default;
  PieIndicator = require('components/phaser/PieIndicator').default;
  ChatBubblePhaser = require('components/phaser/ChatBubblePhaser').default;
};

const create = async (enemies: Enemy[]): Promise<void> => {
  // console.log('@Enemies.create:', enemies);
  if (!scene) return;

  const spatial: SpatialAudioFX[] = [];

  await Promise.all(
    _.each(enemies, (enemy) => {
      // console.log('@Enemies.create:', enemy);
      if (enemy.type === 'PLM2') enemy.type = 'GMLS'; // quick hack until we refactor to TYPE PLM and MODEL PLM1/PLM2

      const { x, y, name, id, type, created } = enemy;
      if (scene.enemiesGroup.has(id)) return;

      const container = scene.add.container(x, y).setDepth(200);

      let headContainer;
      if (type === 'GMLS') {
        // this is the actual PLM model: GMLS or PLM2; we will switch to PLM1 or 2;
        // some VFX and SFX are based on type some on model
        const model = id.split('-')[0] as EnemyTypeModels;
        enemy.model = model;

        const headSpriteKey = `${enemy.model}_head`;
        const jsonConfig = AssetsController.jsonAssets[headSpriteKey];
        enemy.headOffset = jsonConfig.leftOffset;

        headContainer = scene.add.container(x, y);
        headContainer.setDepth(201);
        const minimapEl = MapController.addMiniMapElement(x, y, `minimap_${enemy.model}`, enemy.id, 0.3);
        AnimationsController.play(minimapEl, `minimap_${enemy.model}`);
        // @ts-expect-error // assign minimapEl to container
        container.minimapEl = minimapEl;
      }
      const healthContainer = scene.add.container(x, y).setName(name).setDepth(301);

      // store all initial data recevived as data
      container.setDataEnabled().setData('data', enemy);
      const containers = [container];

      // pushing head container for PLMs
      if (type === 'GMLS') containers.push(headContainer);
      scene.enemiesGroup.set(id, containers);
      scene.enemiesGroup.set(`${id}_health`, healthContainer);

      // pumpkin is the only supported enemy type currently TODO-switch to model;
      const ENEMY_DEFAULT = ENEMY_DEFAULTS[type?.toUpperCase()];

      if (!ENEMY_DEFAULT) {
        console.warn(`Unknown enemy type not created: ${type}`);
      } else {
        if (type === 'GMLS') createGMLSContainers(enemy, container, headContainer);

        if (created) {
          let enemySpawn, spawnAnimKey;
          // trukey spawn is separate sprites for GMLS we are using the same sprites
          if (type === 'GMLS') {
            enemySpawn = container.getByName('GMLS_main');
            enemySpawn.setVisible(true);
            spawnAnimKey = `${enemy.model}_spawn`;
          } else if (type !== 'ROFL') {
            enemySpawn = scene.add.sprite(0, enemyConfig[type].spawnOffsetY, `${type}_idle_hit`, 0);
            enemySpawn.setName('spawn');
            spawnAnimKey = `${type}_spawn`;
            container.add(enemySpawn);
          }
          // spawn ROFL with poof;
          if (type === 'ROFL') {
            // crate ROFL sprite first then spawn poof;
            void spawnEnemy(enemy, 'create');
            const poof = scene.add.sprite(0, 0, 'poof', 0).setName('poof').setOrigin(0.5).setScale(2.5);
            container.add(poof);
            SFXController.playFX('poof');
            AnimationsController.play(poof, 'poof');
          } else {
            AnimationsController.play(enemySpawn, spawnAnimKey, () => {
              if (type === 'turkey') handleTurkeyShell(x, y, type);
              void spawnEnemy(enemy, 'create');
            });
          }
          spatial.push({ ..._.pick(enemy, ['id', 'x', 'y']), key: type === 'GMLS' ? 'GMLS_spawn' : spawnAnimKey });
        } else {
          void spawnEnemy(enemy, 'spawn');
        }
      }
    }),
  );

  // console.log('@Enemies.create: done');
  // We need to push all in once, since spatial play only the closest spatial sound.
  if (spatial.length) SFXController.playSpatialFX(spatial);
};

const createGMLSContainers = (enemy: Enemy, container: Phaser.GameObjects.Container, headContainer: Phaser.GameObjects.Container): void => {
  // create both main and head sprites here and hide if not needed
  const mainSpriteKey = `${enemy.model}_main`;
  const headSpriteKey = `${enemy.model}_head`;

  // create and hide MAIN sprite
  const enemyMain = scene.add.sprite(0, 0, mainSpriteKey, 0);
  enemyMain.setName('GMLS_main').setVisible(false);
  container.add(enemyMain);

  // create and hide HEAD sprite
  const enemyHead = scene.add.sprite(0, enemy.headOffset.y, headSpriteKey, 0);
  enemyHead.setName('GMLS_head').setOrigin(0.5).setVisible(false);
  headContainer.add(enemyHead);

  // create idle vfx
  const idleVFX = scene.add.sprite(0, 0, 'GMLS_idle_vfx', 0).setName('idle_vfx').setOrigin(0.5).setVisible(false).setDepth(0);
  Phaser.Display.Align.In.Center(idleVFX, enemyHead, 0, 64);
  headContainer.add(idleVFX).moveTo(idleVFX, 0);

  // add per frame updates
  applyFrameUpdates(enemy.id);
};

async function spawnEnemy(enemy: Enemy, source: string) {
  // console.log('@Enemies.spawn:', enemy, source);
  let container, headContainer;
  if (enemy.type === 'GMLS') {
    container = scene.enemiesGroup.get(enemy.id)?.[0];
    headContainer = scene.enemiesGroup.get(enemy.id)?.[1];
  } else {
    container = scene.enemiesGroup.get(enemy.id)[0];
  }
  const healthContainer = scene.enemiesGroup.get(`${enemy.id}_health`);
  if (!container) return;

  const {
    type,
    name,
    model,
    id,
    creator: { id: creatorId },
  } = enemy;

  let gmlsHead, enemySprite;

  if (type === 'GMLS') {
    enemySprite = container.getByName('GMLS_main');
    gmlsHead = headContainer.getByName('GMLS_head');

    if (!enemySprite || !gmlsHead) {
      console.warn(`@Enemies.spawn: no sprite found for ${type} ${model}`, enemySprite, gmlsHead);
      return;
    }
    enemySprite.setVisible(true);
    gmlsHead.setVisible(true);
  } else if (type === 'ROFL') {
    enemySprite = scene.add.sprite(0, 0, 'woodland_rofl', 0).setName('main');
  } else {
    enemySprite = scene.add.sprite(0, 0, `${type}_idle_hit`, 7).setName(`${type}_idle_hit`);
  }
  const enemyName = scene.add.text(0, -64, name, {
    fontFamily: 'Pixelar',
    fontSize: '26px',
  });
  const enemyNameColor = type === 'ROFL' ? '#4ADBFB' : '#FF965A';
  enemyName.setName('name').setStroke('#000000', 4).setFill(enemyNameColor).setOrigin(0.5);

  if (type === 'GMLS') {
    const healthBar = new HealthBar(-60, -90, 'enemy', enemy.maxHP).setName('health');
    const avatar = scene.add.sprite(0, -200, creatorId);
    const avatarBg = scene.add.circle(0, 0, 20, 0x00b9e1, 1);

    // Configure avatar to have a circle mask and border
    avatar.setName('avatar').setScale(0.5).setOrigin(0.5).setVisible(false);
    avatarBg.setName('avatarBg').setOrigin(0.5).setStrokeStyle(3, 0xec6113);

    if (!healthContainer.length) {
      healthContainer.add([healthBar, avatarBg, enemyName, avatar]);
      Phaser.Display.Align.In.RightCenter(avatar, enemyName, -100, 0);
      Phaser.Display.Align.In.Center(avatarBg, avatar, 0, 0);
    }
    Phaser.Display.Align.In.Center(enemyName, enemySprite, 20, -165);
    Phaser.Display.Align.In.RightCenter(avatar, enemyName, -120, 0);
    Phaser.Display.Align.In.Center(avatarBg, avatar, 0, 0);
    healthBar.y = -70;

    await getOrFetchAavegotchiURL(creatorId, (texture) => {
      avatar?.setTexture(texture).setVisible(true);
    });
  }

  healthContainer.add(enemyName);

  container.add(enemySprite);

  if (type === 'GMLS' || type === 'ROFL') {
    // sometimes createdAt undefined
    // console.log('createAt', id, enemy.createdAt);

    if (enemy.createdAt) {
      const endTime = Number(enemy.createdAt) + ENEMY_DEFAULTS[type].LIFESPAN * 1000; // 100%
      const duration = endTime - Date.now();
      const x = type === 'GMLS' ? 150 : 0;
      const y = type === 'GMLS' ? -128 : -100;
      const lifespan = ENEMY_DEFAULTS[type].LIFESPAN * 1000;
      // only add a pie indicator if the enemy has a lifespan
      if (lifespan) {
        const indicatorConfig: PieIndicatorConfig = {
          x,
          y,
          radius: 15,
          alpha: 0.8,
          borderThickness: 3,
          bgColor: 0x353232,
          borderColor: type === 'ROFL' ? 0x4adbfb : 0xc67649,
          indicatorColor: type === 'ROFL' ? 0x4adbfb : 0xff0000,
          indicatorBorderColor: type === 'ROFL' ? 0x4adbfb : 0xee8d54,
          lifeSpan: ENEMY_DEFAULTS[type].LIFESPAN * 1000, // 100%
          targetValue: duration, // current value
        };
        const pieIndicator = new PieIndicator(indicatorConfig);
        healthContainer.add(pieIndicator.getPieIndicator());
        pieIndicator.runDurationBasedIndicator();
      }
    }
  }
  updateHealthBar({ id: enemy.id, health: enemy.health }, false);

  // Hookup hit animation for basic enemies
  if (type !== 'GMLS' && type !== 'ROFL') {
    AnimationsController.play(enemySprite, `${type}_hit`, () => playEnemyFX(container, 'idle'));
    AnimationsController.play(enemySprite, `${type}_run`, () => playEnemyFX(container, 'idle'));
  }

  if (type === 'GMLS') {
    playPLMFX(id, 'idle');
  } else if (type === 'ROFL') {
    playRoflFX(id, 'idle');
  } else {
    playEnemyFX(container, 'idle');
  }
}

const applyFrameUpdates = (id: string) => {
  const components = getGMLSComponents(id);
  if (!components) {
    console.warn('@applyFrameUpdates:no components found for GMLS', id);
    return;
  }

  const { container, model, mainSprite, headSprite, headOffset } = components;

  // this is applide once
  // handle byFrame updates from json. Animation updates from main json are apllilied to head sprite!
  mainSprite.on('animationupdate', (anim, frame) => {
    if (anim.key.includes('run') || anim.key.includes('transition')) {
      // handle spatial audio on run
      const customData = frame.customData;
      const offset = _.cloneDeep(customData?.offset);
      if (model === 'PLM2') offset.y -= 4;
      if (offset) headSprite.setPosition(offset.x, headOffset.y + offset.y);
      const sfx = customData?.sfx;
      if (!sfx?.includes('run')) return;
      const soundConfig = AssetsController.allSoundsConfig[customData.sfx];
      if (soundConfig.instances) {
        // play one sound per instance and recort which one from 0 to top instance
        const currentStep = mainSprite.getData('currentStep') || 0;
        const nextStep = currentStep + 1 < soundConfig.instances ? currentStep + 1 : 0;
        mainSprite.setData('currentStep', nextStep);
        SFXController.playSpatialFX([{ id: `${id}_run`, container, key: `${sfx}_${currentStep}` }]);
      }
    }
  });
};

const getGMLSComponents = (id: string): GMLSComponents => {
  const container = scene.enemiesGroup.get(id)?.[0]; // main container
  const headContainer = scene.enemiesGroup.get(id)?.[1]; // head container
  const healthContainer = scene.enemiesGroup.get(`${id}_health`);
  const model = container?.getData('data').model;
  const headOffset = container?.getData('data').headOffset;
  const type = container?.getData('data').type;
  const mainSprite = container?.getByName('GMLS_main');
  const headSprite = headContainer?.getByName('GMLS_head');
  const idleVFX = headContainer?.getByName('idle_vfx');

  if (!container || !headContainer || !healthContainer || !model || !mainSprite || !headSprite || !idleVFX) {
    console.warn(
      '@getGMLSComponentsContainers:GMLSContainers not found',
      id,
      !!container,
      !!headContainer,
      !!healthContainer,
      !!model,
      !!mainSprite,
      !!headSprite,
      !!idleVFX,
    );
    return;
  }
  return { container, headContainer, healthContainer, type, model, mainSprite, headSprite, idleVFX, headOffset };
};

const getROFLComponents = (id: string): ROFLComponents => {
  const container = scene.enemiesGroup.get(id)?.[0]; // main container
  const healthContainer = scene.enemiesGroup.get(`${id}_health`);
  const data = container?.getData('data');
  const sfx = container?.getData('sfx');
  const vfx = container?.getData('vfx');
  const mainSprite = container?.getByName('main');

  if (!container || !healthContainer || !mainSprite) {
    console.warn('@getROFLComponents:ROFL not found', id, !!container, !!healthContainer, !!data, !!mainSprite);
    return;
  }
  return { container, healthContainer, mainSprite, data, sfx, vfx };
};

const playRoflFX = (id: string, type: ROFLAnimationType, isTestMode?: boolean): void => {
  // console.log('@playRoflFX', id, type);
  const components = getROFLComponents(id);
  if (!components) {
    console.warn('@playRoflFX:no components found for ROFL', id);
    return;
  }
  const { container, mainSprite, sfx } = components;

  if (type === 'destroy') {
    const poof = scene.add.sprite(container.x, container.y, 'poof', 0).setOrigin(0.5).setScale(2.5);
    SFXController.playSpatialFX([{ id: `${id}_poof`, container, key: 'poof' }]);
    AnimationsController.play(poof, 'poof');
    return;
  }

  AnimationsController.play(mainSprite, `ROFL_${type}`, () => {
    // repeat animation in test mode only
    if (isTestMode) playRoflFX(id, type, isTestMode);
  });

  container.setData('vfx', type);

  const soundKey = _.find(ROFL_SFX, (key) => (type.includes(key) ? key : null));
  if (!soundKey) {
    console.warn('@playRoflFX:no soundKey found for ROFL', id, type);
    return;
  }

  // stop current spatial audio
  if (sfx !== soundKey) SFXController.setSpatialAudios({ id: `${id}_${sfx}` }, false);

  if (type === 'idle' || type.includes('run')) {
    if (sfx !== soundKey) {
      container.setData('sfx', soundKey);
      SFXController.setSpatialAudios({ id: `${id}_${soundKey}`, container, key: `ROFL_${soundKey}` }, true);
    }
  } else {
    SFXController.playSpatialFX([{ id: `${id}_${soundKey}`, container, key: `ROFL_${soundKey}` }]);
  }
};

const playPLMFX = (id: string, type: GMLSAnimationType, direction?: Vector2): void => {
  const components = getGMLSComponents(id);
  if (!components) {
    console.warn('@playPLMFX:no components found for GMLS', id, 'for animation', type);
    return;
  }
  const { container, model, mainSprite, idleVFX } = components;

  if (type === 'idle') {
    // handle idle animation
    if (direction) {
      // whenever walking complete idle is the next state play 'transition'
      // if receive direciton means the enemy just catch up with target and it stopps. so no transition
      SFXController.playSpatialFX([{ id: `${id}_transition`, container, key: 'GMLS_transition' }]);
      AnimationsController.play(mainSprite, `${model}_transition`, () => {
        triggerGMLSIdle(id);
      });
    } else triggerGMLSIdle(id);
  } else if (type === 'run') {
    // handle running animation

    idleVFX.setVisible(false);
    const dir = getDirectionByVector360(direction);
    AnimationsController.play(mainSprite, `${model}_run_${dir}`);
    SFXController.setSpatialAudios({ id: `${id}_idle` }, false);
  } else if (type === 'transition') {
    // handle transition animation for testing
    AnimationsController.play(mainSprite, `${model}_transition`, () => {
      playPLMFX(id, 'transition');
    });
  } else {
    console.log('@GMLS animation type not found', type);
  }
};

const applyEnemyHitVfx = (id: string, isVisible: boolean): void => {
  const enemyParts = scene.enemiesGroup.get(id);
  if (!enemyParts) return;
  const isHit = enemyParts[0].getData('isHit');
  if (isHit && isVisible) return;

  enemyParts?.[0].setData('isHit', isVisible);
  _.each(enemyParts, (bodyParts: Phaser.GameObjects.Container) => {
    const childObjects = bodyParts.getAll('visible', true);
    _.each(childObjects, (child) => {
      if (isVisible && child.name !== 'damagePointAnim') scene.outLinePlugin?.add(child, { thickness: 4, outlineColor: 0xff0000 });
      else scene.outLinePlugin?.remove(child);
    });
  });

  // remove animation after 1 sec
  if (isVisible) {
    setTimeout(() => {
      Enemies.applyEnemyHitVfx(id, false);
    }, 1000);
  }
};

const triggerGMLSIdle = (id: string): void => {
  const components = getGMLSComponents(id);
  if (!components) {
    console.warn('@triggerGMLSIdle:no components found for GMLS', id);
    return;
  }
  const { container, model, mainSprite, headSprite, idleVFX, headOffset } = components;

  idleVFX.setVisible(true);
  // reset HEAD Position;
  headSprite.setPosition(0, headOffset.y);
  AnimationsController.play(mainSprite, `${model}_idle`);
  AnimationsController.play(idleVFX, 'GMLS_idle_vfx');
  SFXController.setSpatialAudios({ id: `${id}_idle`, container, key: 'GMLS_idle' }, true);
};

const destroy = (enemies: Enemy[]): void => {
  const group = scene.enemiesGroup;
  const spatial: SpatialAudioFX[] = [];
  _.each(enemies, ({ id, destroyed }) => {
    if (!group.has(id)) return;

    const container = group.get(id)?.[0];
    const headContainer = group.get(id)?.[1];
    const healthContainer = group.get(`${id}_health`);
    container.setData('destroyed', true);
    if (container) {
      const enemyType = container.getData('data').type;
      if (destroyed) {
        playEnemyFX(container, 'destroy');
        if (enemyType !== 'ROFL') {
          spatial.push({ container, key: `${enemyType}_destroy` });

          const minimapEl = container.minimapEl;
          if (minimapEl) minimapEl.destroy();
        }
      }
      SFXController.setSpatialAudios({ id }, false);
      SFXController.setSpatialAudios({ id: `${id}_idle` }, false);
      SFXController.setSpatialAudios({ id: `${id}_run` }, false);

      const sfx = container.getData('sfx');
      SFXController.setSpatialAudios({ id: `${id}_${sfx}` }, false);
      container?.destroy(true);
      headContainer?.destroy(true);
      healthContainer?.destroy(true);
    }
    idleLoopAnimationById[id] = null;
    lastAnimationById[id] = null;
    group.delete(id);
    group.delete(`${id}_health`);
  });
  if (spatial.length) SFXController.playSpatialFX(spatial);
};

const idleLoopAnimationById = {};
const lastAnimationById = {};

// For playing both VFX animation and SFX audio.
const playEnemyFX = (container: Phaser.GameObjects.Container, type: AnimationType | ROFLAnimationType, cb?: () => void) => {
  if (!container) return;
  const data = container.getData('data');
  const enemyType = data?.type;
  const enemyId = data?.id;
  if (enemyType === 'ROFL' && enemyId) {
    playRoflFX(enemyId, type as ROFLAnimationType);
    return;
  }
  const enemyModel = data?.model;
  // console.log('@playEnemyFX', enemyType, type, enemyId);
  if (type === 'hit' && lastAnimationById[enemyId] === 'run') return;

  // this is to avoid an animation getting spammed
  if (lastAnimationById[enemyId] === type && type !== 'hit') return;
  else lastAnimationById[enemyId] = type;

  const animation = `${enemyType === 'GMLS' ? enemyModel : enemyType}_${type}`;
  const spriteName = getSpriteName(animation);
  if (!spriteName) return;

  if (type === 'run' || type === 'hit') {
    // if spawn animation is still on, we should remove it
    const spawnAnim = container.getByName('spawn') as Phaser.GameObjects.Sprite;
    if (spawnAnim) {
      // const enemy = container?.getData('data');
      // spawnEnemy(enemy);
      handleTurkeyShell(container.x, container.y, 'turkey');
      spawnAnim.destroy();
    }
  }

  let animationSprite = container.getByName(spriteName) as Phaser.GameObjects.Sprite;

  if (!animationSprite) {
    if (type === 'hit' || type === 'run') return;
    else animationSprite = scene.add.sprite(container.x, container.y, spriteName).setDepth(200).setName(spriteName);
  }

  if (type === 'hit') SFXController.playSpatialFX([{ id: animation, container, key: animation }]);
  AnimationsController.play(animationSprite, animation);

  if (enemyType === 'turkey') {
    if (type === 'destroy') {
      handleSpillOverAnim(container);
      SFXController.setSpatialAudios({ id: `${enemyId}_idle` }, false);
      SFXController.setSpatialAudios({ id: `${enemyId}_run` }, false);
      AnimationsController.play(animationSprite, animation, () => handleTurkeyDestroy(animationSprite, 'turkey_fade'));
    }
  }
};

const handleSpillOverAnim = (container: Phaser.GameObjects.Container) => {
  const spillover = scene.add.sprite(container.x, container.y, 'spillover', 0).setOrigin(0.5).setDepth(500);

  Phaser.Display.Align.In.BottomCenter(spillover, container);
  SFXController.playFX('spillover_start');
  AnimationsController.play(spillover, 'spillover');
  // spillover.on('animationcomplete', () => spillover.destroy());
};

const handleTurkeyDestroy = (animationSprite: Phaser.GameObjects.GameObject, animation: string) => {
  // console.log('handle turkey Destroy', animationSprite, animation);
  AnimationsController.play(animationSprite, animation);
  scene.tweens.add({
    targets: [animationSprite],
    alpha: 0,
    delay: 0,
    duration: 10000,
    ease: Phaser.Math.Easing.Sine.Out,
    onComplete: () => {
      animationSprite.destroy();
    },
  });
};

const handleTurkeyShell = (x: number, y: number, type: string) => {
  const shell = scene.add.image(x, y, `${type}_shell`).setOrigin(0.5).setDepth(200).setName('shell');
  scene.tweens.add({
    targets: [shell],
    alpha: 0,
    delay: 0,
    duration: 5000,
    ease: Phaser.Math.Easing.Sine.Out,
    onComplete: () => {
      shell.destroy();
    },
  });
};
interface LoreData {
  id: string;
  timeToWait: number;
}
interface EnemyActions {
  id: string;
  action: {
    type: 'run' | 'set-target' | 'play-fx' | 'play-lore';
    state?: boolean;
    fx?: ROFLAnimationType;
    lore?: LoreData;
    action?: {
      type: 'attack' | 'move';
      state: boolean;
      target?: { created: number; id: string; name: string; type: 'player' | 'enemy' };
    };
  };
}
const triggerAction = (data: EnemyActions): void => {
  // console.log('@triggerAction', data);
  const container = scene.enemiesGroup.get(data.id)?.[0];
  if (!container) return;
  const enemyType = container?.getData('data').type;

  const action = data.action?.type;
  if (!action) return;

  if (action === 'run') {
    const key = `${enemyType}_${data.action.type}`;
    SFXController.setSpatialAudios({ id: `${data.id}_${data.action.type}`, container, key }, data.action.state);
    SFXController.setSpatialAudios({ id: `${data.id}_idle`, container, key: `${enemyType}_idle` }, !data.action.state);
  } else if (action === 'set-target') {
    handleSetTarget(data);
  } else if (action === 'play-fx') {
    if (enemyType === 'ROFL') playRoflFX(data.id, data.action.fx);
  } else if (action === 'play-lore') {
    if (enemyType === 'ROFL') void handlePlayLore(data.id, data.action.lore);
  } else {
    console.warn('Enemies.triggerAction: unknown action', action);
  }
};
const handlePlayLore = async (id: string, lore: LoreData): Promise<void> => {
  console.log('@handlePlayLore', id, lore);

  if (!id || !lore) return;

  const components = getROFLComponents(id);
  if (!components) {
    console.warn('@handlePlayLore:no components found for ROFL', id);
    return;
  }
  const { container, data } = components;

  playRoflFX(data.id, 'idle');
  const safeToContinue = await wait(1000);
  if (!safeToContinue) return;
  await handleChatBubble(container, loreJson[lore.id], lore.timeToWait);
};

const handleChatBubble = async (container: Phaser.GameObjects.Container, message: string, timeToWait: number): Promise<void> => {
  if (!container || !message) return;

  const ellipsis = new ChatBubblePhaser(scene, '...', false);
  container.add(ellipsis);
  ellipsis.y = ellipsis.y - 80;
  let safeToContinue = await wait(2500);
  if (!safeToContinue) return;
  ellipsis.disappear();

  const bubble = new ChatBubblePhaser(scene, message, false, timeToWait);
  bubble.y = bubble.y - 80;
  container.add(bubble);
  safeToContinue = await wait(timeToWait);
  if (!safeToContinue) return;
  bubble.disappear();
};

const handleSetTarget = (data: EnemyActions): void => {
  const action = data.action?.action;
  const container = scene.enemiesGroup.get(data?.id)?.[0];
  const enemyType = container?.getData('data').type;
  if (enemyType !== 'GMLS') return;

  // Check if we have all the data we need
  if (!action || !container || !enemyType) {
    console.warn('no action or container or enemyType', action, container, enemyType);
    return;
  }

  const state = data.action.action.state;
  // console.log('@handleSetTarget', data, action, state);

  if (action.type === 'move') {
    // handle move stop animation
    if (!state) playPLMFX(data.id, 'idle', { x: 0, y: 0 });
  }
  if (action.type === 'attack') {
    // nothing here for now
  }
};

const updateHealthBar = (data: Damage, wasHit: boolean): void => {
  // get healthbar
  // if (wasHit) console.log('@updateHealthBar', data);
  const { id, health } = data;
  const healthBarContainer = scene.enemiesGroup.get(`${id}_health`);
  const container = scene.enemiesGroup.get(id)?.[0];

  if (!container || !healthBarContainer) return;
  const healthBar = healthBarContainer.getByName('health') as HealthBarType;
  healthBar?.getDamage(health);
  if (healthBar && wasHit) {
    playEnemyFX(container, 'hit');
    showDamage(data);
  }
};

const updateAP = (data: { id: string; ap: number }): void => {
  const { id, ap } = data;
  const headContainer = scene.enemiesGroup.get(id)?.[1]; // get only main container
  if (!headContainer) {
    console.warn('no head container', id);
    return;
  }
  // HOOKUP STAMINA HEAD HERE BASED ON MAXAP 20;
  // spritesheet: 0 = full, 20 = empty
  const gmlsHead = headContainer.getByName('GMLS_head');
  if (!gmlsHead) {
    console.warn('no gmls head', id);
    return;
  }

  let frame = Math.abs(19 - ap);
  if (ap === 20) frame = 0;
  if (ap === 0) frame = 20;
  gmlsHead.setFrame(frame);
};

const updatePosition = (enemies: Enemy[]): void => {
  _.each(enemies, (enemy) => {
    const container = scene.enemiesGroup.get(enemy.id)?.[0];
    const headContainer = scene.enemiesGroup.get(enemy.id)?.[1];
    const healthBarContainer = scene.enemiesGroup.get(`${enemy.id}_health`);
    if (!container) return;
    const type = container?.getData('data').type;
    // console.log('@Enemies.updatePosition', enemy, type);
    interpolatePositionUpdate(container, enemy);
    if (headContainer) interpolatePositionUpdate(headContainer, enemy);
    interpolatePositionUpdate(healthBarContainer, enemy);
    const minimapEl = container.minimapEl;
    if (minimapEl) minimapEl.setPosition(enemy.x, enemy.y);

    const direction = getDirectionByVector360(enemy.direction);
    if (!direction) return;
    if (type === 'GMLS') {
      playPLMFX(
        enemy.id,
        direction === 'idle' ? ('idle' as GMLSAnimationType) : ('run' as GMLSAnimationType),
        direction !== 'idle' ? enemy.direction : null,
      );
    }
    if (type === 'ROFL') {
      let animationType = direction === 'idle' ? ('idle' as ROFLAnimationType) : 'run';
      if (animationType === 'run') {
        animationType += `_${direction}` as ROFLAnimationType;
      }
      playRoflFX(enemy.id, animationType as ROFLAnimationType);
    }
  });
};

const destroyAll = (): void => {
  if (scene.enemiesGroup) {
    scene.enemiesGroup.forEach((enemy) => {
      // console.log('@Enemy.destroyAll', enemy);
      if (Array.isArray(enemy)) {
        enemy.forEach((container) => container.destroy(true));
      } else {
        enemy.destroy(true);
      }
    });
    scene.enemiesGroup = new Map();
  }
};

const getSpriteName = (animation: string): string => {
  return AssetsController.allAnimationsConfig[animation]?.animationConfig.configKey || AssetsController.allAnimationsConfig[animation]?.id;
};

// TEST ANIMATIONS
const runTests = (action: boolean): void => {
  testEnemies('ROFL', 'ROFL', action, 0);
  testEnemies('GMLS', 'GMLS', action, 512);
  testEnemies('PLM2', 'GMLS', action, 1028);
};

const testEnemies = (model: EnemyTypeModels, type: 'GMLS' | 'ROFL', action: boolean, offsetX: number): void => {
  // to be spawned in top left corner

  const baseData: Enemy = {
    id: `${model}-0-`,
    type,
    name: 'NAME',
    created: true,
    destroyed: true,
    createdAt: Date.now().toString(),
    x: 200 + offsetX,
    y: 200,
    health: 10000,
    maxHP: 10000,
    creator: {
      id: '16315',
      name: 'P0LYGONER',
    },
  };

  // GMLS ['destroy', 'idle', 'transition', 'run_up', 'run_right', 'run_down', 'run_left']
  // ROFL [ 'idle', 'run_up', 'run_right', 'run_down', 'run_left', 'eat_up', 'eat_right', 'eat_down', 'eat_left', 'spot_up', 'spot_right', 'spot_down', 'spot_left', 'burp'];

  const animtionsToTest =
    type === 'GMLS'
      ? (['destroy', 'idle', 'transition', 'run_up', 'run_right', 'run_down', 'run_left'] as unknown as GMLSAnimationType)
      : ([
          'idle',
          'run_up',
          'run_right',
          'run_down',
          'run_left',
          'eat_up',
          'eat_right',
          'eat_down',
          'eat_left',
          'spot_up',
          'spot_right',
          'spot_down',
          'spot_left',
          'burp',
          'lore',
        ] as unknown as ROFLAnimationType);

  // create diff PLM2 and increse y with 100 for each
  const enemies: Enemy[] = _.map(animtionsToTest, (animation, index) => {
    const id = `${baseData.id}${animation}`;
    return _.assign({}, baseData, { id, y: baseData.y + index * 300 });
  });

  if (!action) {
    void destroy(enemies);
  } else {
    void create(enemies);
    // play all animations after 10s
    _.delay(() => {
      if (!ENABLE_TESTS) return;
      _.each(enemies, (enemy, index) => {
        let animation = animtionsToTest[index];
        let direction;
        if (type === 'GMLS') {
          if (animation.includes('up')) {
            animation = 'run';
            direction = { x: 0, y: -1 };
          } else if (animation.includes('down')) {
            animation = 'run';
            direction = { x: 0, y: 1 };
          } else if (animation.includes('left')) {
            animation = 'run';
            direction = { x: -1, y: 0 };
          } else if (animation.includes('right')) {
            animation = 'run';
            direction = { x: 1, y: 0 };
          } else if (animation === 'idle') direction = { x: 0, y: 0 };
        }

        if (animation === 'lore') {
          const container = scene.enemiesGroup.get(`${enemy.id}`)?.[0];
          if (container) void handleChatBubble(container, loreJson[0], 13000);
        } else if (animation === 'destroy') {
          // @ts-expect-error
          destroy([{ id: enemy.id, destroyed: true }]);
          // @ts-expect-error
        } else type === 'GMLS' ? playPLMFX(enemy.id, animation, direction) : playRoflFX(enemy.id, animation, true);
      });
    }, 6000);
  }
};

const Enemies: EnemiesInterace = {
  init,
  destroy,
  destroyAll,
  updateHealthBar,
  updateAP,
  create,
  updatePosition,
  triggerAction,
  applyEnemyHitVfx,
  runTests,
};

export default Enemies;
