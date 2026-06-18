import { Button } from 'components/UI/elements';
import { useNotification } from 'contexts/NotificationContext';
import { useUI } from 'contexts/UIContexts';
import { useWeb3 } from 'contexts/Web3Context';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useEffect, useState } from 'react';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { InstallationData, InstallationTypeLocal } from 'types';
import installationTypes from 'shared_code/data/installations.json';
import styles from './styles';
import { useUser } from 'contexts/UserContext';
import { providers } from 'ethers';
import { fetchOngoingUpgrades } from 'contexts/UserContext/actions';
import _ from 'lodash';
import { showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { getContract } from 'web3/contract';
import { getErrMessage } from 'helpers/ethers.helper';
import { getThemeColor } from 'helpers/functions';
import { InstallationCard, Modal, UpgradeStatus } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

export const MaakerModal = (): JSX.Element => {
  const [{ maakerModal }, uiDispatch] = useUI();
  const [{ ethersSigner, currentAccount, currentNetwork, globalProvider }] = useWeb3();
  const [, notificationDispatch] = useNotification();
  const [{ ongoingUpgrades }, useDispatch] = useUser();
  const [{ gameConfig }] = useGame();
  const [readyUpgrades, setReadyUpgrades] = useState([]);
  const [upgrades, setUpgrades] = useState([]);
  const [pending, setPending] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);

  const [installationId, setInstallationId] = useState<number>();
  const [installationLevel, setInstallationLevel] = useState<number>();

  const { oops, send } = useAavegotchiSound();

  const [realmId, setRealmId] = useState<number>();

  useEffect(() => {
    if (maakerModal.open && maakerModal.installationId) getSetInstallationData(maakerModal.installationId);
  }, [maakerModal]);

  const handleClose = () => {
    uiDispatch({
      type: 'UPDATE_MAAKER_MODAL',
      maakerModal: {
        open: false,
        installationId: undefined,
      },
    });
  };

  const calculateProgress = (start: number, end: number, current: number) => {
    const max = end - start;
    const progress = current - start;
    const percentage = Math.floor((progress * 100) / max);
    if (percentage < 0) return 0;
    if (percentage > 100) return 100;

    return percentage;
  };

  useEffect(() => {
    let upgrades;
    if (ongoingUpgrades?.length && installationLevel && realmId) {
      upgrades = ongoingUpgrades.filter((upgrade) => Number(upgrade.parcelId) === Number(realmId));
      const availableSlots = upgrades.slice(0, installationLevel + 1);

      setReadyUpgrades(availableSlots.filter(({ readyBlock }) => readyBlock <= currentBlock).map(({ index }) => Number(index)));
      upgrades = availableSlots.map((upgrade) => {
        return {
          installationId: upgrade.installationId,
          level: upgrade.level,
          name: upgrade.name,
          owner: upgrade.owner,
          realmId: Number(upgrade.parcelId),
          readyBlock: upgrade.readyBlock,
          startBlock: upgrade.startBlock,
          status: upgrade.readyBlock <= currentBlock ? 'complete' : 'progress',
          progress: calculateProgress(upgrade.startBlock, upgrade.readyBlock, currentBlock),
        };
      });
    }
    if (!upgrades?.length) upgrades = [];

    if (upgrades.length < installationLevel + 1) {
      const emptyUpgrades = installationLevel + 1 - upgrades.length;
      console.log('emptyUpgrades', emptyUpgrades);
      for (let i = 0; i < emptyUpgrades; i++) {
        upgrades.push({ status: 'inactive' });
      }
    }
    setUpgrades(upgrades);
    // console.log('upgrades ', upgrades);
  }, [ongoingUpgrades, installationLevel, realmId]);

  const fetchAndSetCurrentBlock = async (provider: providers.Provider) => {
    const block = await provider.getBlockNumber();
    setCurrentBlock(block);
  };

  const getSetInstallationData = (id) => {
    const installationData = getInstallationIdDataById(id) as unknown as InstallationData;
    // console.log('@getSetInstallationData:installationData', installationData);

    // installationData is destructured from installationId(aaltarId). Look for the InstallationData to see all data
    if (installationData?.itemId) {
      setInstallationId(installationData.itemId);

      // get InstallationTyle from local stored json file.
      const type = installationTypes[installationData.itemId] as InstallationTypeLocal;
      // console.log('@getSetInstallationData:type', type);
      if (type) {
        setInstallationLevel(type.level);
      }
    }
    // set realmId (tokenId of the parcel from the contract) & fetch all data needed
    if (installationData.realmId) {
      setRealmId(installationData.realmId);
      void fetchAndSetCurrentBlock(globalProvider);
      void fetchOngoingUpgrades({ provider: globalProvider, network: currentNetwork, account: currentAccount }, useDispatch);
    }
  };

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
      tx = await contract.finalizeUpgrades(readyUpgrades);
      send();
      await tx.wait();
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');

      void fetchOngoingUpgrades({ provider: globalProvider, network: currentNetwork, account: currentAccount }, useDispatch);
    } catch (e) {
      console.log(`@handleClaimAll ${e}`);
      oops();
      notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
    }
    setPending(false);
  };

  return (
    <>
      <Modal title="MAAKER" open={realmId && maakerModal.open} color={gameConfig.gotchiverseTheme} onClose={handleClose}>
        <div className={`inner ${gameConfig.gotchiverseTheme}`}>
          <div className="content">
            <div className="upgrade-status">
              <div className="status-text">UPGRADING NOW</div>
              <div className="status-list">
                {!!upgrades?.length &&
                  upgrades.map((upgrade, index) => {
                    return <UpgradeStatus key={index} id={index + 1} label={upgrade.name} status={upgrade.status} progress={upgrade.progress} />;
                  })}
              </div>
            </div>
            <div className="card-container">
              <InstallationCard color={getThemeColor('info', 400)} level={installationLevel} typeId={installationId} pinLabel scale={1.5} />
              <div className="upgrade-info-container">
                <div className="upgrade-info">
                  <div className="label">Simultaneous Craft/Upgrade</div>
                  <div className="counter">{installationLevel + 1}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <Button disabled={!readyUpgrades?.length} onClick={handleClaimAll} fullWidth size={3.2} color={gameConfig.gotchiverseTheme}>
              {pending ? 'Claiming...' : 'Claim All'}
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx>{styles}</style>
    </>
  );
};
