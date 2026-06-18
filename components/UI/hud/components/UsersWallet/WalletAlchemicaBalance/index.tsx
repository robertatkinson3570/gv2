import { useEffect, useState } from 'react';
import { NetworkNames } from 'types';
import { Loader } from 'components/UI/elements';
import styles from './styles';
import { ErrorIcon, GltrIcon } from 'assets';
import { getOnChainAlchemicaIcon } from 'helpers/functions';
import { useWeb3 } from 'contexts/Web3Context';
import Image from 'next/image';
import { useUser } from 'contexts/UserContext';
import { fetchAndSetAlchemicaBalance } from 'contexts/UserContext/actions';
import type { providers } from 'ethers';

export const WalletAlchemicaBalance = (): JSX.Element => {
  const [{ globalProvider, currentNetwork, currentAccount }] = useWeb3();
  const [{ alchemicaBalance, gltrBalance }, userDispatch] = useUser();

  const [fetching, setFetching] = useState(true);

  const fetchAndSetBalances = async (account: string, currentNetwork: NetworkNames, provider: providers.Provider) => {
    setFetching(true);
    await fetchAndSetAlchemicaBalance({ account: account, network: currentNetwork, provider }, userDispatch);
    setFetching(false);
  };

  useEffect(() => {
    void fetchAndSetBalances(currentAccount, currentNetwork, globalProvider);
  }, [currentAccount, globalProvider, currentNetwork]);

  return (
    <>
      <div>
        <div className="status-container">
          {fetching && (
            <div className="loading-state">
              <Loader size={0.3} color="purple" />
              <p>Fetching Balances...</p>
            </div>
          )}
          {!fetching && !alchemicaBalance && (
            <div className="error-state">
              <Image alt="" src={ErrorIcon} height={`${20}`} />
              <p>Error updating balances</p>
            </div>
          )}
        </div>
        {!fetching && (
          <div className="scrollable-area">
            {alchemicaBalance && (
              <div>
                {Object.keys(alchemicaBalance).map((token, i) => (
                  <div key={i} className="token">
                    <Image alt="" src={getOnChainAlchemicaIcon(token)} width={32} height={32} />
                    <p>{`${alchemicaBalance[token]?.toFixed(2) || 0} ${token}`}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
