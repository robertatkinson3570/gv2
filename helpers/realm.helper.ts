import _, { keyBy } from 'lodash';
import { AllowedTokens, AllowedTokenTypes, TokenCounters } from 'types';

export function convertAlchemicaItems(scene) {
  // replace all pickups
  const allPickupTiles = scene.pickupsLayer.getTilesWithin(0, 0, scene.map.width, scene.map.height);
  const allAlchemicaSizzle = [];
  allPickupTiles.forEach((tile) => {
    if (tile.index > 0) {
      let label;
      switch (tile.index) {
        case 2:
          label = 'alpha';
          break;
        case 8:
          label = 'fomo';
          break;
        case 14:
          label = 'fud';
          break;
        case 20:
          label = 'kek';
          break;
        default:
          label = 'deleteMe';
          break;
      }
      const item = { label, x: tile.x * 32, y: tile.y * 32 - 64 };
      allAlchemicaSizzle.push(item);
    }
  });
  // // console.log("allAlchemicaSizzle", allAlchemicaSizzle);
  // const JSONdata = JSON.stringify(allAlchemicaSizzle);
  // const blob = new Blob([JSONdata], { type: "text/plain;charset=utf-8" });
  // const fileName = `alchemicaSizzle.json`;
  // saveAs(blob, fileName);
}

export const getZeroTokens = (tokens?: AllowedTokenTypes[]): TokenCounters => {
  const zeros = {};
  for (const token of AllowedTokens) zeros[token] = 0;
  return tokens ? _.pick(zeros, tokens) : zeros;
};

export function convertParcels(scene) {
  // replace all pickups
  const allParcelTiles = scene.parcelLayer.getTilesWithin(0, 0, scene.map.width, scene.map.height);
  const parcelPositions = [];
  allParcelTiles.forEach((tile) => {
    if (tile.index > 0) {
      const item = { x: tile.x, y: tile.y };
      parcelPositions.push(item);
    }
  });
  // console.log('parcelPositions', parcelPositions);
}
export const _isSafeURL = (susURL: string) => {
  try {
    const url = new URL(susURL);
    return url.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

export const getStaticAssetPrefix = (): string => {
  switch (process.env.APP_ENV) {
    case 'production':
      return 'https://verse-static.aavegotchi.com/';
    case 'staging':
      return 'https://beta-verse-static.aavegotchi.com/';
    default:
      return '/';
  }
};
