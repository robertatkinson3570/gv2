import * as providers from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { NetworkNames } from 'types';

export interface State {
  authToken?: string;
  currentAccount?: string;
  currentNetwork?: NetworkNames;
  globalProvider?: providers.Web3Provider | providers.JsonRpcProvider;
  metaTransactionContract?: Contract;
  ethersSigner?: Signer;
  web3Loading: boolean;
  ethersSigniture?: string;
  secondaryNetwork?: NetworkNames;
  secondaryProvider?: providers.Provider | providers.JsonRpcProvider;
  maticProvider?: providers.Provider | providers.JsonRpcProvider;
  secondarySigner?: Signer;
}

export const initialState = {
  web3Loading: false,
};
