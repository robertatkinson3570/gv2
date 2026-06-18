import { RateIcon } from 'assets';
import { Button, ParamStatus } from 'components/UI/elements';
import { useUI } from 'contexts/UIContexts';
import { useWeb3 } from 'contexts/Web3Context';
import { useEffect, useState } from 'react';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { InstallationData, InstallationTypeLocal, Tokens } from 'types';
import installationTypes from 'shared_code/data/installations.json';
import styles from './styles';
import { getClaimableAlchemica, getTotalClaimed } from 'helpers/parcels.helper';
import { AlchemicaValue, InstallationCard, Modal } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

export const HarvesterModal = (): JSX.Element => {
  const [{ harvesterState }, uiDispatch] = useUI();
  const [{ ethersSigner, currentNetwork }] = useWeb3();
  const [{ gameConfig }] = useGame();

  const [installationTypeData, setInstallationTypeData] = useState<InstallationTypeLocal>();
  const [type, setType] = useState<Tokens>();

  const [collected, setCollected] = useState<number>();
  const [totalClaimed, setTotalClaimed] = useState<number>();

  const alchemicas: Tokens[] = ['fud', 'fomo', 'alpha', 'kek'];

  useEffect(() => {
    if (harvesterState.open && harvesterState.installationId) void getSetInstallationData(harvesterState.installationId);
  }, [harvesterState]);

  const handleClose = () => {
    uiDispatch({
      type: 'UPDATE_HARVESTER_STATE',
      harvesterState: {
        open: false,
        installationId: undefined,
        aaltarId: undefined,
      },
    });
  };

  const handleOpenDashboard = () => {
    console.log('harvesterState', harvesterState);
    handleClose();
    uiDispatch({
      type: 'UPDATE_PARCEL_DASHBOARD',
      parcelDashboardState: { open: true, altarId: harvesterState.aaltarId },
    });
  };

  const getSetInstallationData = async (id) => {
    const installationData = getInstallationIdDataById(id) as unknown as InstallationData;
    console.log('@getSetInstallationData:installationData', installationData);

    // installationData is destructured from installationId(aaltarId). Look for the InstallationData to see all data
    if (installationData?.itemId) {
      // get InstallationTyle from local stored json file.
      const type = installationTypes[installationData.itemId] as InstallationTypeLocal;
      console.log('@getSetInstallationData:type', type);
      if (type) {
        setInstallationTypeData(type);
        setType(alchemicas[type.alchemicaType]);
        await getAndSetAlchemicaData(installationData.realmId, type.alchemicaType);
      }
    }
  };

  const getAndSetAlchemicaData = async (realmId: number, alchemicaType: number) => {
    const claimable = await getClaimableAlchemica(ethersSigner, currentNetwork, realmId);
    if (claimable) setCollected(claimable[alchemicaType]);

    const totalClaimed = await getTotalClaimed(ethersSigner, currentNetwork, realmId);
    if (totalClaimed) setTotalClaimed(totalClaimed[alchemicaType]);
  };

  return (
    <>
      {installationTypeData && (
        <Modal
          title={`${type ? type.toUpperCase() : ''} HARVESTER`}
          open={harvesterState.installationId && harvesterState.open}
          onClose={handleClose}
          color={gameConfig.gotchiverseTheme}
        >
          <div className="inner">
            <div className="main">
              <div className="param-container col">
                <ParamStatus
                  label="Harvest rate/daily"
                  icon={RateIcon}
                  value={`${installationTypeData.harvestRate || 0} ${type?.toUpperCase() || ''}`}
                />
              </div>
              <div className="harvest-info col">
                <AlchemicaValue type={type} label={'HARVESTED NOW:'} value={collected} />
                <AlchemicaValue type={type} label={'HARVESTED TOTAL:'} value={totalClaimed} />
              </div>
              <div className="card-container col">
                <InstallationCard
                  color={gameConfig.gotchiverseTheme}
                  level={installationTypeData.level}
                  typeId={installationTypeData.itemId}
                  size={0.8}
                  pinLabel
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <Button onClick={handleOpenDashboard} fullWidth color={gameConfig.gotchiverseTheme}>
              Go to Dashboard
            </Button>
          </div>
        </Modal>
      )}
      <style jsx>{styles}</style>
    </>
  );
};
