import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useNotification } from 'contexts/NotificationContext';
import { showNotificationWithTimeout } from 'contexts/NotificationContext/actions';
import { ChainId } from '../chains';
import { AvailableWeb3Connectors, disconnectWeb3Connector, getWeb3Connector } from '../connectors';
import messages from './messages';

interface UserWalletData {
  availableAccounts: string[];
  currentAccount: string;
  disconnectWallet: (error?: Error) => void;
  showSelectWalletModal: (boolean: boolean) => void;
  currentProviderName: AvailableWeb3Connectors | undefined;
  handleNetworkChange: (network: ChainId) => void;
  activating: boolean;
  walletModalVisible: boolean;
}

const formattingError = (error: Error | undefined, supportedChainIds: ChainId[]) => {
  if (!error || !error.message) {
    return;
  }
  // Unsupported chain
  if (error.message.includes('Unsupported chain id:')) {
    return messages.unsupportedNetwork.replace('{supportedNetworks}', supportedChainIds.join(', '));
  }
  // Disconnected or locked ledger
  if (error.message.includes('0x6804') || error.message.includes('0x6700')) {
    return messages.ledgerDisconnected;
  }
  // Ignore Ledger WebUSB errors: Invalid sequence or channel
  if (error.message.includes('Invalid sequence') || error.message.includes('Invalid channel')) {
    return;
  }

  return error.message;
};

const UserWalletDataContext = React.createContext<UserWalletData | null>(null);

export const useUserWalletDataContext = () => useContext(UserWalletDataContext);

export interface UnlockWalletPreloaderProps {
  currentProviderName?: AvailableWeb3Connectors;
}

export interface ConnectWalletModalProps {
  preferredChainId: ChainId;
  onSelectPreferredChainId: (chainId: ChainId) => void;
  supportedChainIds: ChainId[];
  onUnlockExternalWallet: (
    providerName: AvailableWeb3Connectors,
    chainId: ChainId,
    availableChainIds: ChainId[],
    skipLoad?: boolean,
  ) => Promise<boolean>;
  error?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}

interface Web3ProviderProps {
  defaultChainId: ChainId;
  supportedChainIds: ChainId[];
  connectWalletModal: (props: ConnectWalletModalProps) => JSX.Element;
}

export function Web3Provider({
  children,
  defaultChainId,
  supportedChainIds,
  connectWalletModal: ConnectWalletModal,
}: PropsWithChildren<Web3ProviderProps>) {
  const { library, account, activate, error, deactivate } = useWeb3React<ethers.providers.Web3Provider>();
  const [, dispatch] = useNotification();

  const [currentProviderName, setCurrentProviderName] = useState<AvailableWeb3Connectors | undefined>();
  const [preferredNetwork, setPreferredNetwork] = useState(
    Number(typeof window !== 'undefined' ? localStorage.getItem('preferredChainId') || defaultChainId : defaultChainId),
  );
  const [activating, setActivation] = useState(false);
  const [isSelectWalletModalVisible, setSelectWalletModalVisible] = useState(false);
  const [isErrorDetected, setErrorDetected] = useState(false);

  const formattedError = formattingError(error, supportedChainIds);

  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);

  const [currentAccount, setCurrentAccount] = useState('');
  const [mockWalletAddress, setMockWalletAddress] = useState('');

  const activateTimeout = async (connectorName: AvailableWeb3Connectors, network: ChainId): Promise<boolean> => {
    return await new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        try {
          await activate(getWeb3Connector(connectorName, network), () => null, true);
          setCurrentProviderName(connectorName);
          setActivation(false);
          resolve(true);
        } catch (e) {
          showNotificationWithTimeout(dispatch, {
            type: 'error',
            title: 'Error Connecting',
            message: e?.message || 'Unknown error connecting connector.',
          });
          disconnectWallet();
          resolve(false);
        }
      }, 500);
    });
  };

  /** Handlers */
  const handleActivation = async (connectorName: AvailableWeb3Connectors, network: ChainId): Promise<boolean> => {
    setActivation(true);
    localStorage.setItem('preferredChainId', network as unknown as string);
    try {
      setActivation(true);
      return await activateTimeout(connectorName, network);
    } catch (e) {
      showNotificationWithTimeout(dispatch, {
        type: 'error',
        title: 'Error Connecting',
        message: e?.message || 'Unknown error connecting connector.',
      });
      disconnectWallet();
      return false;
    }
  };

  const handleNetworkChange = async (network: ChainId) => {
    setPreferredNetwork(network);
    localStorage.setItem('preferredChainId', network as unknown as string);
    console.log('here', currentProviderName, library);
    if (currentProviderName && library) {
      return await handleActivation(currentProviderName, network);
    } else {
      return undefined;
    }
  };
  const handleUnlockWallet = useCallback(async (connectorName: AvailableWeb3Connectors, chainId: ChainId) => {
    try {
      const isActivated = await handleActivation(connectorName, chainId);
      // console.log('Activated: ', isActivated);
      if (isActivated) {
        setSelectWalletModalVisible(false);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }, []);

  const handleAccountsListLoading = async (provider?: ethers.providers.Web3Provider, retries = 0) => {
    // Implement a retry system to prevent users to infinitely load Aave page during a connection issue.
    if (retries <= 0) {
      const error = new Error(
        '[Aave][Web3Provider] Max account reload reached. Clearing app state. Ask Aave support channels if you encounter this error.',
      );
      // Clear state and disconnect wallet
      disconnectWallet();

      console.error(error);
    }
    // Lock the `handleAccountsListLoading` function if accounts are loading, to prevent spamming `await provider.listAccounts()`
    // and saturating the Web3 provider connection.
    if (provider) {
      let accounts: string[] = [];
      try {
        accounts = provider ? await provider.listAccounts() : [];
      } catch (error) {
        // Catch any Web3 load error or Ledger connection error when the app tries to connect prior connecting to the USB device
        // Hold the retry until 3 segs if there is an error loading accounts,
        // to prevent spamming the Ledger Web USB channel and block the connection.
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(async () => {
          console.log('[Aave][Web3Provider] Retrying Web3 connection.');
          await handleAccountsListLoading(provider, retries - 1);
        }, 3000);
      }
      const storedAccount = localStorage.getItem('selectedAccount');
      setAvailableAccounts(accounts);
      // // TODO: most probably lower case useless, keeping it just in case
      // if (storedAccount && accounts.map((acc) => acc.toLowerCase()).includes(storedAccount.toLowerCase())) {
      //  // If loaded account and local storage account matches, set the account
      //  handleSetCurrentAccount(storedAccount);
      // } else {
      // If storage does not match loaded accounts and is not a Ledger provider, them use first account from loaded accounts
      handleSetCurrentAccount(accounts[0]);
      // }
    }
  };

  const handleSetCurrentAccount = (account: string) => {
    setCurrentAccount(account);
    localStorage.setItem('selectedAccount', account);
  };

  const disconnectWallet = () => {
    disconnectWeb3Connector();
    setAvailableAccounts([]);
    setCurrentAccount('');
    setCurrentProviderName(undefined);
    deactivate();
  };
  /** End of Handlers */

  /** Side effects */
  useEffect(() => {
    setMockWalletAddress(localStorage.getItem('mockWalletAddress') || '');
  }, []);

  // try to check on the startapp, if we're in the gnosis iFrame - activate this provider
  useEffect(() => {
    const safeAppConnector = new SafeAppConnector();

    void safeAppConnector.isSafeApp().then((isSafeApp) => {
      let storedProviderName = localStorage.getItem('currentProvider') as AvailableWeb3Connectors | undefined;
      if (isSafeApp) {
        storedProviderName = 'gnosis-safe';
      } else if (storedProviderName === 'gnosis-safe') {
        storedProviderName = undefined;
      }
      if (storedProviderName) {
        // console.log('storedProviderName', storedProviderName);
        setCurrentProviderName(storedProviderName);
        void handleUnlockWallet(storedProviderName, preferredNetwork);
      } else {
        setCurrentAccount('');
        setActivation(false);
      }
    });
  }, []);

  // TODO: disabled for now, require more testing to understand risks
  // on update of connector config
  // and on chain id update - to prevent bugs on matic
  // we're recreating provider
  // useEffect(() => {
  //   if (currentProviderName === 'browser') {
  //     handleUnlockWallet(
  //       currentProviderName,
  //       preferredNetwork,
  //       supportedChainIds,
  //       connectorOptionalConfig
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chainId]);

  // store chosen provider name in localStorage after update
  useEffect(() => {
    if (account && currentProviderName) {
      localStorage.setItem('currentProvider', currentProviderName);

      void handleAccountsListLoading(library, 10);
    }
  }, [account, currentProviderName, handleUnlockWallet, library]);

  useEffect(() => {
    if (formattedError) {
      setErrorDetected(true);
    } else {
      setErrorDetected(false);
    }
  }, [formattedError, currentAccount]);
  /** End of side effects */

  return (
    <UserWalletDataContext.Provider
      value={{
        availableAccounts,
        disconnectWallet,
        currentAccount: currentAccount && mockWalletAddress ? mockWalletAddress : currentAccount,
        showSelectWalletModal: (visible: boolean) => setSelectWalletModalVisible(visible),
        walletModalVisible: isSelectWalletModalVisible,
        currentProviderName,
        handleNetworkChange,
        activating,
      }}
    >
      {(!account || !library || !currentAccount) && (
        <ConnectWalletModal
          preferredChainId={preferredNetwork}
          onSelectPreferredChainId={handleNetworkChange}
          supportedChainIds={supportedChainIds}
          onUnlockExternalWallet={handleUnlockWallet}
          error={formattedError}
          isVisible={isSelectWalletModalVisible || isErrorDetected}
          onBackdropPress={() => {
            setSelectWalletModalVisible(false);
            setErrorDetected(false);
          }}
        />
      )}

      {children}
    </UserWalletDataContext.Provider>
  );
}
