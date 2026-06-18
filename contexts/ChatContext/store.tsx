import { ChatEvent, ChatRoomEvent, SuperChatEvent, WebSocketObject } from 'types';

export interface State {
  socket?: WebSocketObject;
  localChatEvents: Array<ChatRoomEvent | ChatEvent>;
  globalChatEvents: Array<ChatRoomEvent | ChatEvent>;
  superChatEvents: SuperChatEvent[];
  gotchiImgs: { [id: string]: GotchiImage };
  gotchiSides: { [id: string]: string[] };
  bigChatOpen: boolean;
}

export interface GotchiImage {
  img: string;
  id: string;
}

// export interface GotchiSides {
//   id: string;
//   svg: string;
//   top: string;
//   bottom: string;
//   left: string;
//   right: string;
// }

export const initialState: State = {
  localChatEvents: [],
  globalChatEvents: [],
  superChatEvents: [],
  gotchiImgs: {},
  gotchiSides: {},
  bigChatOpen: false,
};
