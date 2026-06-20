import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { State, initialState } from './store';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Action, reducer } from './reducer';
import { chainIdToName } from 'helpers/ethers.helper';
import Web3ConnectProvider, { useUserWalletDataContext, useWeb3React } from 'components/utility/WalletConnect';
import { connectToSecondaryNetwork } from './actions';

const Web3Mapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [, dispatch] = useWeb3();
  const { library: provider, chainId } = useWeb3React<Web3Provider>();
  const { currentAccount, handleNetworkChange } = useUserWalletDataContext();

  const useLocalhost = process.env.USE_LOCALHOST === 'true';

  async function setLocalhostVars() {
    const newProvider = new JsonRpcProvider('http://localhost:8545');
    const account = '0x7e4724c60718a9f87ce51bcf8812bf90d0b7b9db'; // whichever account you want to impersonate

    await newProvider.send('hardhat_impersonateAccount', [account]);

    dispatch({
      type: 'UPDATE_ETHERS_SIGNER',
      ethersSigner: newProvider?.getSigner(),
    });

    dispatch({
      type: 'UPDATE_GLOBAL_PROVIDER',
      globalProvider: newProvider,
    });

    dispatch({
      type: 'UPDATE_CURRENT_NETWORK',
      currentNetwork: 'localhost',
    });

    dispatch({
      type: 'UPDATE_CURRENT_ACCOUNT',
      currentAccount: account,
    });
  }

  useEffect(() => {
    if (!useLocalhost) {
      dispatch({
        type: 'UPDATE_ETHERS_SIGNER',
        ethersSigner: provider?.getSigner(),
      });

      // Fallback read provider before a wallet connects. Must be Base (not the
      // old Polygon default) or token/alchemica balanceOf reads hit Polygon and
      // return 0 for Base holdings — and getContract caches the first provider.
      const globalProvider = provider || new JsonRpcProvider('https://mainnet.base.org');
      // console.log('globalProvider', globalProvider);
      // console.log('ethersSigner', provider?.getSigner());

      dispatch({
        type: 'UPDATE_GLOBAL_PROVIDER',
        globalProvider,
      });

      void connectToSecondaryNetwork(dispatch, globalProvider);
    }
  }, [provider?.provider]);

  useEffect(() => {
    if (!useLocalhost) {
      dispatch({
        type: 'UPDATE_CURRENT_NETWORK',
        currentNetwork: chainIdToName(chainId),
      });
      // console.log('currentNetwork', chainIdToName(chainId));
    }
  }, [chainId]);

  useEffect(() => {
    if (!useLocalhost) {
      dispatch({
        type: 'UPDATE_CURRENT_ACCOUNT',
        currentAccount: currentAccount,
      });
    }
  }, [currentAccount]);

  useEffect(() => {
    if (useLocalhost) {
      void setLocalhostVars();
    }
  }, []);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on('chainChanged', (e) => {
  //       handleNetworkChange(Number(e));
  //     });
  //   }
  // }, []);

  return <>{children}</>;
};

const Web3Context = createContext<[State, React.Dispatch<Action>]>([initialState, () => null]);

const Web3ContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const value = useReducer(reducer, initialState);
  return (
    <Web3ConnectProvider>
      <Web3Context.Provider value={value}>
        <Web3Mapper>{children}</Web3Mapper>
      </Web3Context.Provider>
    </Web3ConnectProvider>
  );
};

const useWeb3 = (): [State, React.Dispatch<Action>] => useContext(Web3Context);

export default Web3ContextProvider;
export { useWeb3 };
