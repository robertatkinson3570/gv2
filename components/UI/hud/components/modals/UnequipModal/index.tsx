/* eslint-disable @typescript-eslint/indent */
import { Button, InstallationDisplayImg, XIcon } from 'components/UI/elements';
import styles from './styles';
import { useUI } from 'contexts/UIContexts';
import { useEffect, useMemo, useState } from 'react';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { useWeb3 } from 'contexts/Web3Context';
import Image from 'next/image';
// import { XIcon } from 'assets';
import { useUser } from 'contexts/UserContext';
import Installations from 'components/phaser/Installations';
import { getOnChainAlchemicaIcon, nFormatter, getThemeColor } from 'helpers/functions';
import { getUnequipReturnedAlchemica } from 'helpers/parcels.helper';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import installationTypes from 'shared_code/data/installations.json';
import tileTypes from 'shared_code/data/tiles.json';
import { Modal } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

interface Installation {
  name: string;
  level: number;
  id: number;
  installationType: number;
  type: 'INSTALLATION' | 'TILE';
}

export const UnequipModal = (): JSX.Element => {
  const [{ unequipModal }, uiDispatch] = useUI();
  const [{ currentNetwork, globalProvider }] = useWeb3();
  const [{ ongoingUpgrades }] = useUser();
  const [{ gameConfig }] = useGame();

  const { click } = useAavegotchiSound();

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedInstallation, setSelectedInstallation] = useState<Installation>();

  const handleClose = () => {
    uiDispatch({
      type: 'UPDATE_UNEQUIP_MODAL',
      unequipModal: {
        open: false,
        installationId: undefined,
      },
    });
  };

  const getTypeData = async (id: number, type: 'INSTALLATION' | 'TILE') => {
    const typeData = type === 'INSTALLATION' ? installationTypes[id] : tileTypes[id];
    setSelectedInstallation({
      id,
      type,
      name: typeData.name,
      level: typeData.level,
      installationType: type === 'INSTALLATION' ? installationTypes[id].installationType : undefined,
    });
  };

  const handleUnequip = async () => {
    if (!inProgress) {
      setLoading(true);

      const installationData = getInstallationIdDataById(unequipModal.installationId);
      // console.log('handleUnequip', installationData);
      const unequiInput = {
        itemId: installationData.itemId,
        relativePosition: installationData.position,
        type: installationData.type as 'INSTALLATION' | 'TILE',
        realmId: Number(installationData.realmId),
      };
      // this call will also handle notifications.
      Installations.handleEquipUnequipMove(unequiInput, 'unequip');
      handleClose();
      setLoading(false);
    }
  };

  const handleUnequipQueue = async () => {
    if (!inProgress) {
      setLoading(true);
      Installations.updatePlaceQueue(unequipModal.installationId, 'UNEQUIP');
      handleClose();
      setLoading(false);
    }
  };

  const getInstallationDetails = (installationId: string) => {
    const { itemId, position, realmId } = getInstallationIdDataById(installationId);
    return {
      realmId: Number(realmId),
      coordinateX: position.x,
      coordinateY: position.y,
      installationId: itemId,
    };
  };

  const viewUpgrade = (id: string) => {
    click();
    uiDispatch({
      type: 'UPDATE_UPGRADE_MODAL',
      upgradeModal: {
        open: true,
        installationId: id,
      },
    });
    handleClose();
  };

  const alchemicaReturned = useMemo(() => getUnequipReturnedAlchemica(selectedInstallation?.id.toString()), [selectedInstallation?.id]);

  const inProgress = useMemo(() => {
    if (unequipModal?.installationId && ongoingUpgrades?.length) {
      const { realmId, coordinateX, coordinateY, installationId } = getInstallationDetails(unequipModal?.installationId);
      return ongoingUpgrades.some(
        (upgrade) =>
          Number(upgrade.parcelId) === Number(realmId) &&
          upgrade.installationId === installationId &&
          upgrade.coordinateX === coordinateX &&
          upgrade.coordinateY === coordinateY,
      );
    }
    return false;
  }, [ongoingUpgrades, unequipModal?.installationId]);

  useEffect(() => {
    if (currentNetwork && globalProvider && unequipModal.installationId) {
      const { itemId, type } = getInstallationIdDataById(unequipModal.installationId);
      void getTypeData(itemId, type as 'INSTALLATION' | 'TILE');
    }
  }, [currentNetwork, globalProvider, unequipModal.installationId]);

  return (
    <>
      {selectedInstallation && (
        <Modal open={unequipModal.open} onClose={handleClose} title={`Unequip ${selectedInstallation.type}`} color={gameConfig.gotchiverseTheme}>
          <div className={`inner ${gameConfig.gotchiverseTheme}`}>
            <div className="left-col">
              <div className="installation-img">
                <InstallationDisplayImg type={selectedInstallation.type} itemId={selectedInstallation.id} />
                <div className="img-overlay">
                  <XIcon size={70} fill={getThemeColor('', 300)} />
                </div>
              </div>
              <p className="installation-name"> Level {selectedInstallation?.level || selectedInstallation.name}</p>
            </div>
            <div className="right-col">
              {inProgress && (
                <div>
                  <p>{selectedInstallation?.name || ''} is currently upgrading</p>
                  <p className="warning">You can{"'"}t unequip an upgrading installation.</p>
                  <a className="upgrade-link" onClick={() => viewUpgrade(unequipModal.installationId)}>
                    View Upgrade {'>'}
                  </a>
                </div>
              )}
              {!inProgress && (
                <div>
                  <p>Unequip {selectedInstallation?.name || ''}?</p>
                  {selectedInstallation.installationType !== 7 &&
                    selectedInstallation.installationType !== 5 &&
                    selectedInstallation.type === 'INSTALLATION' && <p className="warning">It will be permanently burned!</p>}
                  <div className="returns-container">
                    {(selectedInstallation.installationType === 7 ||
                      selectedInstallation.installationType === 5 ||
                      selectedInstallation.type === 'TILE') && (
                      <p className="warning">The {selectedInstallation.type.toLocaleLowerCase()} will return to your Inventory.</p>
                    )}
                    {selectedInstallation.installationType !== 7 &&
                      selectedInstallation.installationType !== 5 &&
                      selectedInstallation.type === 'INSTALLATION' && (
                        <>
                          <p>You will receive back:</p>
                          <div className="alchemica-back">
                            {alchemicaReturned.map((value, i) => (
                              <div key={i} className="alchemica">
                                <Image alt="" src={getOnChainAlchemicaIcon(i)} width={40} height={40} />
                                <p>{nFormatter(value, 2)}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                  </div>
                </div>
              )}
              <div className="flex-row">
                <div className="button-container">
                  <Button disabled={loading || inProgress} onClick={async () => await handleUnequipQueue()} color={gameConfig.gotchiverseTheme}>
                    Unequip
                  </Button>
                </div>
                <div className="button-container">
                  <Button secondary onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <style jsx>{styles}</style>
    </>
  );
};
