import { State } from './store';

export enum GeneralActions {
  UPDATE_SHOW_AUTH_MODAL = 'UPDATE_SHOW_AUTH_MODAL',
  SET_VOLUME = 'SET_VOLUME',
  INITIALIZE = 'INITIALIZE',
  SET_LANGUAGE = 'SET_LANGUAGE',
}

export interface Action {
  type: GeneralActions;
  props: Partial<State>;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case GeneralActions.UPDATE_SHOW_AUTH_MODAL:
      return {
        ...state,
        showAuthModal: action.props.showAuthModal,
      };
    case GeneralActions.SET_VOLUME:
      return {
        ...state,
        volume: action.props.volume,
      };
    case GeneralActions.INITIALIZE:
      return {
        ...state,
        ...action.props,
      };
    case GeneralActions.SET_LANGUAGE:
      return {
        ...state,
        language: action.props.language,
      };
    default:
      return state;
  }
};
