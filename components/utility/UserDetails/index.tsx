import React, { useEffect } from 'react';
import { useUser } from 'contexts/UserContext';
import { updateGhstBalance } from 'contexts/UserContext/actions';
import { useWeb3 } from 'contexts/Web3Context';
import { useGeneral } from 'contexts/GeneralContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { BigNumber } from 'ethers';
import { GeneralActions } from 'contexts/GeneralContext/reducer';

interface Props {
  jazzicon?: boolean;
}

export const UserDetails = ({ jazzicon }: Props) => {
  const { click } = useAavegotchiSound();
  const [{ currentAccount, currentNetwork, globalProvider }, web3Dispatch] = useWeb3();
  const [, generalDispatch] = useGeneral();
  const [, userDispatch] = useUser();

  useEffect(() => {
    if (currentAccount && currentNetwork && globalProvider) {
      // console.log(currentAccount, currentNetwork, globalProvider);
      void updateGhstBalance({ provider: globalProvider, network: currentNetwork, account: currentAccount }, userDispatch);
    } else {
      userDispatch({
        type: 'UPDATE_GHST_BALANCE',
        ghstBalance: BigNumber.from('0'),
      });
    }
  }, [currentAccount, currentNetwork, globalProvider]);

  // useInterval(() => {
  //     if (currentNetwork && currentAccount && globalProvider) {
  //         updateGhstBalance({ provider: globalProvider, network: currentNetwork, account: currentAccount }, userDispatch);
  //     }
  // }, 10000);

  const checkUser = () => {
    console.log('checkUser');
    click();
    generalDispatch({
      type: GeneralActions.UPDATE_SHOW_AUTH_MODAL,
      props: {
        showAuthModal: true,
      },
    });
  };

  // const handleLogout = async () => {
  //   click();
  //   logout(web3Dispatch);
  // };

  return <></>;
};
