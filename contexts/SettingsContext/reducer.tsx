/* eslint-disable @typescript-eslint/indent */
import type { CombatControlScheme } from 'types/phaser';
import { State } from './store';

export type GraphicSettingAction =
  | 'UPDATE_ALLOW_ANIMATED_TILES'
  | 'UPDATE_ALLOW_PLAYER_ANIMATION'
  | 'UPDATE_ALLOW_INSTALLATION_ANIMATIONS'
  | 'UPDATE_ALLOW_STARFIELD'
  | 'UPDATE_FADE_GRID'
  | 'UPDATE_ALLOW_GOTCHI_GLOW';

export type SoundSettingAction = 'UPDATE_ALLOW_MUSIC' | 'UPDATE_ALLOW_SOUND';
export type InputSettingsAction = 'UPDATE_COMBAT_CONTROLS';

export enum Setting {
  'UPDATE_ALLOW_ANIMATED_TILES' = 'allowAnimatedTiles',
  'UPDATE_ALLOW_PLAYER_ANIMATION' = 'allowPlayerAnimation',
  'UPDATE_ALLOW_INSTALLATION_ANIMATIONS' = 'allowInstallationAnimations',
  'UPDATE_ALLOW_STARFIELD' = 'allowStarField',
  'UPDATE_ALLOW_GOTCHI_GLOW' = 'allowGotchiGlow',
  'UPDATE_FADE_GRID' = 'fadeGrid',
  'UPDATE_ALLOW_MUSIC' = 'allowMusic',
  'UPDATE_ALLOW_SOUND' = 'allowSound',
  'UPDATE_COMBAT_CONTROLS' = 'combatControls',
}

export type Action =
  | {
      type: 'UPDATE_ALLOW_ANIMATED_TILES';
      [Setting.UPDATE_ALLOW_ANIMATED_TILES]: State['allowAnimatedTiles'];
    }
  | {
      type: 'UPDATE_ALLOW_PLAYER_ANIMATION';
      [Setting.UPDATE_ALLOW_PLAYER_ANIMATION]: State['allowPlayerAnimation'];
    }
  | {
      type: 'UPDATE_ALLOW_STARFIELD';
      [Setting.UPDATE_ALLOW_STARFIELD]: State['allowStarField'];
    }
  | {
      type: 'UPDATE_ALLOW_INSTALLATION_ANIMATIONS';
      [Setting.UPDATE_ALLOW_INSTALLATION_ANIMATIONS]: State['allowInstallationAnimations'];
    }
  | {
      type: 'UPDATE_FADE_GRID';
      [Setting.UPDATE_FADE_GRID]: State['fadeGrid'];
    }
  | {
      type: 'UPDATE_ALLOW_GOTCHI_GLOW';
      [Setting.UPDATE_ALLOW_GOTCHI_GLOW]: State['allowGotchiGlow'];
    }
  | {
      type: 'UPDATE_ALLOW_MUSIC';
      [Setting.UPDATE_ALLOW_MUSIC]: State['allowMusic'];
    }
  | {
      type: 'UPDATE_ALLOW_SOUND';
      [Setting.UPDATE_ALLOW_SOUND]: State['allowSound'];
    }
  | {
      type: 'UPDATE_COMBAT_CONTROLS';
      [Setting.UPDATE_COMBAT_CONTROLS]: State['combatControls'];
    };

export const getAction = (type: GraphicSettingAction | SoundSettingAction | InputSettingsAction, value: boolean | string): Action => {
  switch (type) {
    case 'UPDATE_ALLOW_ANIMATED_TILES':
      return {
        type,
        allowAnimatedTiles: value as boolean,
      };
    case 'UPDATE_ALLOW_PLAYER_ANIMATION':
      return {
        type,
        allowPlayerAnimation: value as boolean,
      };
    case 'UPDATE_ALLOW_STARFIELD':
      return {
        type,
        allowStarField: value as boolean,
      };
    case 'UPDATE_ALLOW_INSTALLATION_ANIMATIONS':
      return {
        type,
        allowInstallationAnimations: value as boolean,
      };
    case 'UPDATE_ALLOW_GOTCHI_GLOW':
      return {
        type,
        allowGotchiGlow: value as boolean,
      };
    case 'UPDATE_FADE_GRID':
      return {
        type,
        fadeGrid: value as boolean,
      };

    case 'UPDATE_ALLOW_MUSIC':
      return {
        type,
        allowMusic: value as boolean,
      };
    case 'UPDATE_ALLOW_SOUND':
      return {
        type,
        allowSound: value as boolean,
      };
    case 'UPDATE_COMBAT_CONTROLS':
      return {
        type,
        combatControls: value as CombatControlScheme,
      };
  }
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_ALLOW_ANIMATED_TILES':
      return {
        ...state,
        allowAnimatedTiles: action.allowAnimatedTiles,
      };
    case 'UPDATE_ALLOW_PLAYER_ANIMATION':
      return {
        ...state,
        allowPlayerAnimation: action.allowPlayerAnimation,
      };

    case 'UPDATE_ALLOW_STARFIELD':
      return {
        ...state,
        allowStarField: action.allowStarField,
      };
    case 'UPDATE_ALLOW_INSTALLATION_ANIMATIONS':
      return {
        ...state,
        allowInstallationAnimations: action.allowInstallationAnimations,
      };
    case 'UPDATE_ALLOW_GOTCHI_GLOW':
      return {
        ...state,
        allowGotchiGlow: action.allowGotchiGlow,
      };
    case 'UPDATE_FADE_GRID':
      return {
        ...state,
        fadeGrid: action.fadeGrid,
      };
    case 'UPDATE_ALLOW_MUSIC':
      return {
        ...state,
        allowMusic: action.allowMusic,
      };
    case 'UPDATE_ALLOW_SOUND':
      return {
        ...state,
        allowSound: action.allowSound,
      };
    case 'UPDATE_COMBAT_CONTROLS':
      console.log('UPDATE_COMBAT_CONTROLS', action.combatControls);
      return {
        ...state,
        combatControls: action.combatControls,
      };
    default:
      return state;
  }
};
