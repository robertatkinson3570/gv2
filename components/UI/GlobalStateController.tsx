import { useChat } from 'contexts/ChatContext';
import { useGame } from 'contexts/GameContext';
import { useGeneral } from 'contexts/GeneralContext';
import GlobalState from 'contexts/GlobalState';
import { useNotification } from 'contexts/NotificationContext';
import { usePhaser } from 'contexts/PhaserContext';
import { useRealm } from 'contexts/RealmContext';
import { useSettings } from 'contexts/SettingsContext';
import { useUI } from 'contexts/UIContexts';
import { useUser } from 'contexts/UserContext';
import { useWeb3 } from 'contexts/Web3Context';
import { useEffect } from 'react';

const GlobalStateController = (): JSX.Element => {
  const [uiState, uiDispatch] = useUI();
  const [realmState, realmDispatch] = useRealm();
  const [web3State, web3Dispatch] = useWeb3();
  const [chatState, chatDispatch] = useChat();
  const [userState, userDispatch] = useUser();
  const [generalState, generalDispatch] = useGeneral();
  const [phaserState, phaserDispatch] = usePhaser();
  const [notificationState, notificationDispatch] = useNotification();
  const [settingsState, settingsDispatch] = useSettings();
  const [gameState, gameDispatch] = useGame();

  useEffect(() => {
    GlobalState.init('UI', { state: uiState, dispatch: uiDispatch });
    GlobalState.init('REALM', { state: realmState, dispatch: realmDispatch });
    GlobalState.init('WEB3', { state: web3State, dispatch: web3Dispatch });
    GlobalState.init('CHAT', { state: chatState, dispatch: chatDispatch });
    GlobalState.init('USER', { state: userState, dispatch: userDispatch });
    GlobalState.init('GENERAL', { state: generalState, dispatch: generalDispatch });
    GlobalState.init('PHASER', { state: phaserState, dispatch: phaserDispatch });
    GlobalState.init('NOTIFICATION', { state: notificationState, dispatch: notificationDispatch });
    GlobalState.init('SETTINGS', { state: settingsState, dispatch: settingsDispatch });
    GlobalState.init('GAME', { state: gameState, dispatch: gameDispatch });
  }, []);

  useEffect(() => {
    GlobalState.update('UI', uiState);
  }, [uiState]);

  useEffect(() => {
    GlobalState.update('REALM', realmState);
  }, [realmState]);

  useEffect(() => {
    GlobalState.update('WEB3', web3State);
  }, [web3State]);

  useEffect(() => {
    GlobalState.update('CHAT', chatState);
  }, [chatState]);

  useEffect(() => {
    GlobalState.update('USER', userState);
  }, [userState]);

  useEffect(() => {
    GlobalState.update('GENERAL', generalState);
  }, [generalState]);

  useEffect(() => {
    GlobalState.update('PHASER', phaserState);
  }, [phaserState]);

  useEffect(() => {
    GlobalState.update('NOTIFICATION', notificationState);
  }, [notificationState]);

  useEffect(() => {
    GlobalState.update('SETTINGS', settingsState);
  }, [settingsState]);

  useEffect(() => {
    GlobalState.update('GAME', gameState);
  }, [gameState]);

  return <></>;
};

export default GlobalStateController;
