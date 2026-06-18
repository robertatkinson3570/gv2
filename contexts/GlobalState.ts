// GLOBAL REACT STATE TO BE USED OUTSIDE REACT COMPONENTS
import { Action as UIAction } from './UIContexts/reducer';
import { Action as RealmAction } from './RealmContext/reducer';
import { Action as WEB3Action } from './Web3Context/reducer';
import { Action as ChatAction } from './ChatContext/reducer';
import { Action as UserAction } from './UserContext/reducer';
import { Action as GeneralAction } from './GeneralContext/reducer';
import { Action as PhaserAction } from './PhaserContext/reducer';
import { Action as NotificationAction } from './NotificationContext/reducer';
import { Action as SettingsAction } from './SettingsContext/reducer';
import { Action as GameAction } from './GameContext/reducer';

import { State as UIState } from './UIContexts/store';
import { State as RealmState } from './RealmContext/store';
import { State as WEB3State } from './Web3Context/store';
import { State as ChatState } from './ChatContext/store';
import { State as UserState } from './UserContext/store';
import { State as GeneralState } from './GeneralContext/store';
import { State as PhaserState } from './PhaserContext/store';
import { State as NotificationState } from './NotificationContext/store';
import { State as SettingsState } from './SettingsContext/store';
import { State as GameState } from './GameContext/store';

interface GlobalStateType {
  UI: { dispatch: React.Dispatch<UIAction>; state: UIState };
  REALM: { dispatch: React.Dispatch<RealmAction>; state: RealmState };
  WEB3: { dispatch: React.Dispatch<WEB3Action>; state: WEB3State };
  CHAT: { dispatch: React.Dispatch<ChatAction>; state: ChatState };
  USER: { dispatch: React.Dispatch<UserAction>; state: UserState };
  GENERAL: { dispatch: React.Dispatch<GeneralAction>; state: GeneralState };
  PHASER: { dispatch: React.Dispatch<PhaserAction>; state: PhaserState };
  NOTIFICATION: { dispatch: React.Dispatch<NotificationAction>; state: NotificationState };
  SETTINGS: { dispatch: React.Dispatch<SettingsAction>; state: SettingsState };
  GAME: { dispatch: React.Dispatch<GameAction>; state: GameState };

  init: (type: ContextType, context) => void;
  update: (type: ContextType, context) => void;
}

type ContextType = 'UI' | 'REALM' | 'WEB3' | 'CHAT' | 'USER' | 'GENERAL' | 'PHASER' | 'NOTIFICATION' | 'SETTINGS' | 'GAME';
interface StateTypes {
  UI: UIState;
  REALM: RealmState;
  WEB3: WEB3State;
  CHAT: ChatState;
  USER: UserState;
  GENERAL: GeneralState;
  PHASER: PhaserState;
  NOTIFICATION: NotificationState;
  SETTINGS: SettingsState;
  GAME: GameState;
}

// NEW GlobalState
const UI: { dispatch: React.Dispatch<UIAction>; state: UIState } = { dispatch: undefined, state: undefined };
const REALM: { dispatch: React.Dispatch<RealmAction>; state: RealmState } = { dispatch: undefined, state: undefined };
const WEB3: { dispatch: React.Dispatch<WEB3Action>; state: WEB3State } = { dispatch: undefined, state: undefined };
const CHAT: { dispatch: React.Dispatch<ChatAction>; state: ChatState } = { dispatch: undefined, state: undefined };
const USER: { dispatch: React.Dispatch<UserAction>; state: UserState } = { dispatch: undefined, state: undefined };
const GENERAL: { dispatch: React.Dispatch<GeneralAction>; state: GeneralState } = { dispatch: undefined, state: undefined };
const PHASER: { dispatch: React.Dispatch<PhaserAction>; state: PhaserState } = { dispatch: undefined, state: undefined };
const NOTIFICATION: { dispatch: React.Dispatch<NotificationAction>; state: NotificationState } = { dispatch: undefined, state: undefined };
const SETTINGS: { dispatch: React.Dispatch<SettingsAction>; state: SettingsState } = { dispatch: undefined, state: undefined };
const GAME: { dispatch: React.Dispatch<GameAction>; state: GameState } = { dispatch: undefined, state: undefined };

const init = <ContextType extends keyof GlobalStateType>(type: ContextType, context: GlobalStateType[ContextType]): void => {
  GlobalState[type] = context;
};

const update = <ContextType extends keyof StateTypes>(type: ContextType, state: StateTypes[ContextType]): void => {
  GlobalState[type].state = state;
};

const GlobalState: GlobalStateType = {
  UI,
  REALM,
  WEB3,
  CHAT,
  USER,
  GENERAL,
  PHASER,
  NOTIFICATION,
  SETTINGS,
  GAME,
  init,
  update,
};

export default GlobalState;
