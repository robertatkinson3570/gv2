import { useEffect, useState } from 'react';
import { PocketModal } from './PocketModal';
import { PocketToggle } from './PocketToggle';
import { PocketAssets } from './PocketAssets';
import { LendingDetails } from './LendingDetails';
import styles from './styles';
import { Tokens } from 'types';
import { Button } from 'components/UI/elements';
import { useRealm } from 'contexts/RealmContext';
import { useWeb3 } from 'contexts/Web3Context';
import { getContract } from 'web3/contract';
import { getUserAlchemicaBalances } from 'helpers/gotchi.helper';
import { useNotification } from 'contexts/NotificationContext';
import { showNotificationWithTimeout } from 'contexts/NotificationContext/actions';
import { useUI } from 'contexts/UIContexts';
import { postFocusStatus } from 'contexts/UIContexts/actions';

enum TokenAddresses {
  fud = '0x403E967b044d4Be25170310157cB1A4Bf10bdD0f',
  fomo = '0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8',
  alpha = '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2',
  kek = '0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C',
}

interface LendingInfo {
  profitSplit: {
    borrower: number;
    owner: number;
    other: number;
  };
  revenueTokens: { [key in Tokens]: boolean };
}

export const GotchiPocket = (): JSX.Element => {
  const [{ selectedPlayer, escrow }] = useRealm();
  const [{ currentNetwork, globalProvider, ethersSigner }] = useWeb3();
  const [, dispatch] = useNotification();

  const [open, setOpen] = useState(false);
  const [fetching, setPending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>();
  const [endTime, setEndTime] = useState<Date>();
  const [{ socket }, uiDispatch] = useUI();

  const [pocketBalance, setPocketBalance] = useState<{ [key in Tokens]: number }>({
    fud: 0,
    fomo: 0,
    alpha: 0,
    kek: 0,
  });

  const [claimableBalance, setClaimableBalance] = useState<{ [key in Tokens]: number }>({
    fud: 0,
    fomo: 0,
    alpha: 0,
    kek: 0,
  });

  const [lendingDetails, setLendingDetails] = useState<LendingInfo>({
    profitSplit: {
      owner: 0,
      borrower: 0,
      other: 0,
    },
    revenueTokens: {
      fud: false,
      fomo: false,
      alpha: false,
      kek: false,
    },
  });

  const getSecondsLeft = (end: Date) => {
    const now = new Date();
    return (end.getTime() - now.getTime()) / 1000;
  };

  const fetchAndSetBalances = async () => {
    setPending(true);
    const results = await getUserAlchemicaBalances(escrow, currentNetwork, globalProvider, dispatch);
    console.log('getUserAlchemicaBalances', results);
    if (results) {
      const alchemicaBalance = {
        fud: results[0] || 0,
        fomo: results[1] || 0,
        alpha: results[2] || 0,
        kek: results[3] || 0,
      };
      setPocketBalance(alchemicaBalance);
    }
    setPending(false);
  };

  const handleClaim = async () => {
    setPending(true);
    try {
      const gotchiLendingContract = getContract(currentNetwork, ethersSigner, 'gotchiLending', true);
      const tx = await gotchiLendingContract.claimGotchiLending(selectedPlayer.id);
      const res = await tx.wait();
      console.log('claimGotchiLendingTx', res);
      await fetchAndSetBalances();
      setPending(false);
    } catch (error) {
      console.log('claimGotchiLending', error);
      setPending(false);
    }
  };

  const enoughToClaim = () => {
    let total = 0;
    Object.values(pocketBalance).forEach((type) => (total = total + type));
    return total > 0;
  };

  const fetchAndSetLendingDetails = async () => {
    try {
      setPending(true);
      const gotchiLendingContract = getContract(currentNetwork, globalProvider, 'gotchiLending');
      const lendingInfo = await gotchiLendingContract.getGotchiLendingFromToken(selectedPlayer.id);
      if (lendingInfo) {
        // console.log('lendingInfo', lendingInfo);
        const endTime = new Date(lendingInfo.timeAgreed * 1000 + lendingInfo.period * 1000);
        setEndTime(endTime);
        setLendingDetails({
          profitSplit: {
            owner: Number(lendingInfo.revenueSplit[0] / 100),
            borrower: Number(lendingInfo.revenueSplit[1] / 100),
            other: Number(lendingInfo.revenueSplit[2] / 100),
          },
          revenueTokens: {
            fud: lendingInfo.revenueTokens.includes(TokenAddresses.fud),
            fomo: lendingInfo.revenueTokens.includes(TokenAddresses.fomo),
            alpha: lendingInfo.revenueTokens.includes(TokenAddresses.alpha),
            kek: lendingInfo.revenueTokens.includes(TokenAddresses.kek),
          },
        });
      }
      setPending(false);
    } catch (error) {
      setPending(false);
    }
  };

  const formatTime = (seconds?: number) => {
    if (seconds === undefined || seconds > 3600) return '';
    if (seconds < 0) return "TIME'S UP!";

    const secondsPerMinute = 60;
    const minutes = Math.floor((seconds % 3600) / secondsPerMinute);

    const remainingSeconds = Math.floor(seconds % secondsPerMinute);

    if (minutes) return `${minutes}m ${remainingSeconds}s`;
    if (remainingSeconds) return `${remainingSeconds}s`;
    return "TIME'S UP!";
  };

  useEffect(() => {
    void fetchAndSetLendingDetails();
  }, []);

  useEffect(() => {
    if (open) {
      void fetchAndSetBalances();
    }
  }, [open]);

  useEffect(() => {
    const claimable = {
      fud: pocketBalance.fud * lendingDetails.profitSplit.borrower,
      fomo: pocketBalance.fomo * lendingDetails.profitSplit.borrower,
      alpha: pocketBalance.alpha * lendingDetails.profitSplit.borrower,
      kek: pocketBalance.kek * lendingDetails.profitSplit.borrower,
    };
    // console.log('claimable', claimable);
    setClaimableBalance(claimable);
  }, [lendingDetails, pocketBalance]);

  useEffect(() => {
    if (endTime) {
      setSecondsLeft(getSecondsLeft(endTime));
      const countdown = setInterval(() => {
        setSecondsLeft(getSecondsLeft(endTime));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [endTime]);

  useEffect(() => {
    uiDispatch({
      type: 'UPDATE_INMENU',
      inMenu: open,
    });
    postFocusStatus(!open, uiDispatch); // If open, the focus on game is false, and vice versa
  }, [open]);

  useEffect(() => {
    if (secondsLeft === 3600) {
      showNotificationWithTimeout(dispatch, {
        type: 'info',
        title: '1 hour left to withdraw picked up alchemica at a vortex',
        message: '1 hour left',
        options: {
          sound: true,
        },
      });
    }
    if (secondsLeft === 1800) {
      showNotificationWithTimeout(dispatch, {
        type: 'info',
        title: '30 minutes left to withdraw picked up alchemica at a vortex',
        message: '30 minutes left',
        options: {
          sound: true,
        },
      });
    }
    if (secondsLeft === 600) {
      showNotificationWithTimeout(dispatch, {
        type: 'warning',
        title: '10 minutes left to withdraw picked up alchemica at a vortex',
        message: '10 minutes left!',
        options: {
          sound: true,
        },
      });
    }
    if (secondsLeft === 300) {
      showNotificationWithTimeout(dispatch, {
        type: 'warning',
        title: '5 minutes left to withdraw picked up alchemica at a vortex',
        message: '5 minutes left!',
        options: {
          sound: true,
        },
      });
    }
    if (secondsLeft === 60) {
      showNotificationWithTimeout(dispatch, {
        type: 'warning',
        title: '1 minute left to withdraw picked up alchemica at a vortex',
        message: '1 minute left!',
        options: {
          sound: true,
        },
      });
    }
    if (secondsLeft === 0) {
      showNotificationWithTimeout(dispatch, {
        type: 'warning',
        title: 'Your gotchi may be claimed back at any moment',
        message: 'Times up!',
        options: {
          sound: true,
        },
      });
    }
  }, [secondsLeft]);

  return (
    <>
      <div className="toggle-container">
        <PocketToggle onClick={() => setOpen(true)} />
        <p className={`time-left ${secondsLeft < 600 ? 'danger' : secondsLeft < 1800 ? 'warning' : ''}`}>{formatTime(secondsLeft)}</p>
      </div>
      <PocketModal open={open} onClose={() => setOpen(false)}>
        <div className="content-container">
          <div>
            <div className="section-header">
              <h2>Assets</h2>
            </div>
            <div className="assets">
              <PocketAssets balances={pocketBalance} revenueTokens={lendingDetails.revenueTokens} claimable={claimableBalance} />
            </div>
          </div>
          <div>
            <div className="section-header">
              <h2>Lending Details</h2>
            </div>
            <div className="lending-details">
              <LendingDetails secondsLeft={secondsLeft} profitSplit={lendingDetails.profitSplit} />
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button disabled={fetching || !enoughToClaim()} color="info" onClick={handleClaim}>
            {fetching ? 'Pending' : 'Claim'}
          </Button>
        </div>
      </PocketModal>
      <style jsx>{styles}</style>
    </>
  );
};
