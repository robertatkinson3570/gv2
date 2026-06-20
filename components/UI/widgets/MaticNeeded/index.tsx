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

  // Base gas is tiny (cents), so the 0.1 Polygon-era threshold was wrong — it
  // flagged "out of gas" for wallets holding plenty of ETH. ~0.0005 ETH covers
  // many txns on Base.
  const hasBalance = maticBalance !== undefined ? maticBalance >= 0.0005 : true;

  return (
    <>
      <div className={`notification-container ${!hasBalance ? 'visible' : ''}`}>
        <TopNotification>
          <div className="inner">
            <Image alt="" src={PolygonIcon} width={54} height={54} />
            <div className="content">
              <p>You{"'"}re out of ETH!</p>
              <a href="https://bridge.base.org/" target="_blank" rel="noreferrer">
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
