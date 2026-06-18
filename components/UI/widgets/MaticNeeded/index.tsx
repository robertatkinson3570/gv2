import { PolygonIcon } from 'assets';
import { TopNotification } from 'components/UI/component';
import { Button } from 'components/UI/elements';
import { useUser } from 'contexts/UserContext';
import { fetchAndSetMaticBalance } from 'contexts/UserContext/actions';
import { useWeb3 } from 'contexts/Web3Context';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from './styles';

export const MaticNeeded = (): JSX.Element => {
  const [{ maticBalance }, userDispatch] = useUser();
  const [{ currentAccount, globalProvider, currentNetwork }] = useWeb3();

  useEffect(() => {
    if (currentAccount && globalProvider && currentNetwork) {
      const web3Options = { provider: globalProvider, account: currentAccount, network: currentNetwork };
      void fetchAndSetMaticBalance(web3Options, userDispatch);
    }
  }, [currentAccount, globalProvider, currentNetwork]);

  const hasBalance = maticBalance !== undefined ? maticBalance >= 0.1 : true;

  return (
    <>
      <div className={`notification-container ${!hasBalance ? 'visible' : ''}`}>
        <TopNotification>
          <div className="inner">
            <Image alt="" src={PolygonIcon} width={54} height={54} />
            <div className="content">
              <p>You{"'"}re out of MATIC!</p>
              <a href="https://wallet.polygon.technology/gas-swap/" target="_blank" rel="noreferrer">
                <Button size={1.8} fullWidth secondary>
                  Swap for Gas Token
                </Button>
              </a>
            </div>
          </div>
        </TopNotification>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
