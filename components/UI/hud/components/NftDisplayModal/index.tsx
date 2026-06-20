import { useEffect, useRef, useState } from 'react';
import styles from './styles';
import Image from 'next/image';
import {
  GhstIcon,
  NftLinkIcon,
  NftShine,
  GotchiIcon,
  EditIcon,
  ExtendIcon,
  EyeIcon,
  SunnyPixelcraft,
  DreammyPixelcraft,
  PriceConfirmIcon,
  PriceNoconfirmIcon,
  PriceCheckMark,
  NftLoadingBack,
  AavegotchiMascot,
} from 'assets';
import _ from 'lodash';
import { useUI } from 'contexts/UIContexts';
import { NFTDisplay } from 'components/phaser/NFTDisplay';
import { NFTBaazaarData, NFTCollectionConfig, NFTDisplayData, NFTDisplayMetadata, NFTDisplayServerData, NFTIdData } from 'types';
import { Button, Loader } from 'components/UI/elements';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { useWeb3 } from 'contexts/Web3Context';
import { useSubgraph } from 'web3/subgraph';
import { ownerListingsQuery } from 'web3/subgraph/queries';
import { BigNumber, ethers, utils } from 'ethers';
import { approveToken, getErrMessage, smartTrim } from 'helpers/ethers.helper';
import { useNotification } from 'contexts/NotificationContext';
import { showNotificationWithTimeout, showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useUser } from 'contexts/UserContext';
import { DiamondName, fetchAllowence, getContract } from 'web3/contract';
import { varsForNetwork } from 'shared_code/web3/shared.const.web3';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { MoralisController } from 'components/controllers/moralisController';
import { useGame } from 'contexts/GameContext';

export const NftDisplayModal = (): JSX.Element => {
  const [{ nftDisplayState, nftDisplayAdminState }, uiDispatch] = useUI();
  const [extended, setExtended] = useState(false);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  const [{ currentAccount, currentNetwork, ethersSigner, globalProvider }] = useWeb3();
  const [, notificationDispatch] = useNotification();
  const [ghstBalance] = useUser();
  const [{ gameConfig }] = useGame();

  // for testing
  const USE_INVERT_IS_OWNER = false;

  const [metadata, setMetadata] = useState<NFTDisplayMetadata>(undefined);
  const [baazaarData, setBaazaarData] = useState<NFTBaazaarData>();
  const [nftData, setNftData] = useState<NFTIdData>();
  const [priceValue, setPriceValue] = useState(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [hasBaazaar, setHasBaazaar] = useState<boolean>(false);
  const [hasEnoughGhst, setHasEhoughGhst] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>();

  // just for testing isOnwer is actually nftDisplayState.isOwner
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [checkingAllowance, setCheckingAllowance] = useState<boolean>(false);
  const [checkingApproval, setCheckingApproval] = useState<boolean>(false);
  const [settingAllowance, setSettingAllowance] = useState<boolean>(false);
  const [NFTIdData, setNFTIdData] = useState<NFTIdData>();
  const [NFTConfig, setNFTConfig] = useState<NFTCollectionConfig>();
  const [isVideo, setIsVideo] = useState<boolean>();
  const videoRef = useRef(null);

  const modalFrameWidth = 200;
  const modalFrameHeight = 200;

  const { oops, send } = useAavegotchiSound();
  useEffect(() => {
    // console.log('@NftDisplayModal:', nftDisplayState);
    // If there is no serverData it means this NFT is empty and we need to add the default state to it.
    if (!nftDisplayState?.open) return;
    setEditing(false);
    setConfirmed(false);
    setBaazaarData(undefined);
    setCheckingAllowance(false);
    setCheckingApproval(false);
    setPriceValue(0);

    void fetchAndSetNFTDisplayMetadata(nftDisplayState.serverData, nftDisplayState.nftData);

    if (nftDisplayState?.serverData || nftDisplayState?.nftData) {
      const nftId = nftDisplayState?.serverData?.id || nftDisplayState?.nftData?.id;

      const idData = NFTDisplay.getDataById(nftId);
      // console.log('@NFTDisplayModal:idData', idData);
      if (idData) setNFTIdData(idData);

      const configData = NFTDisplay.getConfigById(nftId);
      // console.log('@NFTDisplayModal:configData', configData);
      if (configData) setNFTConfig(configData);

      const hasBaazaar = currentNetwork === 'base' && configData.hasBaazaar;
      setHasBaazaar(hasBaazaar);
      if (hasBaazaar) void fetchAndSetBaazaarListing(nftId);
    } else clearModal();

    setIsOwner(USE_INVERT_IS_OWNER ? !nftDisplayState.isOwner : nftDisplayState.isOwner);
  }, [nftDisplayState]);

  const clearModal = () => {
    setMetadata(undefined);
  };

  const fetchAndSetBaazaarListing = async (id: string) => {
    const idData = NFTDisplay.getDataById(id);
    const configData = NFTDisplay.getConfigById(id);

    setLoading(true);

    const query = ownerListingsQuery(
      nftDisplayState.serverData?.owner || currentAccount,
      idData.contractType,
      configData.category[idData.contractType].toString(),
    );
    const res = await useSubgraph(query);
    const listing = _.find(
      res[idData.contractType.toLowerCase() + 'Listings'],
      ({ tokenId, erc1155TypeId }) => Number(tokenId) === Number(idData.tokenId) || Number(erc1155TypeId) === Number(idData.tokenId),
    );

    // console.log('listing', listing);
    if (listing) {
      setBaazaarData({
        listingId: listing.id,
        tokenId: Number(idData.tokenId),
        price: Number(ethers.utils.formatEther(listing.priceInWei)),
        priceInWei: listing.priceInWei,
        contractType: idData.contractType,
      });
      setPriceValue(Number(ethers.utils.formatEther(listing.priceInWei)));

      const hasEnoughGhst = ghstBalance.ghstBalance.gte(BigNumber.from(listing.priceInWei));
      setHasEhoughGhst(hasEnoughGhst);

      await fetchAndSetAllowance(listing);
    } else {
      setBaazaarData(undefined);
    }

    setLoading(false);
  };

  const fetchAndSetAllowance = async (listing) => {
    if (!listing) return;
    // refactor to fetch allowance with ghstBalance
    const allowance = await fetchAllowence('ghstAddress', 'aavegotchiDiamond', currentAccount, currentNetwork, globalProvider);
    const hasAllowance = !!allowance.gte(BigNumber.from(listing.priceInWei));
    setHasAllowance(hasAllowance);
  };

  const fetchAndSetNFTDisplayMetadata = async (serverData?: NFTDisplayServerData, NFTData?: NFTDisplayData) => {
    let metadata;
    setLoading(true);
    if (serverData || NFTData) setNftData(NFTDisplay.getDataById(serverData?.id || NFTData.id));
    if (NFTData) {
      if (NFTData.metadata) {
        const transformedMetadata = NFTDisplay.checkFormat(serverData?.id || NFTData.id, NFTData.metadata, true, modalFrameWidth, modalFrameHeight);
        setIsVideo(!!transformedMetadata.video);
        setThumbnail(thumbnail);
        setMetadata(transformedMetadata);
      }
      setLoading(false);
      return;
    }
    if (serverData || NFTData?.tokenUri) {
      metadata = await NFTDisplay.getMetadataURI(serverData.id, serverData.tokenUri);
      if (metadata) {
        const transformedMetadata = NFTDisplay.checkFormat(serverData?.id || NFTData.id, metadata, true, modalFrameWidth, modalFrameHeight);
        setIsVideo(!!transformedMetadata.video);
        setThumbnail(thumbnail);
        setMetadata(transformedMetadata);
      }
    }
    setLoading(false);
    // console.log('@fetchAndSetNFTDisplayMetadata: Metadata', metadata);
  };

  const toggleAdminPanel = (state: boolean) => {
    // console.log('@toggleAdminPanel', state);
    uiDispatch({
      type: 'UPDATE_NFT_DISPLAY_ADMIN',
      nftDisplayAdminState: { open: state, installationId: nftDisplayState.installationId },
    });
  };

  const getPixelcraftIcon = (): string => {
    const idData = getInstallationIdDataById(nftDisplayState.installationId);
    return Number(idData.itemId) > 140 ? SunnyPixelcraft : DreammyPixelcraft;
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setPriceValue(value);
    if (confirmed) setConfirmed(false);
  };

  const handleEdit = async () => {
    setEditing(true);

    await fetchAndSetContractApproval();
  };

  const fetchAndSetContractApproval = async (): Promise<void> => {
    if (!NFTConfig) return;
    setLoading(true);
    setCheckingApproval(true);

    const isApproved = await fetchContractApproval('aavegotchiDiamond');
    const isSelfApproved = NFTConfig.requireSelfApprove ? await fetchContractApproval(NFTConfig.contract) : true;
    setIsApproved(isApproved && isSelfApproved);
    if (isApproved) setCheckingApproval(false);
    setLoading(false);
  };

  const fetchContractApproval = async (diamondName: DiamondName): Promise<boolean> => {
    const tokenContract = await getContract(currentNetwork, ethersSigner, NFTConfig.contract, true);
    if (!tokenContract) {
      setIsApproved(false);
      console.error(NFTConfig.contract, 'contract notFound');
      setLoading(false);
      return;
    }
    const vars = varsForNetwork(currentNetwork);
    const approved = await tokenContract.isApprovedForAll(currentAccount, vars[diamondName]);
    console.log('Approve: ', diamondName, approved);
    return approved;
  };

  const onContractApprove = async (): Promise<void> => {
    await approveContract('aavegotchiDiamond');
    if (NFTConfig.requireSelfApprove) await approveContract(NFTConfig.contract);
  };

  const approveContract = async (diamondName: DiamondName): Promise<void> => {
    if (!NFTConfig) return;
    if (!NFTConfig.requireSelfApprove) {
      // check if is already approved.
      const isApproved = await fetchContractApproval(diamondName);
      if (isApproved) return;
    }

    const tokenContract = await getContract(currentNetwork, ethersSigner, NFTConfig.contract, true);
    if (!tokenContract) {
      oops();
      console.error(NFTConfig.contract, 'contract notFound');
      setLoading(true);
      return;
    }

    const vars = varsForNetwork(currentNetwork);
    let tx, notificationId;

    try {
      notificationId = showTransactionNotification(notificationDispatch, {
        message: 'Approve Contract',
        options: {
          sound: true,
        },
      });
      tx = await tokenContract.setApprovalForAll(vars[diamondName], true);
      send();
      await tx.wait();
      if (tx?.status && tx.status === 1) updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
      else updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx));

      await fetchAndSetContractApproval();
      // await handleListing();
      setCheckingAllowance(false);
    } catch (e) {
      notificationId && updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx || e));
    }
  };

  const handleListing = async () => {
    if (ghstBalance.ghstBalance.lt(utils.parseEther('0.1'))) {
      showNotificationWithTimeout(notificationDispatch, {
        type: 'error',
        title: 'Error',
        message: 'You need 0.1 GHST to create a listing!',
      });
      return;
    }
    setLoading(true);
    const notificationId = showTransactionNotification(notificationDispatch, {
      message: `List ${NFTIdData.contractType}`,
      options: {
        sound: true,
      },
    });
    const tx = await NFTDisplay.setListing(currentAccount, currentNetwork, ethersSigner, NFTIdData.id, priceValue.toString());
    // console.log('@handleListing:tx', tx);
    if (tx?.status && tx.status === 1) updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
    else updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx));

    setTimeout(() => {
      void fetchAndSetBaazaarListing(NFTIdData.id);
      setEditing(false);
    }, 2000);
  };

  const handleBuyButton = async () => {
    if (!hasAllowance) {
      setCheckingAllowance(true);
      return;
    }
    const notificationId = showTransactionNotification(notificationDispatch, {
      message: 'Execute Listing',
      options: {
        sound: true,
      },
    });
    const tx = await NFTDisplay.purchaseCancelListing(currentNetwork, ethersSigner, 'execute', baazaarData);

    if (tx?.status && tx.status === 1) updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
    else updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx));

    setTimeout(() => {
      void fetchAndSetBaazaarListing(NFTIdData.id);
      setEditing(false);
    }, 2000);
  };

  const handleCancelListing = async () => {
    setLoading(true);
    const notificationId = showTransactionNotification(notificationDispatch, {
      message: 'Cancel Listing',
      options: {
        sound: true,
      },
    });
    const tx = await NFTDisplay.purchaseCancelListing(currentNetwork, ethersSigner, 'cancel', baazaarData);

    if (tx?.status && tx.status === 1) updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
    else {
      oops();
      updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(tx));
    }
    setTimeout(() => {
      void fetchAndSetBaazaarListing(NFTIdData.id);
      setEditing(false);
    }, 2000);
  };

  const handleSetAllowance = async () => {
    setSettingAllowance(true);
    await approveToken('ghst', 'aavegotchiDiamond', currentNetwork, ethersSigner);
    // console.log('handleSetAllowance', res);
    await fetchAndSetAllowance(baazaarData);
    await handleBuyButton();
    setSettingAllowance(false);
    setCheckingAllowance(false);
  };

  const blockPropagation = (e) => {
    e.stopPropagation();
  };

  const getBaazaarLink = (): string => {
    if (!baazaarData) return;
    if (NFTConfig?.contract !== 'fakeGotchisDiamond') {
      return `https://app.aavegotchi.com/baazaar/${baazaarData.contractType.toLocaleLowerCase()}/${baazaarData.listingId}`;
    } else return `https://www.fakegotchis.com/explore/${baazaarData.tokenId}`;
  };

  const displayBaazaar = (): boolean => {
    if (baazaarData) {
      return editing ? editing && isApproved : true;
    } else if (editing) return isApproved;
  };

  const onExtend = () => {
    setExtended(true);
    isVideo && videoRef?.current?.pause();
  };

  const onCancelExtend = () => {
    setExtended(false);
    isVideo && videoRef?.current?.play();
  };

  return (
    <>
      {nftDisplayState?.open && (
        <div className={gameConfig.gotchiverseTheme} onMouseDown={blockPropagation} onClick={blockPropagation}>
          {extended && metadata && (
            <div className="extended-button" onClick={onCancelExtend}>
              <div className="extended-image">
                {!isVideo && (
                  <Image alt=""
                    src={metadata.image}
                    width={500}
                    height={500 / ratio}
                    onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
                  />
                )}
                {isVideo && <video autoPlay={true} loop={true} src={metadata?.video} className="video-frame"></video>}
              </div>
              <p>tap to close</p>
            </div>
          )}
          {(metadata || nftDisplayState.isOwner) && (
            <div className="container">
              <div className="nft-container">
                <div className={`main-img-container ${baazaarData && !isOwner ? 'button-include' : ''}`}>
                  {metadata && !nftDisplayAdminState.open && !loading && (
                    <div className="extend-container">
                      {isOwner && (
                        <button className="extend-button" onClick={() => toggleAdminPanel(true)}>
                          <div className="icon big">
                            <Image alt="" src={EditIcon} layout="fill" />
                          </div>
                        </button>
                      )}
                      {!isOwner && (
                        <button className="extend-button" onClick={onExtend}>
                          <div className="icon">
                            <Image alt="" src={ExtendIcon} layout="fill" />
                          </div>
                        </button>
                      )}
                    </div>
                  )}

                  <div className="img-container">
                    {loading && (
                      <>
                        <div className="loading-back">
                          <Image alt="" src={NftLoadingBack} layout="fill" />
                        </div>
                        <Loader size={1} color="pink" />
                      </>
                    )}
                    {!loading && (
                      <Image alt=""
                        src={thumbnail || metadata?.image || NFTDisplay.getDefaultImg(nftDisplayState.installationId)}
                        layout="fill"
                        objectFit={nftData && MoralisController.assetsConfig[nftData.collectionId]?.isCover ? 'cover' : 'contain'}
                      />
                    )}
                    {/* {!loading && isVideo && <video ref={videoRef} autoPlay={true} loop={true} src={metadata?.video} className="video-frame"></video>} */}
                  </div>
                </div>
                {baazaarData && !isOwner && (
                  <div className="button-shadow">
                    <div className="button-container">
                      <button className="action-button" disabled={checkingAllowance || !hasEnoughGhst} onClick={handleBuyButton}>
                        <div className={`inner ${checkingAllowance || !hasEnoughGhst ? 'disable' : ''}`}>
                          <span className="action-button-info">{'Buy for'}</span>
                          <div className="ghst-icon">
                            <Image alt="" src={GhstIcon} layout="fill" />
                          </div>
                          <span className="action-button-info">{baazaarData.price}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
                <div className="content-container">
                  {loading && (
                    <div className="loading-state">
                      <Loader size={0.25} />
                      <p>Loading...</p>
                    </div>
                  )}

                  {!loading && (
                    <>
                      <div className="info-container">
                        <div className="name-icon-container">
                          <div className="name-container">
                            <p className={`name ${metadata?.name ? 'slim' : ''}`}>{metadata?.name || 'welcome'}</p>
                            {!metadata && <p className="sub-text">TO YOUR NFT DISPLAY</p>}
                          </div>
                          {!metadata && nftDisplayState.installationId && (
                            <span className="icon-container">
                              <Image alt="" src={getPixelcraftIcon()} />
                            </span>
                          )}
                        </div>
                        {!checkingAllowance && !checkingApproval && (
                          <div className="scrollable-container-wrapper">
                            <div className="desc-container scrollable-container ">
                              <p className="desc scrollable info slim">
                                {metadata?.description ||
                                  'Add NFTs from your collections, share your favorite art, sell it without leaving the Gotchiverse or buy new NFTs!'}
                              </p>
                            </div>
                          </div>
                        )}
                        {!isOwner && metadata && nftDisplayState.serverData?.owner && (
                          <div className="owner-link">
                            <span className="owner-title">Owned by</span>{' '}
                            <a
                              href={`https://app.aavegotchi.com/baazaar/owner/${nftDisplayState.serverData?.owner}`}
                              className="link"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {smartTrim(nftDisplayState.serverData?.owner, 10)}
                            </a>
                          </div>
                        )}
                        {isOwner && metadata && nftDisplayState.serverData?.views && (
                          <div className="views-container">
                            <Image alt="" src={EyeIcon} width={20} height={12} />
                            <p>{nftDisplayState.serverData?.views}</p>
                          </div>
                        )}
                      </div>
                      {!metadata && (
                        <Button size={1.8} onClick={() => toggleAdminPanel(true)} color={gameConfig.gotchiverseTheme}>
                          Add your NFT
                        </Button>
                      )}
                      {!isOwner && baazaarData && !checkingAllowance && (
                        <>
                          <div className="links-container">
                            <span>View in </span>
                            <a href={getBaazaarLink()} className="link" target="_blank" rel="noreferrer">
                              Baazaar
                            </a>
                            <span className="link-image">
                              <Image alt="" src={NftLinkIcon} width={9} />
                            </span>
                            <span>or </span>
                            <a
                              href={`https://opensea.io/assets/${NFTIdData.chain === '137' ? 'matic' : 'ethereum'}/${NFTIdData.tokenAddress}/${
                                NFTIdData.tokenId
                              }`}
                              target="_blank"
                              className="link"
                              rel="noreferrer"
                            >
                              Opensea
                            </a>
                            <span className="link-image">
                              <Image alt="" src={NftLinkIcon} width={9} />
                            </span>
                          </div>
                          {!hasEnoughGhst && (
                            <a href="https://quickswap.exchange/#/swap" target="_blank" rel="noreferrer" className="swap-link">
                              <span className="link-text">Swap more</span>
                              <span className="img">
                                <Image alt="" src={GhstIcon} width={17} height={17} />
                              </span>
                            </a>
                          )}
                        </>
                      )}

                      {checkingAllowance && !loading && (
                        <div className="approve-container">
                          <div className="info-container">
                            <div className="icon">
                              <Image alt="" src={AavegotchiMascot} />
                            </div>
                            <div className="text">
                              <span>Please </span>
                              <a
                                href="https://polygonscan.com/address/0x86935F11C86623deC8a25696E1C19a8659CbF95d"
                                className="contract-link"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Approve Contract
                              </a>
                              <span> to Buy the NFT </span>
                            </div>
                          </div>
                          <Button size={1.2} color="success" disabled={settingAllowance} onClick={handleSetAllowance}>
                            Approve
                          </Button>
                        </div>
                      )}

                      {!isOwner && !baazaarData && metadata && (
                        <div className="nosale-container">
                          <div className="nosale-image">
                            <Image alt="" src={GotchiIcon} layout="fill" />
                          </div>
                          <p className="nosale-text">not for sale</p>
                        </div>
                      )}
                      {metadata && isOwner && !baazaarData && !editing && (
                        <div className="is-owner nolist">
                          {hasBaazaar && (
                            <div className="nft-nolist">
                              Not listed in Baazaar
                              <div className="listing-button-container">
                                <Button size={1.4} fullWidth onClick={handleEdit} color={gameConfig.gotchiverseTheme}>
                                  List Now
                                </Button>
                              </div>
                            </div>
                          )}
                          <p className="token-id">Token ID: {nftData.tokenId}</p>
                        </div>
                      )}

                      {hasBaazaar && isOwner && (baazaarData ?? editing) && !loading && (
                        <>
                          {displayBaazaar() && (
                            <div className="is-owner">
                              <div className="list-links">
                                <p className="nft-list">
                                  Listed in <a className="baasaar-link">Baazaar</a> for
                                </p>
                                <p className="token-id">Token ID: {nftData.tokenId}</p>
                              </div>
                              <div className="price-edit-container">
                                <div className="price-edit">
                                  <div className={`price-inputbox ${editing ? 'editing' : ''}`}>
                                    <div className="icon">
                                      <Image alt="" src={GhstIcon} />
                                    </div>
                                    {!editing && <span className="price-value">{priceValue}</span>}
                                    {editing && (
                                      <input className="price-input" type="number" value={priceValue} min={0} onChange={handlePriceChange} />
                                    )}
                                    {!editing && (
                                      <button className="edit-button" onClick={handleEdit}>
                                        <div className="icon">
                                          <Image alt="" src={EditIcon} />
                                        </div>
                                      </button>
                                    )}
                                    {editing && (
                                      <button className={`confirm-button ${confirmed ? '' : 'no-conf'}`} onClick={handleListing}>
                                        <div className="inner">
                                          <div className="icon">
                                            <Image alt="" src={PriceCheckMark} />
                                          </div>
                                        </div>
                                      </button>
                                    )}
                                  </div>
                                  {editing && baazaarData && (
                                    <button className="nft-list-link" onClick={handleCancelListing}>
                                      Unlist
                                    </button>
                                  )}
                                </div>
                                {editing && (
                                  <div className="price-confirm">
                                    <button className="price-confirm-button" onClick={() => setConfirmed(true)}>
                                      <div className="icon">
                                        <Image alt="" src={confirmed ? PriceConfirmIcon : PriceNoconfirmIcon} />
                                      </div>
                                    </button>
                                    <span className="price-confirm-info">Confirm price: {priceValue} GHST</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {!isApproved && editing && (
                            <div className="approve-container">
                              <div className="info-container">
                                <div className="icon">
                                  <Image alt="" src={AavegotchiMascot} />
                                </div>
                                <div className="text">
                                  <span>Please </span>
                                  <a
                                    href="https://polygonscan.com/address/0x86935F11C86623deC8a25696E1C19a8659CbF95d"
                                    className="contract-link"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Approve Contract
                                  </a>
                                  <span> to List in Baazaar </span>
                                </div>
                              </div>
                              <Button
                                size={1.8}
                                color="success"
                                // disabled={!!currentlyloading || !toBeFetched}
                                onClick={async () => await onContractApprove()}
                              >
                                Approve
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={`shadow-box ${baazaarData ? 'button-include' : ''}`}>
                <Image alt="" src={NftShine} layout="fill" />
              </div>
            </div>
          )}
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
};
