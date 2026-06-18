export const themeBlack = '#1E1E1E';
export const themeLightGray = '#F2F2F2';

export const themeLightBlue = '#98FCFF';
export const themeLightCyan = '#81CDCF';
export const themeCyan = '#04B7BC';
export const themeDarkCyan = '#219497';
export const themeDarkPurple = '#4C1F7D';
export const themePurple = '#5100B1';
export const themeHotPurple = '#7217F4';
export const themeRed = '#F741F0';
export const themeYellow = '#fffa65';
export const themeDarkYellow = '#E5DF40';
export const themeHotPink = '#FA34F3';
export const themeDarkPink = '#CF15F9';
export const themeHotTeal = '#37F4F1';

export const buttonActive = themeBlack;
export const linkColor = '#b6509e';
export const buttonHover = '';
export const buttonInactive = '#d1d8e0';

export const themeDarkGreen = '#219497';

export const commonColor = '#48ABFF';
export const uncommonColor = '#8064FF';
export const rareColor = '#FF96FF';
export const legendaryColor = '#51FFA8';

export const twitterLogoBlue = '#00acee';
export const twitterDarkBlue = '#0084b4';

export const fontSizeXtraSmall = '1.0rem';
export const fontSizeSmall = '1.4rem';
export const fontSizeMedSmall = '1.6rem';
export const fontSizeMedium = '2.0rem';
export const fontSizeLarge = '2.4rem';
export const fontSizeXtraLarge = '3.2rem';
export const fontSizeMidMassive = '3.7rem';
export const fontSizeMassive = '4.8rem';
export const fontSizeGigantic = '6.4rem';
export const fontSizeUltra = '7.8rem;';

export const containerBG = 'rgba(76,31,125,0.9)';

export function orderColor(orderType: string) {
  if (orderType === 'buy') return themeCyan;
  else if (orderType === 'sell') return themeRed;
  else return 'white';
}
