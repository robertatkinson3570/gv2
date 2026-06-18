import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const RealmContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const RealmContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <RealmContext.Provider value={value}>{children}</RealmContext.Provider>;
};

const useRealm = (): [State, React.Dispatch<Action>] => useContext(RealmContext);

export default RealmContextProvider;
export { useRealm };
