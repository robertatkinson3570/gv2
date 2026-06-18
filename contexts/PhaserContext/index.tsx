import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const PhaserContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const PhaserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <PhaserContext.Provider value={value}>{children}</PhaserContext.Provider>;
};

const usePhaser = (): [State, React.Dispatch<Action>] => useContext(PhaserContext);

export default PhaserContextProvider;
export { usePhaser };
