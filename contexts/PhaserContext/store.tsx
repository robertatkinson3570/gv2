import { Vector2 } from 'types';
import { Scene } from 'types/phaser';

export interface State {
  scene: Scene;
  performance: any;
  host: string;
  playersOnline: string;
  queues: string;
  mapAlchemica: string;
  zoom: number;
  maxZoomOut: boolean;
  gameShooting: boolean;
  roundTime: number;
  miniGameRoundActive: boolean;
  toggleDebugConsole: boolean;
  toggleMinimap: boolean;
  toggleChatBar: boolean;
  toggleChat: boolean;
  playerPosition: Vector2;
  connected: boolean;
  socketConnected: boolean;
  disableKeyboard: boolean;
  minigameIntroAnimation: boolean;
  minigameOutroAnimation: boolean;
}

export const initialState: State = {
  scene: undefined,
  performance: undefined,
  host: 'Loading...',
  playersOnline: 'Loading...',
  queues: 'Loading...',
  mapAlchemica: 'Loading...',
  maxZoomOut: false,
  zoom: 1,
  gameShooting: false,
  roundTime: undefined,
  miniGameRoundActive: false,
  toggleDebugConsole: !['production'].includes(process.env.APP_ENV),
  toggleMinimap: true,
  toggleChatBar: true,
  toggleChat: false,
  playerPosition: { x: 528, y: 528 },
  connected: false,
  socketConnected: false,
  disableKeyboard: false,
  minigameIntroAnimation: false,
  minigameOutroAnimation: false,
};
