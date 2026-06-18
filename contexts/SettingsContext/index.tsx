import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const SettingsContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const SettingsContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = (): [State, React.Dispatch<Action>] => useContext(SettingsContext);

export default SettingsContextProvider;
export { useSettings };
