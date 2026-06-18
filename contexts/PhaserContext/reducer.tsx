import { State } from './store';
import InputController from 'components/controllers/inputController';
import MapController from 'components/controllers/MapController';

export type Action =
  | { type: 'UPDATE_SCENE'; scene: State['scene'] }
  | { type: 'UPDATE_PERFORMANCE'; performance: State['performance'] }
  | { type: 'UPDATE_MAX_ZOOM_OUT'; maxZoomOut: State['maxZoomOut'] }
  | { type: 'UPDATE_ZOOM_SLIDER'; zoom: State['zoom'] }
  | { type: 'UPDATE_GAME_SHOOTING'; gameShooting: State['gameShooting'] }
  | { type: 'UPDATE_PLAYERS_ONLINE'; playersOnline: State['playersOnline']; mapAlchemica: State['mapAlchemica']; queues: State['queues'] }
  | { type: 'UPDATE_ROUND_TIME'; roundTime: State['roundTime'] }
  | { type: 'UPDATE_PLAYER_POSITION'; playerPosition: State['playerPosition'] }
  | { type: 'UPDATE_ROUND_ACTIVE'; miniGameRoundActive: State['miniGameRoundActive'] }
  | { type: 'TOGGLE_DEBUG_CONSOLE'; toggleDebugConsole: State['toggleDebugConsole'] }
  | { type: 'TOGGLE_MINIMAP'; toggleMinimap: State['toggleMinimap'] }
  | { type: 'TOGGLE_CHATBAR'; toggleChatBar: State['toggleChatBar'] }
  | { type: 'UPDATE_MINIGAME_INTRO_ANIMATION'; minigameIntroAnimation: State['minigameIntroAnimation'] }
  | { type: 'UPDATE_MINIGAME_OUTRO_ANIMATION'; minigameOutroAnimation: State['minigameOutroAnimation'] }
  | { type: 'TOGGLE_CHAT'; toggleChat: State['toggleChat'] }
  | { type: 'UPDATE_HOST'; host: State['host'] }
  | { type: 'UPDATE_CONNECTED'; connected: State['connected'] }
  | { type: 'UPDATE_SOCKET_CONNECTED'; socketConnected: State['socketConnected'] }
  | { type: 'UPDATE_DISABLE_KEYBOARD'; disableKeyboard: State['disableKeyboard'] };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_SCENE':
      return {
        ...state,
        scene: action.scene,
      };
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performance: { ...state.performance, ...action.performance },
      };

    case 'UPDATE_HOST':
      return {
        ...state,
        host: action.host,
      };

    case 'UPDATE_PLAYERS_ONLINE':
      return {
        ...state,
        playersOnline: action.playersOnline,
        mapAlchemica: action.mapAlchemica,
        queues: action.queues,
      };
    case 'UPDATE_MAX_ZOOM_OUT':
      return {
        ...state,
        maxZoomOut: action.maxZoomOut,
      };
    case 'UPDATE_ZOOM_SLIDER':
      return {
        ...state,
        zoom: action.zoom,
      };
    case 'UPDATE_GAME_SHOOTING':
      return {
        ...state,
        gameShooting: action.gameShooting,
      };
    case 'UPDATE_ROUND_TIME':
      return {
        ...state,
        roundTime: action.roundTime,
      };
    case 'UPDATE_ROUND_ACTIVE':
      return {
        ...state,
        miniGameRoundActive: action.miniGameRoundActive,
      };
    case 'TOGGLE_DEBUG_CONSOLE':
      return {
        ...state,
        toggleDebugConsole: action.toggleDebugConsole,
      };
    case 'TOGGLE_MINIMAP':
      MapController.toggleMinimap(action.toggleMinimap);
      return {
        ...state,
        toggleMinimap: action.toggleMinimap,
      };
    case 'TOGGLE_CHATBAR':
      InputController.updateChatBarToggle(action.toggleChatBar);
      return {
        ...state,
        toggleChatBar: action.toggleChatBar,
      };
    case 'TOGGLE_CHAT':
      InputController.updateChatToggle(action.toggleChat);
      return {
        ...state,
        toggleChat: action.toggleChat,
      };
    case 'UPDATE_PLAYER_POSITION':
      return {
        ...state,
        playerPosition: action.playerPosition,
      };
    case 'UPDATE_CONNECTED':
      return {
        ...state,
        connected: action.connected,
      };
    case 'UPDATE_SOCKET_CONNECTED':
      return {
        ...state,
        socketConnected: action.socketConnected,
      };
    case 'UPDATE_MINIGAME_INTRO_ANIMATION':
      return {
        ...state,
        minigameIntroAnimation: action.minigameIntroAnimation,
      };
    case 'UPDATE_MINIGAME_OUTRO_ANIMATION':
      return {
        ...state,
        minigameOutroAnimation: action.minigameOutroAnimation,
      };
    case 'UPDATE_DISABLE_KEYBOARD':
      InputController.updateDisableKeyboard(action.disableKeyboard);
      return {
        ...state,
        disableKeyboard: action.disableKeyboard,
      };
    default:
      return state;
  }
};
