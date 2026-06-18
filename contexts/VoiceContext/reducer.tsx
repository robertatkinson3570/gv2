import { State } from './store';

export type Action =
  | { type: 'UPDATE_VOICE_ROOM_STATE'; voiceRoomState: State['voiceRoomState'] }
  | { type: 'UPDATE_VOICE_ROOM_SOCKETS'; voiceRoomSockets: State['voiceRoomSockets'] }
  | { type: 'UPDATE_VOICE_ROOM_CONNECTIONS'; voiceRoomConnections: State['voiceRoomConnections'] };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VOICE_ROOM_STATE':
      return {
        ...state,
        voiceRoomState: action.voiceRoomState,
      };

    case 'UPDATE_VOICE_ROOM_CONNECTIONS':
      return {
        ...state,
        voiceRoomConnections: action.voiceRoomConnections,
      };
    case 'UPDATE_VOICE_ROOM_SOCKETS':
      return {
        ...state,
        voiceRoomSockets: action.voiceRoomSockets,
      };
    default:
      return state;
  }
};
