import { scene } from 'components/controllers/SceneController';
import _ from 'lodash';
import {
  NFTDisplayData,
  NFTDisplayPreview,
  NFTDisplayMetadata,
  NFTDisplayServerData,
  NFTIdData,
  NFTDisplayImg,
  NFTBaazaarData,
  NetworkNames,
  ContractType,
} from 'types';
import AssetsController from 'components/controllers/assetsController';
import GameController from 'components/controllers/GameController';
import { MoralisController } from 'components/controllers/moralisController';
import { getAllDataById, getGlobalInstallationPosition, getTypeById, isOwnedById } from 'helpers/installations.helper';
import Default from 'public/images/nft/140_default.png';
import DefaultGolden from 'public/images/nft/144_default.png';
import { getInstallationIdDataById } from 'shared_code/utils/shared.utils.installations';
import { convertInlineSVGToBlobURL, customiseSvg, CustomiseOptions } from 'helpers/aavegotchi';
import { getContract } from 'web3/contract';
import { Signer, utils } from 'ethers';
import AnimationsController from 'components/controllers/animationsController';
import GlobalState from 'contexts/GlobalState';

export interface NFTDisplayInterface {
  set: (installationId: string, serverData: NFTDisplayServerData) => void;
  displayPhaserImage: (nft: NFTDisplayImg, installationId: string) => Promise<Phaser.GameObjects.Image>;
  getNFTIdByInstallationId: (installationId: string) => string;
  setPreview: (nft: NFTDisplayPreview) => void;
  getMetadataURI: (id: string, uri: string) => Promise<NFTDisplayMetadata>;
  updateMetadata: (nft: NFTDisplayData, width?: number, height?: number) => Promise<void>;
  getDefaultImg: (installationId: string) => string;
  clearNFTDisplay: (dispatch) => void;
  getDataById: (id: string) => NFTIdData;
  getConfigById: (id: string) => any; // for now any;
  checkFormat: (id: string, metadata: NFTDisplayMetadata, updateThumbnail?: boolean, width?: number, height?: number) => NFTDisplayMetadata;
  purchaseCancelListing: (network: NetworkNames, signer: Signer, action: 'execute' | 'cancel', baazaarData: NFTBaazaarData) => any;
  setListing: (currentAccount: string, network: NetworkNames, signer: Signer, nftId: string, priceValue: string) => any;
}
const byId = {};
const isLocal = ['local'].includes(process.env.APP_ENV);

const set = (installationId: string, data: NFTDisplayData): void => {
  console.log('@setNFTDisplayData:id', installationId, data);

  const serverData: NFTDisplayServerData = {
    id: data.id,
    tokenUri: data.tokenUri,
    image: data.metadata.image_data ? undefined : data.metadata.image,
    isSVG: !!data.metadata.image_data,
  };

  if (!serverData.isSVG && serverData.image?.includes('image/proxy?url=')) {
    serverData.image = serverData.image.split('image/proxy?url=')[1].split('&')[0];
  }
  // set on server set on locale
  GameController.sendData('installations', 'set-nft', { installationId, data: serverData });
};

const setPreview = async ({ active, installationId, serverData, nftData, isOwner }): Promise<void> => {
  // Preview can be set by ServerData or Moralis data from gallery
  // console.log('@setPreview:data', active, installationId, serverData, nftData);
  isOwner = isOwner || !!isOwnedById(installationId, true);
  GlobalState.UI.dispatch({ type: 'UPDATE_NFT_DISPLAY', nftDisplayState: { open: active, isOwner, installationId, serverData, nftData } });
};

const checkFormat = (id: string, metadata: NFTDisplayMetadata, updateThumbnail?: boolean, width?: number, height?: number): NFTDisplayMetadata => {
  const idData = getDataById(id);
  let thumbnail, video;

  const isVideo =
    metadata?.fileType === 'video/mp4' || metadata?.attributes?.find((x) => x.trait_type === 'File MIME Type')?.value === 'video/mp4' || false;
  if (isVideo) {
    video = metadata.image;
    thumbnail = metadata.thumbnail || metadata?.attributes?.find((x) => x.trait_type === 'Thumbnail Link')?.value || '';
  }

  if (isVideo && thumbnail && updateThumbnail) {
    metadata.video = video;
    metadata.image = thumbnail;
  }
  // apply proxy
  if (!isLocal) {
    const config = MoralisController.assetsConfig[idData.collectionId];
    // if (metadata.video && config.prefix && !metadata.video.includes('/image/proxy?url=')) metadata.video = config.prefix + metadata.video;
    if (metadata.image && config.prefix && !metadata.image.includes('/image/proxy?url=')) {
      metadata.image = config.prefix + metadata.image + (width && height ? `&width=${width}&height=${height}` : '');
    }
  }
  return metadata;
};

const updateMetadata = async (nft: NFTDisplayData, width?: number, height?: number) => {
  if (!nft?.tokenUri) return;
  nft.tokenUri = nft.tokenUri.replace('https://aavegotchi.com/', 'https://app.aavegotchi.com/');

  const assets = MoralisController.assetsConfig[nft.collectionId];
  if (!nft.metadata?.image && assets?.image) nft.metadata.image = assets.image + nft.tokenId;
  else {
    const metadata = await getMetadataURI(nft.id, nft.tokenUri);
    nft.metadata = metadata;
  }

  // quick and dirty replace for mp4 format
  checkFormat(nft.id, nft.metadata, true, width, height);
};

const getNFTIdByInstallationId = (id: string): string => {
  const installationContainer = scene.installationGroup.get(id);
  return installationContainer?.getData('nftId');
};

const getSVGImageById = async (id: string): Promise<string> => {
  const idData = getDataById(id);
  const metadata = await getMetadataURI(id, MoralisController.assetsConfig[idData.collectionId].metadata + idData.tokenId);
  if (metadata.image) return metadata.image;
};

// return collection config local object from nftDisplay
const getConfigById = (id: string) => {
  return MoralisController.assetsConfig[id.split('_')[0]];
};

const purchaseCancelListing = async (network: NetworkNames, signer: Signer, action: 'execute' | 'cancel', baazaarData: NFTBaazaarData) => {
  // console.log('@purchaseCancelListing:baazaarData', baazaarData);
  const contract = await getContract(network, signer, 'aavegotchiDiamond', true);
  const contractCall = `${action}${baazaarData.contractType}Listing`;
  const data = [baazaarData.listingId];
  if (action === 'execute' && baazaarData.contractType === 'ERC1155') data.push(1, baazaarData.priceInWei);

  // console.log('@purchaseCancelListing:call', contractCall, ...data);
  let tx;
  try {
    tx = await contract[contractCall](...data);
    const transaction = await tx.wait();
    return transaction;
  } catch (error) {
    return error;
  }
};

const setListing = async (currentAccount: string, network: NetworkNames, signer: Signer, nftId: string, priceValue: string) => {
  console.log('@setListing:nftId', nftId);
  const idData = getDataById(nftId);
  const contract = await getContract(network, signer, 'aavegotchiDiamond', true);

  const contractCall = idData.contractType === 'ERC721' ? 'addERC721Listing' : 'setERC1155Listing';
  const data = [idData.tokenAddress, idData.tokenId];
  if (idData.contractType === 'ERC1155') data.push('1');

  console.log('@setListing:call', contractCall, ...data, priceValue);

  let tx;
  try {
    tx = await contract[contractCall](...data, utils.parseEther(priceValue));
    const transaction = await tx.wait();
    return transaction;
  } catch (error) {
    return error;
  }
};

const getFilterByInstallationId = (installationId: string) => {
  const type = getTypeById(installationId);
  return `filter_${type.name.split(' - ')[1]}`;
};

const displayPhaserImage = async (nft: NFTDisplayImg, installationId: string): Promise<Phaser.GameObjects.Image> => {
  // display nft img if nftId is set.
  // console.log('@NFTDisplay.displayPhaserImage', installationId, nft);

  const installationContainer = scene.installationGroup.get(installationId);
  if (!installationContainer) return;
  const frame = await getPhaserFrame(installationId);
  if (!frame) return;

  const { width, height } = frame.dimensions;

  if (nft?.id) {
    const idData = NFTDisplay.getDataById(nft.id);
    const config = MoralisController.assetsConfig[idData.collectionId];

    if (nft.isSVG) {
      nft.image = await getSVGImageById(nft.id);
    } else {
      if (!isLocal && config.prefix && !nft.image?.includes('/image/proxy?url=')) {
        nft.image = config.prefix + nft.image + `&width=${width}&height=${height}`;
      }
    }
    if (config?.suffix) nft.image += config.suffix;

    const check = await AssetsController.checkTexture(nft.id, nft.image, idData.collectionId === '0' ? 'svg' : 'image');
    // console.log('@displayPhaserImage:check', check);
    if (!check) return;

    installationContainer.data?.set('nft.id', nft.id);
    installationContainer.getByName('nft.img')?.destroy();

    const img = scene.add.image(0, 0, nft.id);

    let dominantSide = img.width > img.height ? 'width' : 'height';
    if (img.width === img.height) dominantSide = frame.orientation === 'horizontal' ? 'width' : 'height';
    if (config.isCover) dominantSide = img.width < img.height ? 'width' : 'height';

    img.setScale(Math.max(frame.dimensions[dominantSide] / img[dominantSide]));
    installationContainer.add(img);

    // const filterName = getFilterByInstallationId(installationId);
    // const filter = scene.add.sprite(0, 0, filterName, 0);
    // filter.setName('nft.filter');
    // AnimationsController.play(filter, filterName);
    // installationContainer.add(filter);

    const mask = frame.mask.createGeometryMask();
    img.setName('nft.img');
    img.setMask(mask);

    // fill the container but keep aspect ratio.
    return img;
  } else {
    const type = getTypeById(installationId);
    const defaultImage = scene.add.image(0, -1, type.itemId + '_default');
    defaultImage.setOrigin(0.5);
    defaultImage.setDisplaySize(frame.dimensions.width, frame.dimensions.height);
    defaultImage.setName('nft.img');
    installationContainer.add(defaultImage);
    return defaultImage;
  }
};

const getPhaserFrame = async (installationId: string) => {
  const installationData = await getAllDataById(installationId);
  const installationContainer = scene.installationGroup.get(installationId);

  if (!installationContainer || !installationData?.typeData) return;
  let frame = installationContainer.getByName('nft.frame');
  const { width, height } = installationData.spriteMetadata.jsonData.nftFrame;
  const globalPosition = getGlobalInstallationPosition(installationId);
  const orientation = width > height ? 'horizontal' : 'vertical';
  if (!frame) {
    const rect = new Phaser.Geom.Rectangle(
      globalPosition.x + installationData.spriteMetadata.jsonData.nftOffset.x,
      globalPosition.y + installationData.spriteMetadata.jsonData.nftOffset.y,
      width,
      height,
    );
    frame = scene.add.graphics();
    frame.fillRectShape(rect).fillStyle(0xffffff);
    frame.setName('nft.frame');
    installationContainer?.add(frame);
  }

  return { mask: frame, dimensions: { width, height }, orientation };
};

const getDefaultImg = (installationId: string): string => {
  const idData = getInstallationIdDataById(installationId);
  return Number(idData.itemId) > 140 ? DefaultGolden : Default;
};

const getMetadataURI = async (id: string, uri: string) => {
  if (!byId[id]) {
    byId[id] = await fetch(uri)
      .then(async (response) => await response.json())
      .then((data) => {
        if (!data.image && data.image_data) {
          const options: CustomiseOptions = { animate: true };
          data.image = convertInlineSVGToBlobURL(customiseSvg(data.image_data, options));
        }
        return data;
      });
  }
  return byId[id];
};

const getDataById = (nftId: string): NFTIdData => {
  // TODO: verify
  const split = nftId.split('_');
  const contractType = split[2] === '0' ? 'ERC721' : 'ERC1155';
  return {
    id: nftId,
    collectionId: split[0],
    tokenAddress: MoralisController.getCollectionById(split[0]).contractAddress,
    chain: split[1],
    contractType: contractType as ContractType,
    tokenId: split[3],
  };
};

const clearNFTDisplay = (dispatch): void => {
  dispatch({ type: 'UPDATE_NFT_DISPLAY', nftDisplayState: { open: false } });
  dispatch({
    type: 'UPDATE_NFT_DISPLAY_ADMIN',
    nftDisplayAdminState: { open: false, installationId: undefined },
  });
};

export const NFTDisplay: NFTDisplayInterface = {
  set,
  getDataById,
  displayPhaserImage,
  getNFTIdByInstallationId,
  setListing,
  purchaseCancelListing,
  setPreview,
  getConfigById,
  updateMetadata,
  getMetadataURI,
  getDefaultImg,
  clearNFTDisplay,
  checkFormat,
};
