import Web3ContextProvider from './Web3Context';
import GeneralContextProvider from './GeneralContext';
import UserContextProvider from './UserContext';
import RealmContext from './RealmContext';
import PhaserContextProvider from './PhaserContext';
import SettingsContextProvider from './SettingsContext';
import NotificationContextProvider from './NotificationContext';
import UIContextProvider from './UIContexts';
import ChatContextProvider from './ChatContext';
import GameContextProvider from './GameContext';

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props): JSX.Element => {
  return (
    <GeneralContextProvider>
      <GameContextProvider>
        <UserContextProvider>
          <NotificationContextProvider>
            <Web3ContextProvider>
              <RealmContext>
                <SettingsContextProvider>
                  <UIContextProvider>
                    <ChatContextProvider>
                      <PhaserContextProvider>{children}</PhaserContextProvider>
                    </ChatContextProvider>
                  </UIContextProvider>
                </SettingsContextProvider>
              </RealmContext>
            </Web3ContextProvider>
          </NotificationContextProvider>
        </UserContextProvider>
      </GameContextProvider>
    </GeneralContextProvider>
  );
};

export default GlobalContextProvider;
