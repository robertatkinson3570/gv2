import { Button, UpArrowIcon } from 'components/UI/elements';
import { useUser } from 'contexts/UserContext';
import { useUI } from 'contexts/UIContexts';
import { useWeb3 } from 'contexts/Web3Context';
import { useEffect, useState, useRef } from 'react';
import { getParcelMetadataByTokenIds, getParcelTypeById } from 'helpers/parcels.helper';
import { getContract } from 'web3/contract';
import styles from './styles';
import { calculateTimeFromBlocks } from 'helpers/functions';
import _ from 'lodash';
import { fetchOngoingUpgrades } from 'contexts/UserContext/actions';
import { showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useNotification } from 'contexts/NotificationContext';
import { postFocusStatus } from 'contexts/UIContexts/actions';
import Installations from 'components/phaser/Installations';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { UpgradeCard } from 'components/UI/component';

interface Props {
  currentBlock: number;
  expanded: boolean;
}

export const Upgrades = ({ currentBlock, expanded }: Props): JSX.Element => {
  const [{ globalProvider, currentAccount, ethersSigner, currentNetwork }] = useWeb3();
  const [{ ongoingUpgrades }, useDispatch] = useUser();
  const [readyUpgrades, setReadyUpgrades] = useState([]);
  const [pending, setPending] = useState(false);
  const [, notificationDispatch] = useNotification();
  const [{ socket }, uiDispatch] = useUI();
  const { back } = useAavegotchiSound();

  const scrollRef = useRef<HTMLDivElement>(null);

  const calculateProgress = (start: number, end: number, current: number) => {
    const max = end - start;
    const progress = current - start;
    const percentage = Math.floor((progress * 100) / max);
    if (percentage < 0) return '0%';
    if (percentage > 100) return '100%';

    return `${percentage}%`;
  };

  const handleClaimAll = async () => {
    setPending(true);
    const contract = await getContract(currentNetwork, ethersSigner, 'installationDiamond', true);

    let notificationId;
    if (notificationDispatch) {
      notificationId = showTransactionNotification(notificationDispatch, {
        message: 'Claim Upgrades',
        options: {
          sound: true,
        },
      });
    }

    try {
      const tx = await contract.finalizeUpgrades(readyUpgrades);
      await tx.wait();
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');

      void fetchOngoingUpgrades({ provider: globalProvider, network: currentNetwork, account: currentAccount }, useDispatch);
    } catch (error) {
      console.log(`@handleClaimAll ${error}`);
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error');
    }
    setPending(false);
  };

  const getBlocksRemaining = (end?: number, current?: number) => {
    if (current && end) {
      const difference = end - current;
      return difference < 0 ? 0 : difference;
    }
    if (end) return end;
    return 0;
  };

  const handleScroll = () => {
    scrollRef.current.scrollBy({ top: 164, behavior: 'smooth' });
  };

  const togglePlayMode = () => {
    void Installations.toggleBuildMode(false);
    back();
    uiDispatch({
      type: 'UPDATE_HUD',
      hud: 'PLAY',
    });
    uiDispatch({
      type: 'UPDATE_INMENU',
      inMenu: false,
    });
    postFocusStatus(true, uiDispatch);
  };

  useEffect(() => {
    if (ongoingUpgrades?.length) {
      setReadyUpgrades(ongoingUpgrades.filter(({ readyBlock }) => readyBlock <= currentBlock).map(({ index }) => Number(index)));
    }
  }, [ongoingUpgrades]);

  return (
    <>
      <div className="scroll-wrapper">
        <div className="scroll-container scrollable info" ref={scrollRef}>
          {ongoingUpgrades?.map((item, i) => {
            const parcelMetadata = getParcelMetadataByTokenIds([Number(item.parcelId)]);
            const progress = calculateProgress(item.startBlock, item.readyBlock, currentBlock);
            const { district, parcelHash, parcelId } = parcelMetadata[0];
            const typeId = getParcelTypeById(parcelId);
            const claimable = item.readyBlock < currentBlock;
            // const installationData = getInstallationIdDataById(typeId) as unknown as InstallationData;

            return (
              <div key={i} className="upgrade-card">
                <UpgradeCard installation={item} progress={progress} />
                <div className={`upgrade-details ${claimable ? 'claimable' : ''}`}>
                  {!calculateTimeFromBlocks(getBlocksRemaining(item.readyBlock, currentBlock)) && <span className="claim-back">Ready to claim!</span>}
                  <p className="district">District {district} </p>
                  <div>
                    <p className="parcel-name">{parcelHash}</p>
                    <p className="parcel-size">
                      <span className="capitalize">{typeId}</span>
                    </p>
                  </div>
                  {calculateTimeFromBlocks(getBlocksRemaining(item.readyBlock, currentBlock)) && (
                    <p className="time-left">
                      {calculateTimeFromBlocks(getBlocksRemaining(item.readyBlock, currentBlock))} to Lv.{item.level}{' '}
                      <UpArrowIcon width={20} height={18} />{' '}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="claim-container">
        <Button
          size={2.2}
          color="success"
          onClick={handleClaimAll}
          upgrade={true}
          disabled={pending || !ongoingUpgrades?.some((upgrade) => upgrade.readyBlock < currentBlock)}
        >
          Claim All
        </Button>
        <Button size={2.2} color="info" onClick={togglePlayMode} upgrade={true} disableSound>
          Exit Build Mode
        </Button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
