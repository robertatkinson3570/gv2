import { CombatControlScheme } from 'types/phaser';

export interface State {
  allowAnimatedTiles: boolean;
  allowPlayerAnimation: boolean;
  allowStarField: boolean;
  allowInstallationAnimations: boolean;
  allowGotchiGlow: boolean;
  fadeGrid: boolean;
  allowMusic: boolean;
  allowSound: boolean;
  combatControls: CombatControlScheme;
}

export const initialState: State = {
  allowAnimatedTiles: true,
  allowPlayerAnimation: true,
  allowStarField: true,
  allowInstallationAnimations: true,
  allowGotchiGlow: true,
  fadeGrid: true,
  allowMusic: true,
  allowSound: true,
  combatControls: 'arcade',
};
