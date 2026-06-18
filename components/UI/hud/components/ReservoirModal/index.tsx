import { useEffect, useState } from 'react';
import { RadiusIcon, RateIcon } from 'assets';
import { Button, ParamStatus } from 'components/UI/elements';
import { useUI } from 'contexts/UIContexts';
import { useWeb3 } from 'contexts/Web3Context';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import installationTypes from 'shared_code/data/installations.json';
import { InstallationData, InstallationTypeLocal, Tokens } from 'types';
import styles from './styles';
import { getCapacities, getClaimableAlchemica, getTotalClaimed } from 'helpers/parcels.helper';
import { AlchemicaValue, InstallationCard, Modal } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

export const ReservoirModal = (): JSX.Element => {
  const [{ reservoirState }, uiDispatch] = useUI();
  const [{ ethersSigner, currentNetwork, globalProvider }] = useWeb3();
  const [{ gameConfig }] = useGame();
  const [realmId, setRealmId] = useState<number>();
  const [installationTypeData, setInstallationTypeData] = useState<InstallationTypeLocal>();

  const [collected, setCollected] = useState<number>();
  const [totalClaimed, setTotalClaimed] = useState<number>();
  const [capacity, setCapacity] = useState<number>();
  const [percentage, setPercentage] = useState<number>();

  const [type, setType] = useState<Tokens>();

  const alchemicas: Tokens[] = ['fud', 'fomo', 'alpha', 'kek'];

  useEffect(() => {
    if (reservoirState.open && reservoirState.installationId) void getSetInstallationData(reservoirState.installationId);
  }, [reservoirState]);

  const handleClose = () => {
    uiDispatch({
      type: 'UPDATE_RESERVOIR_STATE',
      reservoirState: {
        open: false,
        installationId: undefined,
        aaltarId: undefined,
      },
    });
  };

  const handleOpenDashboard = () => {
    handleClose();
    uiDispatch({
      type: 'UPDATE_PARCEL_DASHBOARD',
      parcelDashboardState: { open: true, altarId: reservoirState.aaltarId },
    });
  };

  const getSetInstallationData = async (id) => {
    const installationData = getInstallationIdDataById(id) as unknown as InstallationData;
    console.log('@getSetInstallationData:installationData', installationData);

    // installationData is destructured from installationId(aaltarId). Look for the InstallationData to see all data
    if (installationData?.itemId) {
      // get InstallationTyle from local stored json file.
      const type = installationTypes[installationData.itemId] as InstallationTypeLocal;
      // console.log('@getSetInstallationData:type', type);
      if (type) {
        setInstallationTypeData(type);
        setType(alchemicas[type.alchemicaType]);
        await getAndSetAlchemicaData(installationData.realmId, type.alchemicaType);
      }
    }

    // set realmId (tokenId of the parcel from the contract) & fetch all data needed
    if (installationData.realmId) {
      setRealmId(installationData.realmId);
    }
  };

  const getAndSetAlchemicaData = async (realmId: number, alchemicaType: number) => {
    const claimable = await getClaimableAlchemica(ethersSigner, currentNetwork, realmId);
    if (claimable) setCollected(claimable[alchemicaType]);

    const totalClaimed = await getTotalClaimed(ethersSigner, currentNetwork, realmId);
    if (totalClaimed) setTotalClaimed(totalClaimed[alchemicaType]);

    const capacities = await getCapacities(ethersSigner, currentNetwork, realmId);
    if (capacities) setCapacity(capacities[alchemicaType]);

    if (claimable && capacities?.[alchemicaType]) {
      const percentage = Number(((claimable[alchemicaType] * 100) / capacities[alchemicaType]).toFixed(0));
      setPercentage(percentage);
    }
  };

  return (
    <>
      {installationTypeData && (
        <Modal
          title={`${alchemicas[installationTypeData.alchemicaType].toUpperCase()} RESERVOIR`}
          color={gameConfig.gotchiverseTheme}
          open={reservoirState.installationId && reservoirState.open}
          onClose={handleClose}
        >
          <div className="inner">
            <div className="main">
              <div className="params-status col">
                <ParamStatus label="Capacity" icon={RadiusIcon} value={`${capacity} ${type}`} />
                <ParamStatus label="Spill Radius" icon={RadiusIcon} value={`${installationTypeData.spillRadius} G`} />
                <ParamStatus label="Spill Rate" icon={RateIcon} value={`${installationTypeData.spillRate / 100}%`} />
              </div>
              <div className="collected-info col">
                <AlchemicaValue label="COLLECTED NOW:" type={type} value={collected} />
                <AlchemicaValue label="COLLECTED TOTAL:" type={type} value={totalClaimed} />
              </div>
              <div className="card-container col">
                <div className="card">
                  <InstallationCard
                    color={gameConfig.gotchiverseTheme}
                    level={installationTypeData.level}
                    typeId={installationTypeData.itemId}
                    size={0.9}
                    pinLabel
                    progressPos="bottom"
                    percentage={percentage}
                    progress={`${type} ${percentage}%`}
                  />
                </div>
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
