import { Button, InstallationDisplayImg } from 'components/UI/elements';
import { useUser } from 'contexts/UserContext';
import { useWeb3 } from 'contexts/Web3Context';
import { useEffect, useState } from 'react';
import { getParcelMetadataByTokenIds } from 'helpers/parcels.helper';
import { getContract } from 'web3/contract';
import styles from './styles';
import { calculateTimeFromBlocks } from 'helpers/functions';
import _ from 'lodash';
import { fetchOngoingUpgrades } from 'contexts/UserContext/actions';
import { showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useNotification } from 'contexts/NotificationContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { getErrMessage } from 'helpers/ethers.helper';
import { FullscreenModal } from 'components/UI/component';

interface Props {
  open: boolean;
  onClose: () => void;
  currentBlock: number;
}

export const OngoingUpgradesModal = ({ open, onClose, currentBlock }: Props): JSX.Element => {
  const [{ globalProvider, currentAccount, ethersSigner, currentNetwork }] = useWeb3();
  const [{ ongoingUpgrades }, useDispatch] = useUser();
  const [readyUpgrades, setReadyUpgrades] = useState([]);
  const [pending, setPending] = useState(false);
  const [, notificationDispatch] = useNotification();
  const { send } = useAavegotchiSound();

  const calculateProgress = (start: number, end: number, current: number) => {
    const max = end - start;
    const progress = current - start;
    const percentage = Math.floor((progress * 100) / max);
    if (percentage < 0) return '0%';
    if (percentage > 100) return '100%';

    return `${percentage}%`;
  };

  useEffect(() => {
    if (ongoingUpgrades?.length) {
      setReadyUpgrades(ongoingUpgrades.filter(({ readyBlock }) => readyBlock <= currentBlock).map(({ index }) => Number(index)));
    }
    // console.log(readyUpgrades, 'readyUpgrades');
  }, [ongoingUpgrades]);

  // const claimableUpgrades = (upgrades: OngoingUpgrades[], currentBlock: number): OngoingUpgrades[] => {
  //   const isReady = upgrades.filter((upgrade) => upgrade.readyBlock <= currentBlock);
  //   return isReady;
  // };

  const handleClaimAll = async () => {
    setPending(true);
    const contract = await getContract(currentNetwork, ethersSigner, 'installationDiamond', true);

    let notificationId, tx;
    try {
      notificationId = showTransactionNotification(notificationDispatch, {
        message: 'Claim Upgrades',
        options: {
          sound: true,
        },
      });

      tx = await contract.finalizeUpgrades(readyUpgrades.slice(0, 50));
      send();
      await tx.wait();
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');

      void fetchOngoingUpgrades({ provider: globalProvider, network: currentNetwork, account: currentAccount }, useDispatch);
    } catch (e) {
      console.log(`@handleClaimAll ${e}`);
      notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
    }
    setPending(false);
  };

  return (
    <FullscreenModal title="Upgrades in progress" open={open} onClose={onClose}>
      <div className="content">
        <div className="scrollable">
          <div className="upgrade-grid">
            {ongoingUpgrades?.map((item, i) => {
              const parcelMetadata = getParcelMetadataByTokenIds([Number(item.parcelId)]);
              const progress = calculateProgress(item.startBlock, item.readyBlock, currentBlock);
              const { district, parcelHash } = parcelMetadata[0];

              return (
                <div key={i} className="upgrade-card">
                  <div className="img-container">
                    <InstallationDisplayImg type="INSTALLATION" itemId={item.installationId} />
                  </div>
                  <div className="upgrade-details">
                    <div className="details">
                      <p>{parcelHash}</p>
                      <p>District {district}</p>
                    </div>
                    <p className="name">{item.name}</p>
                    <div className="prog-bar">
                      <div className="prog" style={{ width: progress }} />
                    </div>
                    <div className="time-left">
                      <p>{calculateTimeFromBlocks(item.readyBlock - currentBlock) || 'Ready'}</p>
                      <p className="progress-percent">{progress}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="claim-container">
          <Button disabled={!readyUpgrades.length || pending} onClick={async () => await handleClaimAll()} color="info">
            {pending ? 'Pending' : ' Claim All'}
          </Button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </FullscreenModal>
  );
};
