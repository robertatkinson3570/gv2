import { Action } from './reducer';
import { ethers } from 'ethers';
import React from 'react';
import { varsForNetwork } from 'shared_code/web3/shared.const.web3';
import { NetworkNames } from 'types';

export const connectToSecondaryNetwork = async (
  dispatch: React.Dispatch<Action>,
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
): Promise<void> => {
  try {
    dispatch({ type: 'START_ASYNC' });

    // add secondaryProvider/secondaryNetowrk/secondarySigner to fetch contract data from outside our network.
    const vars = varsForNetwork(process.env.ALCHEMICA_NETWORK);
    const maticVars = varsForNetwork('matic');
    const secondaryProvider =
      process.env.REALM_NETWORK !== process.env.ALCHEMICA_NETWORK ? new ethers.providers.JsonRpcProvider(vars.jsonRPC) : provider;
    const secondaryNetwork = process.env.ALCHEMICA_NETWORK as NetworkNames;
    const maticProvider = new ethers.providers.JsonRpcProvider(maticVars.jsonRPC);
    const secondarySigner = await secondaryProvider.getSigner();

    dispatch({
      type: 'UPDATE_SECONDARY_NETWORK',
      secondaryNetwork: secondaryNetwork,
    });
    dispatch({
      type: 'UPDATE_MATIC_PROVIDER',
      maticProvider: maticProvider,
    });
    dispatch({
      type: 'UPDATE_SECONDARY_PROVIDER',
      secondaryProvider: secondaryProvider,
    });
    dispatch({
      type: 'UPDATE_SECONDARY_SIGNER',
      secondarySigner: secondarySigner,
    });
    // dispatch({
    //   type: 'UPDATE_ETHERS_SIGNITURE',
    //   ethersSigniture: signiture,
    // });
    dispatch({ type: 'END_ASYNC' });
  } catch (err) {
    dispatch({ type: 'END_ASYNC' });
    console.error(err);
  }
};
