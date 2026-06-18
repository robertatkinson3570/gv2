/* eslint-disable multiline-ternary */
import { useDropzone } from 'react-dropzone';
import { EditIconPink, GalleryIcon, GltrIcon } from 'assets';
import { Button, Loader, ParcelImage } from 'components/UI/elements';
import { useWeb3 } from 'contexts/Web3Context';
import { useRealm } from 'contexts/RealmContext';
import { useNotification } from 'contexts/NotificationContext';
import { showNotification, showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useUser } from 'contexts/UserContext';
import { getOnChainAlchemicaIcon } from 'helpers/functions';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import { UsersAlchemicaBalance } from '../../CraftingTable/components';
import styles from './styles';
import { checkTokensAllowance, fetchTokensAllowance, getContract } from 'web3/contract';
import axios from 'axios';
import { fetchEventsList } from 'helpers/events.helper';
import { PARCELS_BY_ID } from 'shared_code/models/model.realm';
import { JsonParcel, RealmEvent } from 'types';
import { useUI } from 'contexts/UIContexts';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { fetchAndSetAlchemicaBalance, fetchAndSetGltrBalance } from 'contexts/UserContext/actions';
import { ApprovalNeeded } from 'components/UI/widgets';
import { utils } from 'ethers';
import _ from 'lodash';
import InputController from 'components/controllers/inputController';
import { getErrMessage } from 'helpers/ethers.helper';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { ShareLink } from '../components/ShareLink';
import { Modal } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

interface TokensApproved {
  fud: boolean;
  fomo: boolean;
  alpha: boolean;
  kek: boolean;
  gltr: boolean;
}

export const EventModal = (): JSX.Element => {
  const [{ currentAccount, currentNetwork, globalProvider, ethersSigner }] = useWeb3();
  const [{ alchemicaBalance, gltrBalance }, userDispatch] = useUser();
  const [, notificationDispatch] = useNotification();
  const [{ eventsModal }, uiDispatch] = useUI();
  const [{ gameConfig }] = useGame();
  const { send } = useAavegotchiSound();

  const [baseDuration, setBaseDuration] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);
  const [eventImage, setEventImage] = useState(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [alchemicaValue, setAlchemicaValue] = useState({ fud: 0, fomo: 0, alpha: 0, kek: 0 });
  const [basePP, setBasePP] = useState<number>(0);
  const [eventName, setEventName] = useState<string>('');
  const [rank, setRank] = useState<number>();
  const [pp2NextLevel, setPP2NextLevel] = useState<number>();
  const [highestPPs, setHighestPPs] = useState<number[]>([]);
  const [parcelEvent, setParcelEvent] = useState<JsonParcel>();
  const [tokensApproved, setTokensApproved] = useState<TokensApproved>();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<RealmEvent>();
  const [pp, setPP] = useState(0);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isDone, setDone] = useState(false);

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const GLTR_PER_HOUR = 1800;
  const PP_INC = { fud: 1, fomo: 2, alpha: 4, kek: 10 };

  useEffect(() => {
    InputController.updateDisableKeyboard(eventsModal.open);
    if (eventsModal?.open && eventsModal.installationId) {
      //  Update Alchemica
      void fetchAndSetAlchemicaBalances();
      void fetchAndSetAllowance();

      // get parcelEvent;
      const installationData = getInstallationIdDataById(eventsModal.installationId);
      const parcelEvent: JsonParcel = PARCELS_BY_ID[installationData.parcelId];
      // console.log('parcelEvent', parcelEvent);

      if (parcelEvent) {
        setParcelEvent(parcelEvent);
        void fetchAndSetEventsList(parcelEvent);
      }
    } else {
      setEventImage(undefined);
      setDuration(0);
      setBaseDuration(0);
      setAlchemicaValue({ fud: 0, fomo: 0, alpha: 0, kek: 0 });
      setLinkCopied(false);
    }
  }, [eventsModal]);

  useEffect(() => {
    let rank = highestPPs.findIndex((value) => value < pp) + 1;
    if (pp === 0 || rank === 0) rank = highestPPs.length + 1;
    setRank(rank);
    if (rank > 1) {
      setPP2NextLevel(highestPPs[rank - 2] - pp + 1);
    } else if (rank > 10) {
      setPP2NextLevel(highestPPs[highestPPs.length - 1] - pp + 1);
    }
  }, [pp, highestPPs]);

  useEffect(() => {
    const points = basePP + Object.keys(alchemicaValue).reduce((current, alchemica) => current + PP_INC[alchemica] * alchemicaValue[alchemica], 0);
    setPP(points);
  }, [basePP, alchemicaValue]);

  const isApproved = (): boolean => {
    if (tokensApproved === undefined) return false;
    return !Object.keys(tokensApproved).some((alchemica) => !tokensApproved[alchemica]);
  };

  const fetchAndSetAllowance = async () => {
    setLoading(true);
    const response = await fetchTokensAllowance('realmDiamond', currentAccount, currentNetwork, globalProvider);
    if (response) {
      const allowedTokens = checkTokensAllowance(
        {
          fud: 0.1,
          fomo: 0.1,
          alpha: 0.1,
          kek: 0.1,
          gltr: 0.1,
        },
        {
          fud: response[0],
          fomo: response[1],
          alpha: response[2],
          kek: response[3],
          gltr: response[4],
        },
      );
      setTokensApproved(allowedTokens);
    }
    setLoading(false);
    setAlchemicaValue({ fud: 0, fomo: 0, alpha: 0, kek: 0 });
  };

  const fetchAndSetAlchemicaBalances = async () => {
    await fetchAndSetAlchemicaBalance({ account: currentAccount, network: currentNetwork, provider: globalProvider }, userDispatch);
    await fetchAndSetGltrBalance({ account: currentAccount, network: currentNetwork, provider: globalProvider }, userDispatch);
  };

  const fetchAndSetEventsList = async (parcelEvent: JsonParcel) => {
    // const contract = await getContract(currentNetwork, ethersSigner, 'realmDiamond', true);
    // const event = await contract.viewEvent(parcelEvent.tokenId);
    // console.log('ContractEvet', Number(event.startTime), Number(event.endTime));

    let events = await fetchEventsList(currentNetwork);
    // console.log('@fetchAndSetEventsList: LIST', events);
    const myEvent = events.find((e: RealmEvent) => e.id === parcelEvent.tokenId);
    // console.log('@fetchAndSetEventsList: myEvent', myEvent);

    // set isCreate based on eventslist
    setIsCreate(!myEvent);

    if (myEvent) {
      // exclude this event from the list.
      events = _.filter(events, (e: RealmEvent) => e.id !== parcelEvent.tokenId);
      setEventName(myEvent.title);
      setEventImage(myEvent.image);
      const hours = Math.floor((myEvent.endTime - myEvent.startTime) / (60 * 60));
      setBaseDuration(hours);
      setDuration(0);
      setBasePP(Number(myEvent.priority));
      setCurrentEvent(myEvent);
    } else setDuration(1);
    const pps = events.map((e: RealmEvent) => e.priority);
    pps.sort((a, b) => a - b).reverse();
    setHighestPPs([...pps.slice(0, Math.min(10, pps.length))]);
  };

  const onAddImage = async ([file]) => {
    console.log('@onAddImage:file', file);
    if (!file) return;
    if (file.size >= MAX_FILE_SIZE) {
      showError('Image Upload', 'Exceeds maximum file size');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = async () => {
      const { width, height } = img;

      if (width !== height * 2) {
        showError('Image Upload', 'Image ratio should be 2:1');
      } else {
        const res = await uploadImage(file);
        if (!res) return;
        setEventImage(url);
      }
    };
  };

  const onClose = () => {
    uiDispatch({
      type: 'UPDATE_EVENTS_MODAL',
      eventsModal: { open: false, installationId: undefined },
    });
  };

  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    onDrop: onAddImage,
    maxFiles: 1,
  });

  const onIncAlchemica = (alchemica: string, input?: number) => {
    setAlchemicaValue({
      ...alchemicaValue,
      [alchemica]: isNaN(input) ? alchemicaValue[alchemica] + 1 : input,
    });
  };

  const showError = (message: string, title?: string) => {
    showNotification(notificationDispatch, {
      type: 'error',
      title: title || 'Error',
      message,
    });
  };

  const alchemicaToArray = () => {
    const units = ['fud', 'fomo', 'alpha', 'kek'].map((alchemica) => utils.parseEther(alchemicaValue[alchemica].toString()));
    return units;
  };

  const enoughGltr = () => {
    return (gltrBalance || 0) > (duration - baseDuration) * GLTR_PER_HOUR;
  };

  const enoughAlchemica = () => {
    return (
      (alchemicaBalance?.fud || 0) >= alchemicaValue.fud &&
      (alchemicaBalance?.fomo || 0) >= alchemicaValue.fomo &&
      (alchemicaBalance?.alpha || 0) >= alchemicaValue.alpha &&
      (alchemicaBalance?.kek || 0) >= alchemicaValue.kek
    );
  };
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/realm/events/parcel/${parcelEvent.parcelId}/image`, formData);
      if (res.status !== 200) {
        showError('Error occured while uploading the event image!');
        return false;
      } else {
        showNotification(notificationDispatch, {
          type: 'success',
          title: 'Success',
          message: 'Image Updated!',
        });
      }
    } catch (error) {
      showError('Error uploading image!');
      console.error('@UploadImage:ERR', error);
      return false;
    }
    return true;
  };

  const validate = () => {
    let result = false;
    if (!eventName) {
      showError('Event name cannot be empty!');
    } else if (!enoughGltr()) {
      showError('Not enough GLTR balance');
    } else if (!enoughAlchemica()) {
      showError('Not enough alchemica!');
    } else {
      result = true;
    }
    return result;
  };

  const onCreateEvent = async () => {
    if (validate()) {
      setLoading(true);
      // All parameters are set correctly
      let notificationId, tx;
      const startEvent = Number(Number(Date.now() / 1000).toFixed()) + 120;
      console.log('@onCreateEvent:', startEvent);
      try {
        const contract = await getContract(currentNetwork, ethersSigner, 'realmDiamond', true);
        tx = await contract.createEvent(eventName, startEvent, 60 * duration, alchemicaToArray(), parcelEvent.tokenId);
        notificationId = showTransactionNotification(notificationDispatch, {
          message: 'Creating event...',
        });
        send();
        await tx.wait();
        updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
        onClose();
        setLoading(false);
        setDone(true);
      } catch (e) {
        notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
        setLoading(false);
      }
    }
  };

  const onUpdateEvent = async () => {
    if (validate()) {
      setLoading(true);
      let notificationId, tx;
      // Move upload image on drop
      try {
        notificationId = showTransactionNotification(notificationDispatch, {
          message: 'Updating event...',
        });
        const contract = await getContract(currentNetwork, ethersSigner, 'realmDiamond', true);
        tx = await contract.updateEvent(parcelEvent.tokenId, alchemicaToArray(), duration * 60);
        send();
        await tx.wait();
        onClose();
        updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
      } catch (e) {
        console.error('@onUpdateEvent', e);
        notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
      }
      setLoading(false);
    }
  };

  const onCancelEvent = async () => {
    setCanceling(true);
    let notificationId, tx;
    try {
      notificationId = showTransactionNotification(notificationDispatch, {
        message: 'Cancel Event',
      });
      const contract = await getContract(currentNetwork, ethersSigner, 'realmDiamond', true);
      tx = await contract.cancelEvent(parcelEvent.tokenId);
      send();
      await tx.wait();
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
    } catch (e) {
      console.error('error', e);
      notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
    }
    setCanceling(false);
  };

  const blockPropagation = (e) => {
    e.stopPropagation();
  };

  if (approveModalOpen) {
    return (
      <ApprovalNeeded
        approved={tokensApproved}
        handleApproved={setTokensApproved}
        open={approveModalOpen && eventsModal.open}
        onClose={() => setApproveModalOpen(false)}
        contractName="realmDiamond"
      />
    );
  }
  const currentDuration = () => {
    return duration + baseDuration - (currentEvent ? Math.floor(currentEvent.minutesDelta / 60) : 0);
  };

  return (
    <>
      <Modal title={isCreate ? 'CREATE NEW EVENT' : 'UPDATE EVENT'} color={gameConfig.gotchiverseTheme} open={eventsModal.open} onClose={onClose}>
        {parcelEvent && (
          <div className={`events-container ${gameConfig.gotchiverseTheme}`}>
            <div className="alchemica-balances">
              <UsersAlchemicaBalance
                usersAlchemicaBalance={alchemicaBalance}
                gltr={gltrBalance || 0}
                size={3.6}
                width="59rem"
                color={gameConfig.gotchiverseTheme}
              />
            </div>
            <div className="config-panel">
              <div className="event-image-container">
                <div className="logo-wrapper">
                  {!eventImage ? (
                    <div
                      {...getRootProps()}
                      className="no-image"
                      style={{
                        background: `linear-gradient(0deg, rgba(40, 27, 37, 0.9), rgba(40, 27, 37, 0.9)), url(https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${parcelEvent?.tokenId}.png)`,
                      }}
                    >
                      {loading ? (
                        <>
                          <Loader color="pink" />
                        </>
                      ) : (
                        <>
                          <input {...getInputProps()} />
                          <div className="upload-logo-wrapper">
                            <NextImage alt="" src={GalleryIcon} layout="fill" />
                          </div>
                          <div className="add-image">
                            Add Your Event Image
                            <div className="file-size">(max 1MB, 2:1 ratio)</div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <NextImage alt="" src={eventImage} layout="fill" />
                      <div className="edit-icon-wrapper">
                        <input {...getInputProps()} />
                        <NextImage alt="" src={EditIconPink} layout="fill" onClick={openFileDialog} />
                      </div>
                    </>
                  )}
                </div>

                <div className="parcel-container">
                  <div className="parcel-image-wrapper">
                    <ParcelImage parcelId={parcelEvent.tokenId} size={6} />
                  </div>
                  <div>
                    <div className="parcel-name">{parcelEvent.parcelHash}</div>
                    <div className="parcel-id">ID: {parcelEvent.tokenId}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="event-name-wrapper">
                  <div className="event-name">
                    {isCreate ? (
                      <input
                        className="event-name-input"
                        placeholder="Enter your event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    ) : (
                      <>{eventName}</>
                    )}
                  </div>
                  {!isCreate && !loading && (
                    <div className="copy-link">
                      {linkCopied && <div className="link-copied">Link copied!</div>}
                      <ShareLink event={currentEvent} onCopy={() => setLinkCopied(true)} />
                    </div>
                  )}
                </div>
                {!isDone ? (
                  <div className="options-wrapper">
                    <div className="option">
                      <div className="option-header">
                        <span className="header">DURATION:</span>
                        <div className="duration-container">
                          <span className="value duration">{Math.floor(currentDuration() / 24)}</span>
                          <span className="header days">{Math.floor(currentDuration() / 24) === 1 ? 'day' : 'days'}</span>
                          <span className="value duration">{Math.floor(currentDuration() % 24)}</span>
                          <span className="header hours">{Math.floor(currentDuration() % 24) === 1 ? 'hr' : 'hrs'}</span>
                        </div>
                      </div>
                      <div className="increase">Increase</div>
                      <div className="increase-with-gltr">
                        <div className="gltr-container">
                          <div className="gltr-icon-wrapper">
                            <NextImage alt="" src={GltrIcon} layout="fill" />
                          </div>
                          <span className="gltr-value">{duration * GLTR_PER_HOUR}</span>
                        </div>
                        <div className="duration-counter">
                          <button
                            className="inc-button inc-duration"
                            disabled={duration <= (isCreate ? 1 : 0)}
                            onClick={() => setDuration(duration - 1)}
                          >
                            -
                          </button>
                          {/* <span className="hour">{duration === 1 ? '1 hr' : `${duration} hrs`}</span> */}
                          <div className="hour">
                            <input
                              type="number"
                              className="hour-input"
                              value={Number(duration).toString()}
                              onChange={(e) => setDuration(Number(e.target.value))}
                            />
                            <span className="hour-info">{duration === 1 ? ' hr' : 'hrs'}</span>
                          </div>
                          <button className="inc-button inc-duration" onClick={() => setDuration(duration + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="option">
                      <div className="option-header">
                        <span className="header pp">PRIORITY POINTS:</span>
                        <span className="value pp">{pp}</span>
                      </div>
                      <div className="increase">Increase</div>
                      <div className="inc-alchemica-list">
                        {['fud', 'alpha', 'fomo', 'kek'].map((alchemica, index) => (
                          <div className="inc-alchemica" key={index}>
                            <div className="alchemica-container">
                              <div className="alchemica-icon-wrapper">
                                <NextImage alt="" src={getOnChainAlchemicaIcon(alchemica)} layout="fill" />
                              </div>
                              <input
                                type="number"
                                className="alchemica-value input-clear"
                                value={Number(alchemicaValue[alchemica]).toString()}
                                onChange={(e) => onIncAlchemica(alchemica, Number(e.target.value))}
                              />
                            </div>
                            <button className="inc-button inc-pp" onClick={() => onIncAlchemica(alchemica)}>{`+${PP_INC[alchemica]} PP`}</button>
                            <div className="reset-alchemica" onClick={() => setAlchemicaValue({ ...alchemicaValue, [alchemica]: 0 })}>
                              x
                            </div>
                          </div>
                        ))}
                      </div>
                      {rank !== undefined && (
                        <div className="notification">
                          <p className="warning">Priority Points go down by 0.01% per minute</p>
                          {rank > 10 ? (
                            <>
                              You can join <span>Top 10</span> Events List!
                              <br />
                              Boost your Event to <span>#10</span> for <span>{pp2NextLevel} PP!</span>
                            </>
                          ) : (
                            <>
                              Your event is <span>#{rank}</span> in the events List!
                              <br />
                              {rank !== 1 && (
                                <>
                                  Get 1 level higher for just <span>{pp2NextLevel} PP!</span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="create-done-container">
                    <div className="congrats-container">
                      <div className="heading">Congrats fren!</div>
                      <div className="message">You created a new event!</div>
                    </div>
                    <div className="share-link-container">
                      <div className="share">Share the link with a community</div>
                      <ShareLink event={currentEvent} color="var(--col-pink-200)" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="buttons-container" onClick={blockPropagation} onMouseDown={blockPropagation}>
              <div className="main-button">
                {!isApproved() && (
                  <Button size={3.5} color={gameConfig.gotchiverseTheme} disabled={loading} fullWidth onClick={() => setApproveModalOpen(true)}>
                    {loading ? 'Loading...' : 'Approve Spend Tokens'}
                  </Button>
                )}
                {isApproved() && (
                  <>
                    {isCreate &&
                      (isDone ? (
                        <Button size={3.5} color={gameConfig.gotchiverseTheme} fullWidth onClick={onClose}>
                          Done
                        </Button>
                      ) : (
                        <Button size={3.5} color={gameConfig.gotchiverseTheme} disabled={loading} fullWidth onClick={onCreateEvent}>
                          {!loading ? 'Create Event' : 'Creating...'}
                        </Button>
                      ))}
                    {!isCreate && (
                      <Button size={3.5} color={gameConfig.gotchiverseTheme} disabled={loading} fullWidth onClick={onUpdateEvent}>
                        {!loading ? 'Update Event' : 'Updating...'}
                      </Button>
                    )}
                  </>
                )}
              </div>
              {!isCreate && (
                <button className={`cancel-button clear ${canceling ? 'disabled' : ''}`} disabled={canceling} onClick={onCancelEvent}>
                  <span>Cancel Event</span>
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
      <style jsx>{styles}</style>
    </>
  );
};
