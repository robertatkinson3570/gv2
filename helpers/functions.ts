import {
  OnChainFudIcon,
  FudIcon,
  OnChainFomoIcon,
  FomoIcon,
  OnChainAlphaIcon,
  AlphaIcon,
  OnChainKekIcon,
  KekIcon,
  CandyFudIcon,
  CandyFomoIcon,
  CandyAlphaIcon,
  CandyKekIcon,
  GltrIcon,
  KekIconSm,
  AlphaIconSm,
  FudIconSm,
  FomoIconSm,
} from 'assets/icons';
import GlobalState from 'contexts/GlobalState';
import { GAME_CONFIG } from 'shared_code/constants/const.game';
// import Aaltar from 'public/animations/installations/aaltar.png';
// import AaltarJson from 'public/animations/installations/aaltar.json';
// import Wall from 'public/animations/installations/waall.png';
// import WallJson from 'public/animations/installations/waall.json';
import { DiamondName } from 'web3/contract';

export const getAlchemicaIcon = (alchemica: string, theme?: string): string => {
  const alchName = alchemica.toLowerCase();
  switch (alchName) {
    case 'fud':
      return theme !== 'halloween' ? FudIcon : CandyFudIcon;
    case 'fomo':
      return theme !== 'halloween' ? FomoIcon : CandyFomoIcon;
    case 'alpha':
      return theme !== 'halloween' ? AlphaIcon : CandyAlphaIcon;
    case 'kek':
      return theme !== 'halloween' ? KekIcon : CandyKekIcon;
  }
};

export const getStripName = (name: string): string => {
  return `${name.replace('Level', '').replace(/[0-9]/, '').replace('Alchemical ', '')}`;
};

export const getOnChainAlchemicaIcon = (alchemica: string | number, small?: boolean): string => {
  switch (alchemica) {
    case 0:
    case 'fud':
    case 'FUD':
      return small ? FudIconSm : OnChainFudIcon;
    case 1:
    case 'fomo':
    case 'FOMO':
      return small ? FomoIconSm : OnChainFomoIcon;
    case 2:
    case 'alpha':
    case 'ALPHA':
      return small ? AlphaIconSm : OnChainAlphaIcon;
    case 3:
    case 'kek':
    case 'KEK':
      return small ? KekIconSm : OnChainKekIcon;
    case 4:
    case 'gltr':
    case 'GLTR':
      return GltrIcon;
  }
};

export const blockPropagation = (e): void => e.stopPropagation();

export const getThemeColor = (color?: string, gradient?: number): string => {
  let theme = 'pink';
  if (GlobalState?.GAME?.state?.gameConfig?.gotchiverseTheme === 'halloween') {
    theme = 'halloween';
  } else if (color?.length > 0) {
    theme = color;
  }
  return gradient ? `var(--col-${color ?? theme}-${gradient})` : theme;
};

export const formatDigit = (number: number) => {
  return number >= 10 ? number.toString() : `0${number}`;
};

export const formatTime = (time: string): string => {
  const _time = Number(time);
  const minutes = Math.floor(_time / 60);
  const seconds = _time - minutes * 60;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
};

export const getActiveVarColor = (colorVar: 'info' | 'pink', state: boolean): string => {
  return `var(--col-${colorVar}-${state ? '2' : '4'}00)`;
};
// export const getInstallationSprite = (type: number): string => {
//   switch (type) {
//     case 0:
//       return Aaltar;
//     case 99:
//       return Wall;
//     default:
//       return Aaltar;
//   }
// };

// export const getInstallationJSON = (type: number): typeof AaltarJson => {
//   switch (type) {
//     case 0:
//       return AaltarJson;
//     case 99:
//       return WallJson;
//     default:
//       return AaltarJson;
//   }
// };

function convertToCSV(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  if (array[0]) {
    const keys = Object.keys(array[0]);
    str += keys.join(',') + '\r\n';
  }
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

export function getIndentedProps(str, obj): string {
  const props = str.split('.'); // remove square brackets and split into an array
  let value = obj;
  for (let i = 0; i < props.length; i++) {
    value = value[props[i]];
  }
  return value;
}

export function exportCSVFile(json, fileTitle: string): void {
  // Convert Object to JSON
  const jsonObject = JSON.stringify(json);
  const csv = convertToCSV(jsonObject);
  const exportedFilenmae = fileTitle + '.csv' || 'export.csv';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilenmae);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const nFormatter = (num: number, digits: number) => {
  if (Number(num) === 0) return 0;
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : Number(num).toFixed(digits);
};

export const getAvailableAmountsString = (alchemica) => {
  const types = ['FUD', 'FOMO', 'ALPHA', 'KEK'];
  let stringAmounts = '';

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (alchemica[i]) stringAmounts += `${alchemica[i]} ${type} `;
  }
  return stringAmounts;
};

export function lendingPeriod(seconds: number): string {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';

  if (d > 7) {
    return dDisplay;
  }

  if (d <= 0 && h <= 0 && m <= 0 && s <= 0) return 'Now';

  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const expiresIn = (timeAgreed, period): string => {
  const endTime = timeAgreed + period;
  const seconds = endTime - Date.now() / 1000;

  console.log('seconds:', seconds);

  return lendingPeriod(seconds);
};

export const getContractFromRecipeType = (type: 'INSTALLATION' | 'TILE'): DiamondName => {
  return type === 'INSTALLATION' ? 'installationDiamond' : 'tileDiamond';
};

export const calculateTimeFromBlocks = (blocks: number): string | null => {
  if (blocks <= 0) return null;
  const seconds = blocks * 2.25 || 1;

  const secondsPerDay = 86400;
  const days = Math.floor(seconds / secondsPerDay);

  const secondsPerHour = 3600;
  const hours = Math.floor((seconds % secondsPerDay) / secondsPerHour);

  const secondsPerMinute = 60;
  const minutes = Math.floor((seconds % secondsPerHour) / secondsPerMinute);

  const remainingSeconds = Math.floor(seconds % secondsPerMinute);

  if (days) return `~ ${days} days${hours ? ` ${hours} hrs ` : ' '}${minutes ? `${minutes} mins` : ''}`;
  if (hours) return `~ ${hours} hrs${minutes ? ` ${minutes} mins ` : ' '}`;
  if (minutes) return `~ ${minutes} mins${remainingSeconds ? ` ${remainingSeconds} secs ` : ' '}`;
  if (remainingSeconds) return `~ ${remainingSeconds} secs`;
  return null;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
