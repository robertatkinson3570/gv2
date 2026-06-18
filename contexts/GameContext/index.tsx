import React, { createContext, useContext, useReducer } from 'react';
import { Action, reducer } from './reducer';
import { initialState, State } from './store';

const GameContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const GameContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = (): [State, React.Dispatch<Action>] => useContext(GameContext);

export default GameContextProvider;
export { useGame };
