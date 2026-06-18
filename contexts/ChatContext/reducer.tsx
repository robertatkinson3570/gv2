/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/indent */
import _ from 'lodash';
import { ChatEvent, ChatRoomEvent, SuperChatEvent } from 'types';
import { State } from './store';

export type Action =
  | {
      type: 'PUSH_LOCAL_CHAT_EVENT';
      chatEvent: ChatEvent | ChatRoomEvent;
    }
  | {
      type: 'PUSH_GLOBAL_CHAT_EVENT';
      chatEvent: ChatEvent | ChatRoomEvent;
    }
  | {
      type: 'PUSH_SUPER_CHAT_EVENT';
      chatEvent: SuperChatEvent;
    }
  | {
      type: 'REMOVE_SUPER_CHAT_EVENT';
      chatEvent: SuperChatEvent;
    }
  | {
      type: 'PUSH_GOTCHI_IMGS';
      gotchiImgs: State['gotchiImgs'];
    }
  | {
      type: 'PUSH_GOTCHI_SIDES';
      gotchiSides: State['gotchiSides'];
    }
  | { type: 'UPDATE_SOCKET'; socket: State['socket'] }
  | { type: 'CLEAR_CHAT_EVENTS' }
  | { type: 'TOGGLE_BIG_CHAT'; bigChatOpen: State['bigChatOpen'] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CLEAR_CHAT_EVENTS':
      return {
        ...state,
        localChatEvents: [],
        globalChatEvents: [],
        superChatEvents: [],
      };
    case 'PUSH_SUPER_CHAT_EVENT':
      return {
        ...state,
        superChatEvents: [...state.superChatEvents, action.chatEvent],
      };
    case 'REMOVE_SUPER_CHAT_EVENT':
      const chatEvents = [...state.superChatEvents];
      _.remove(chatEvents, (event) => event.chatId === action.chatEvent.chatId);
      return {
        ...state,
        superChatEvents: chatEvents,
      };
    case 'PUSH_LOCAL_CHAT_EVENT':
      return {
        ...state,
        localChatEvents: [...state.localChatEvents, action.chatEvent],
      };
    case 'PUSH_GLOBAL_CHAT_EVENT':
      return {
        ...state,
        globalChatEvents: [...state.globalChatEvents, action.chatEvent],
      };
    case 'PUSH_GOTCHI_IMGS':
      return {
        ...state,
        gotchiImgs: { ...state.gotchiImgs, ...action.gotchiImgs },
      };
    case 'PUSH_GOTCHI_SIDES':
      return {
        ...state,
        gotchiSides: { ...state.gotchiSides, ...action.gotchiSides },
      };
    case 'UPDATE_SOCKET':
      return {
        ...state,
        socket: action.socket,
      };
    default:
      return state;
  }
};
