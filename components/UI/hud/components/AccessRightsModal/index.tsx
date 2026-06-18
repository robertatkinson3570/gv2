import { BucketIcon, Button, ChannelIcon, EquipInstallationIcon, EquipTileIcon, UpArrowIcon } from 'components/UI/elements';
import { useNotification } from 'contexts/NotificationContext';
import { useUI } from 'contexts/UIContexts';
import { useWeb3 } from 'contexts/Web3Context';

import { useEffect, useState } from 'react';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { InstallationData, ParcelAccessRights, ParcelAccessTypes, ParcelAccessValues } from 'types';
import styles from './styles';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { UnlockIcon } from 'assets';
import Image from 'next/image';
import { getContract } from 'web3/contract';
import { getParcelAccessRights, getParcelsAccessRightsWhitelistIds } from 'helpers/parcels.helper';
import { showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { getErrMessage } from 'helpers/ethers.helper';
import InputController from 'components/controllers/inputController';
import { Modal } from 'components/UI/component';

export const AccessRightsModal = (): JSX.Element => {
  const [{ accessRightsState }, uiDispatch] = useUI();
  const [{ ethersSigner, currentNetwork, globalProvider }] = useWeb3();
  const [, notificationDispatch] = useNotification();
  const { click, send } = useAavegotchiSound();

  const defaultAccessRights: ParcelAccessRights = {
    channel: 0,
    emptyReservoir: 0,
    equipInstallations: 0,
    equipTiles: 0,
    updateInstallations: 0,
  };

  const defaultWhitelistIds: ParcelAccessRights = {
    channel: 0,
    emptyReservoir: 0,
    equipInstallations: 0,
    equipTiles: 0,
    updateInstallations: 0,
  };

  const iconFill = 'var(--col-pink-200)';
  const iconSize = 26;
  const accessList = [
    {
      name: 'Channeling',
      value: 'channel',
      icon: <ChannelIcon fill={iconFill} size={iconSize} />,
    },
    {
      name: 'Emptying Reservoir',
      value: 'emptyReservoir',
      type: 1,
      icon: <BucketIcon fill={iconFill} size={30} />,
    },
    {
      name: 'Equipping Installations',
      value: 'equipInstallations',
      icon: <EquipInstallationIcon fill={iconFill} width={iconSize} height={iconSize} />,
    },
    {
      name: 'Equipping Tiles',
      value: 'equipTiles',
      icon: <EquipTileIcon fill={iconFill} width={iconSize} height={iconSize} />,
    },
    {
      name: 'Upgrading Installations',
      value: 'updateInstallations',
      icon: <UpArrowIcon fill={iconFill} width={iconSize} height={iconSize} wide />,
    },
  ];
  const roles = [
    { name: 'Only\nowner', value: ParcelAccessValues.OnlyMe },
    { name: 'Owner &\nBorrowed Gotchis', value: ParcelAccessValues.MeAndBorrowedGotchis },
    { name: 'Anyone', value: ParcelAccessValues.Anyone },
    { name: 'Whitelist\nOnly', value: ParcelAccessValues.Whitelist },
  ];

  const [realmId, setRealmId] = useState<number>();
  const [accessRights, setAccessRights] = useState<ParcelAccessRights>(defaultAccessRights);
  const [whitelistIds, setWhitelistIds] = useState<ParcelAccessRights>(defaultWhitelistIds);

  useEffect(() => {
    InputController.updateDisableKeyboard(accessRightsState.open);
    if (accessRightsState?.open && accessRightsState.altarId) void getSetInstallationData(accessRightsState.altarId);
  }, [accessRightsState]);

  // useEffect(() => {
  //   console.log('whitelistIds', whitelistIds.channel);
  // }, [whitelistIds]);

  const handleClose = () => {
    uiDispatch({
      type: 'UPDATE_ACCESS_RIGHTS_STATE',
      accessRightsState: {
        open: false,
        altarId: undefined,
      },
    });
  };

  const getSetInstallationData = async (id: string): Promise<void> => {
    const installationData = getInstallationIdDataById(id) as unknown as InstallationData;
    // console.log('@getSetInstallationData:installationData', installationData);

    // set realmId (tokenId of the parcel from the contract) & fetch all data needed
    const realmId: number = installationData.realmId;
    if (realmId) {
      setRealmId(realmId);
      await getAndSetAccessRights(realmId);
    }
  };

  const getAndSetAccessRights = async (realmId: number): Promise<void> => {
    // fetch new Access rights from the contract.
    const accessRights = await getParcelAccessRights([realmId.toString()], currentNetwork, globalProvider);
    const whitelist = (await getParcelsAccessRightsWhitelistIds([realmId.toString()], currentNetwork, globalProvider)) as ParcelAccessRights[];
    setAccessRights(accessRights[0] || defaultAccessRights);
    setWhitelistIds(whitelist[0] || defaultAccessRights);
  };

  const onToggleAccessRights = () => {
    click();
    uiDispatch({
      type: 'UPDATE_PARCEL_DASHBOARD',
      parcelDashboardState: accessRightsState,
    });
    setTimeout(() => {
      handleClose();
    }, 1);
  };

  const onUpdateAccessRights = async () => {
    let notificationId, tx;

    const contract = await getContract(currentNetwork, ethersSigner, 'realmDiamond', true);
    const parcels: number[] = Object.keys(accessRights).map(() => realmId);
    const rights: number[] = Object.keys(accessRights).map((key) => ParcelAccessTypes[key] as number);
    const actions: number[] = Object.keys(accessRights).map((key) => accessRights[key]);
    const ids: number[] = Object.keys(accessRights).map((key) => whitelistIds[key]);

    try {
      notificationId = showTransactionNotification(notificationDispatch, {
        message: 'update parcel access rights',
        options: {
          sound: true,
        },
      });
      tx = await contract.setParcelsAccessRightWithWhitelists(parcels, rights, actions, ids);
      send();
      await tx.wait();

      console.log('@onUpdateAccessRights:tx', tx);
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
      handleClose();
    } catch (e) {
      notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
    }
  };

  const updateRights = (action: string, value: number) => {
    click();
    setAccessRights({ ...accessRights, [action]: value });
  };

  const updateIds = (action: string, value: number) => {
    if (value < 0) value = 0;
    setWhitelistIds({ ...whitelistIds, [action]: value });
  };

  return (
    <>
      <Modal title="parcel access rights" open={realmId && accessRightsState.open} onClose={handleClose}>
        <div className="access-rights-container">
          <div className="toggle-access-rights" onClick={onToggleAccessRights}>
            <div className="access-rights-button">
              <Image alt="" src={UnlockIcon} layout="fill" />
            </div>
            <div className="access-rights-label">ACCESS RIGHTS</div>
          </div>
          <div className="access-rights-setting-container">
            <div className="roles-list">
              {roles.map(({ name }, i) => (
                <div className="role" key={i}>
                  {name.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              ))}
              <div className="header-whitelist-id">Whitelist ID</div>
            </div>
            <div className="settings-list">
              {accessList.map(({ name, value: action, icon }, index) => (
                <li className="row" key={index}>
                  <div className="access-item">
                    <div className="icon-container">{icon}</div>
                    <div className="item-text">{name}</div>
                  </div>
                  <div className="role-ticks">
                    {roles.map(({ value }, index) => (
                      <div className="option-container" key={index}>
                        <div className="option" onClick={() => updateRights(action, value)}>
                          {accessRights[action] === value && <div className="inner"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <input
                    type="number"
                    disabled={accessRights[action] !== ParcelAccessValues.Whitelist}
                    className="whitelist-input"
                    min={0}
                    step={1}
                    value={Number(whitelistIds[action]).toString()}
                    onChange={(e) => updateIds(action, Number(e.currentTarget.value))}
                  />
                </li>
              ))}
            </div>
          </div>
          <div className="button-group">
            <Button size={3.5} secondary onClick={handleClose}>
              Cancel
            </Button>
            <Button disableSound size={3.5} onClick={onUpdateAccessRights}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx>{styles}</style>
    </>
  );
};
