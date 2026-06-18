import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const DebugContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const VoiceContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};

const useVoice = (): [State, React.Dispatch<Action>] => useContext(DebugContext);

export default VoiceContextProvider;
export { useVoice };
