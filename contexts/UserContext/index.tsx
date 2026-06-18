import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const UserContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = (): [State, React.Dispatch<Action>] => useContext(UserContext);

export default UserContextProvider;
export { useUser };
