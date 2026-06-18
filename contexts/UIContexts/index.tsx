import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const UIContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const UIContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

const useUI = (): [State, React.Dispatch<Action>] => useContext(UIContext);

export default UIContextProvider;
export { useUI };
