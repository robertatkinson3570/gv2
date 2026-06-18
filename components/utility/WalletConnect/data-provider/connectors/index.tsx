import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { CloverConnector } from '@clover-network/clover-connector';
import { ChainId } from '../chains';
import { VENLY_CLIENT_ID } from '../config';
import { getNetworkConfig, getSupportedChainIds } from '../config/network-config';
import { VenlyConnector } from './venly-connector';

export type AvailableWeb3Connectors =
  | 'browser'
  | 'wallet-connect'
  | 'gnosis-safe'
  | 'clover'
  | 'venly';

export function getWeb3Connector(connectorName: AvailableWeb3Connectors, chainId: ChainId): AbstractConnector {
  switch (connectorName) {
    case 'browser':
      return new InjectedConnector({
        supportedChainIds: getSupportedChainIds(),
      });
    case 'wallet-connect':
      return new WalletConnectConnector({
        rpc: getSupportedChainIds().reduce((acc: { [networkId: number]: string }, network) => {
          const config = getNetworkConfig(network);
          acc[network] = config.privateJsonRPCUrl || config.publicJsonRPCUrl[0];
          return acc;
        }, {}),
        qrcode: true,
        infuraId: process.env.INFURA_ID,
      });
    case 'clover':
      return new CloverConnector({
        supportedChainIds: getSupportedChainIds(),
      });
    case 'venly':
      if (!VENLY_CLIENT_ID) throw new Error('Venly DAPP id not specified');
      return new VenlyConnector({
        clientId: VENLY_CLIENT_ID,
        supportedChainIds: getSupportedChainIds(),
        chainId,
        environment: process.env.ENVIRONMENT === 'dev' ? 'staging' : 'production',
        signMethod: 'POPUP',
      });
    case 'gnosis-safe': {
      return new SafeAppConnector();
    }
    default: {
      throw new Error(`unsupported connector name: ${connectorName}`);
    }
  }
}
export function disconnectWeb3Connector(): void {
  const currentProvider = localStorage.getItem('currentProvider') as AvailableWeb3Connectors | undefined;
  switch (currentProvider) {
    case 'wallet-connect': {
      localStorage.removeItem('walletconnect');
      break;
    }
  }
  localStorage.removeItem('currentProvider');
}
