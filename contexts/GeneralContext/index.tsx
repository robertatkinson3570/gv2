import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const GeneralContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const GeneralContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};

const useGeneral = (): [State, React.Dispatch<Action>] => useContext(GeneralContext);

export default GeneralContextProvider;
export { useGeneral };
