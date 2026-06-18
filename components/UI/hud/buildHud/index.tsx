import styles from './styles';
import { Button } from 'components/UI/elements';
import { useUI } from 'contexts/UIContexts';
import MapController from 'components/controllers/MapController';
import { useEffect, useState } from 'react';
import InputController from 'components/controllers/inputController';
import { NotificationStack, SideTray } from '../components';
import Installations from 'components/phaser/Installations';
import { UpgradeModal, UnequipModal } from '../components/modals';
import { useWeb3 } from 'contexts/Web3Context';
import type { providers } from 'ethers';
import { useUser } from 'contexts/UserContext';
import { fetchOngoingUpgrades } from 'contexts/UserContext/actions';
import { MaticNeeded } from 'components/UI/widgets';
import { postFocusStatus } from 'contexts/UIContexts/actions';
import { usePhaser } from 'contexts/PhaserContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { ToastNotification } from 'components/UI/component';
export const BuildHud = (): JSX.Element => {
  const [, uiDispatch] = useUI();
  const [{ globalProvider, currentAccount, currentNetwork }] = useWeb3();
  const [, userDispatch] = useUser();
  const [{ scene, toggleMinimap }] = usePhaser();
  const { back } = useAavegotchiSound();

  const [currentBlock, setCurrentBlock] = useState(0);
  const [parcel, setParcel] = useState(true);
  const [equips, setEequips] = useState(0);
  const [unequips, setUnequips] = useState(0);

  const initialMinimapState = toggleMinimap;

  const fetchAndSetCurrentBlock = async (provider: providers.Provider) => {
    const block = await provider.getBlockNumber();
    setCurrentBlock(block);
  };

  useEffect(() => {
    InputController.updateDisableKeyboard(true);
    MapController.toggleMinimap(false);

    // Resets input and map on dismount
    return () => {
      InputController.updateDisableKeyboard(false);
      MapController.toggleMinimap(initialMinimapState);
    };
  }, []);

  useEffect(() => {
    if (globalProvider && currentAccount && currentNetwork) {
      void fetchOngoingUpgrades(
        {
          provider: globalProvider,
          network: currentNetwork,
          account: currentAccount,
        },
        userDispatch,
      );
    }
  }, [globalProvider, currentAccount, currentNetwork]);

  // Fetch and sets current block

  useEffect(() => {
    if (globalProvider) {
      void fetchAndSetCurrentBlock(globalProvider);
      const interval = setInterval(() => {
        void fetchAndSetCurrentBlock(globalProvider);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [globalProvider]);

  useEffect(() => {
    uiDispatch({
      type: 'UPDATE_INMENU',
      inMenu: true,
    });
    postFocusStatus(false, uiDispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let data = await Installations.toggleBuildMode(true);
      if (data === undefined) {
        data = false;
      }
      setParcel(data as boolean);
    };
    void fetchData();
  }, []);

  useEffect(() => {
    let equipCnt = 0;
    let unequipCnt = 0;
    for (let i = 0; i < scene.batchQueue.length; i++) {
      if (scene.batchQueue[i].action === 'EQUIP') {
        equipCnt++;
      } else {
        unequipCnt++;
      }
    }
    setEequips(equipCnt);
    setUnequips(unequipCnt);
  }, [scene.batchQueue.length]);

  const blockPropagation = (e) => e.stopPropagation();

  return (
    <>
      <MaticNeeded />
      <UpgradeModal />
      <UnequipModal />
      <NotificationStack />
      {/* <OngoingUpgradesModal open={currentUpgradeModalOpen} onClose={() => setCurrentUpgradesModalOpen(false)} currentBlock={currentBlock} /> */}
      <div className="build-border"></div>
      {/* {ongoingUpgrades && ongoingUpgrades.length > 0 && (
        <div className="pending-toggle">
          <PendingButton
            title="Upgrading now"
            message={`${ongoingUpgrades.length} installations`}
            onClick={() => setCurrentUpgradesModalOpen(true)}
          />
        </div>
      )} */}
      <div className="right-container" onClick={blockPropagation} onMouseDown={blockPropagation}>
        <SideTray currentBlock={currentBlock} isParcel={parcel} />
      </div>
      <div className="warning-container">
        {!parcel ? <ToastNotification type="build" title="of your owned parcel" message="You can't build outside" /> : null}
      </div>
      <div className="build-toggle">
        <div className="batch-msg">
          {equips !== 0 && (
            <>
              <span style={{ color: '#00ff00' }}>Equip</span> {equips}{' '}
            </>
          )}
          {equips !== 0 && unequips !== 0 && <>, </>}
          {unequips !== 0 && (
            <>
              <span style={{ color: '#E97672' }}>Unequip</span> {unequips}
            </>
          )}
        </div>
        <Button color="success" buildMode={true} disabled={!scene.batchQueue.length} onClick={() => Installations.handleBatchEquip()}>
          Confirm
        </Button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
