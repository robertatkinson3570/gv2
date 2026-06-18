export interface State {
  voiceRoomState: any;
  voiceRoomConnections: any;
  voiceRoomSockets: any;
}

export const initialState: State = {
  voiceRoomState: { init: undefined, isAdmin: false, room: undefined },
  voiceRoomConnections: { connected: undefined, name: undefined },
  voiceRoomSockets: [],
};
