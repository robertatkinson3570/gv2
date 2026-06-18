import { useGame } from 'contexts/GameContext';
import styles from './styles';

interface Props {
  children: React.ReactNode;
  hideSides?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  padding?: number;
  secondaryColor?: boolean;
  title?: string | { value: string; fontSize: string; width?: string; padding?: string };
  inheritWidth?: boolean;
  inheritHeight?: boolean;
  borrowedColor?: boolean;
  isChatBtn?: boolean;
  isButton?: boolean;
  isSidePanelFrame?: boolean;
  isSetting?: boolean;
  isWalletToggle?: boolean;
  isThin?: boolean;
  isSmall?: boolean;
  isWalletButton?: boolean;
  isLightBg?: boolean;
  isItemShop?: boolean;
  useTheme?: boolean;
  color?: string;
}

export const IndentedPanel = ({
  children,
  hideSides,
  padding = 1.6,
  secondaryColor,
  title,
  inheritWidth,
  inheritHeight,
  borrowedColor,
  isChatBtn = false,
  isSidePanelFrame = false,
  isSetting = false,
  isWalletToggle = false,
  isLightBg = false,
  isThin = false,
  isSmall = false,
  isItemShop = false,
  isWalletButton = false,
  useTheme = false,
  color = '',
}: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();

  const getMargin = (hasTitle: boolean) => {
    if (isSetting) return '0rem';
    if (isItemShop) return '0 0 0 1rem';
    if (hideSides?.left) return `0 ${padding}rem 0 0`;
    if (hideSides?.right) return `0 0 0 ${padding}rem`;
    return `${hasTitle ? padding : 0} ${padding}rem 0`;
  };

  return (
    <>
      <div className={`${isSidePanelFrame ? 'side-outer' : 'normal-outer'} ${isItemShop ? 'item-shop' : ''}`}>
        <div className={`${isSidePanelFrame ? 'outer-cap left' : ''}`} />
        <div
          className={`box-holder ${isSmall ? 'small' : ''} ${isChatBtn ? 'chat-btn' : ''} ${isThin ? 'thin' : ''} ${
            !hideSides?.top ? 'has-top' : ''
          } ${!hideSides?.bottom ? 'has-bottom' : ''} ${secondaryColor ? 'secondary' : ''} ${borrowedColor ? 'borrowed' : ''}   ${
            useTheme ? gameConfig.gotchiverseTheme : ''
          } ${isSmall ? 'small' : ''} ${isWalletButton ? 'wallet-button' : ''} ${isWalletToggle ? 'wallet-toggle' : ''} ${color} ${
            isSetting ? 'setting-menu' : ''
          } ${isLightBg ? 'light-bg' : ''} `}
          style={{
            margin: getMargin(!!title),
            width: inheritWidth ? '100%' : 'fit-content',
            height: inheritHeight ? '100%' : 'fit-content',
          }}
        >
          {!!title && (
            <div
              className={`title-panel ${isSidePanelFrame ? 'side-title' : ''}`}
              style={
                typeof title !== 'string'
                  ? { ...(title.width ? { minWidth: '0rem', width: title.width } : {}), ...(title.padding ? { padding: title.padding } : {}) }
                  : {}
              }
            >
              <h2 style={{ fontSize: typeof title === 'string' ? '4.2rem' : title.fontSize }}>{typeof title === 'string' ? title : title.value}</h2>
            </div>
          )}
          {!hideSides?.left && (
            <div
              className={`left-cap cap ${isChatBtn ? 'chat-btn' : ''} ${isSetting ? 'setting-menu' : ''}`}
              style={{ width: `${isWalletToggle ? 1 : padding}rem`, left: `-${isWalletToggle ? 1 : padding}rem` }}
            ></div>
          )}
          <div
            className="content"
            style={{
              padding: `${isSmall ? 0.2 : title ? padding + 1.2 : isWalletToggle ? 1 : padding}rem 0rem ${
                isSmall ? 0.2 : isWalletToggle ? 0.7 : isItemShop ? 0 : padding
              }rem`,
              width: inheritWidth ? '100%' : 'fit-content',
              minHeight: inheritHeight ? '100%' : 'auto',
            }}
          >
            {children}
          </div>
          {!hideSides?.right && (
            <div
              className={`right-cap cap  ${isChatBtn ? 'chat-btn' : ''} ${isSetting ? 'setting-menu' : ''}`}
              style={{ width: `${isWalletToggle ? 1 : padding}rem`, right: `-${isWalletToggle ? 1 : padding}rem` }}
            ></div>
          )}
        </div>
        <style jsx>{styles}</style>
      </div>
    </>
  );
};
