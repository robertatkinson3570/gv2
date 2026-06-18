import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';
import Image from 'next/image';
import { useGame } from 'contexts/GameContext';
import { useMemo } from 'react';

type ColorVariant = '100' | '200' | '250' | '300' | '320' | '340' | '400' | '500' | '600' | '700' | '750' | '800' | '850' | '900';

interface Props {
  size?: number;
  img: string;
  onClick: () => void;
  color?: string;
  hoverColor?: string;
  colorVariant?: ColorVariant;
  hoverColorVariant?: ColorVariant;
  disableSound?: boolean;
  text?: string;
  isAlienFont?: boolean;
  active?: boolean;
  clipPathType?: 'default' | 'triangle';
}

export const ActionButton = ({
  size = 3.2,
  img,
  onClick,
  color,
  hoverColor = 'pink',
  colorVariant = '400',
  hoverColorVariant = '300',
  disableSound,
  text = '',
  isAlienFont = false,
  active = false,
  clipPathType = 'default',
}: Props): JSX.Element => {
  const { click } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (!disableSound) click();
    onClick();
  };
  const colorValue = useMemo(() => (color ? `var(--col-${color}-${colorVariant})` : 'var(--col-pink-400)'), [color, colorVariant]);
  const hoverColorValue = useMemo(
    () => (hoverColor ? `var(--col-${hoverColor}-${hoverColorVariant})` : colorValue),
    [hoverColor, hoverColorVariant, colorValue],
  );

  return (
    <>
      <button
        className={`${text ? 'text-button-wrapper' : 'button-wrapper'} ${color}`}
        style={{ fontSize: `${size}rem` }}
        onClick={handleClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="outer">
          <div className="cap left" />
          {clipPathType === 'default' && <div className={`${text ? '' : 'cap right'}`} />}
          <div className={`clip-path-${clipPathType} ${!text ? 'inner' : 'text-button-inner'}`}>
            <span className="img-container">
              <Image alt="" src={img} layout="fill" />
            </span>
            <h2 className={`${gameConfig.gotchiverseTheme} ${isAlienFont ? 'alien' : ''}`}> {text ?? ''} </h2>
          </div>
        </div>
      </button>
      <style jsx>{`
        .text-button-wrapper,
        .button-wrapper {
          --color: ${active ? hoverColorValue : colorValue};
          --hover-color: ${hoverColorValue};
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};
