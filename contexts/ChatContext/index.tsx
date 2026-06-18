import React, { createContext, useReducer, useContext } from 'react';
import { State, initialState } from './store';
import { Action, reducer } from './reducer';

const ChatContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const ChatContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const useChat = (): [State, React.Dispatch<Action>] => useContext(ChatContext);

export default ChatContextProvider;
export { useChat };
