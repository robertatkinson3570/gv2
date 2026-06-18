import styles from './styles';
import { useEffect, useState } from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { SortDirectionIcon, DownChevronIcon } from '../../svgs';
import { SortOption } from 'types';
import { getThemeColor } from 'helpers/functions';
import { useGame } from 'contexts/GameContext';

interface Props {
  options: SortOption[];
  selected: SortOption;
  placeholder?: string;
  width?: string;
  size?: string;
  useTheme?: boolean;
  color?: string;
  fontFamily?: 'Pixelar' | 'Kimberley Rg';
  fontSize?: string;
  shadow?: boolean;
  onSelect: (name: string, value: string, direction: 'asc' | 'desc') => void;
}

export const SortSelect = ({
  options,
  selected,
  width = '14rem',
  size = '2.4rem',
  placeholder = '',
  useTheme,
  color = '',
  fontFamily = 'Pixelar',
  fontSize = '2rem',
  shadow = true,
  onSelect,
}: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { click } = useAavegotchiSound();
  const [direction, setDirection] = useState({});
  const [{ gameConfig }] = useGame();

  useEffect(() => {
    if (selected) {
      const dir = {};
      options.forEach(({ value, direction }) => {
        dir[value] = direction;
        if (value === selected?.value) {
          dir[value] = selected.direction === 'asc' ? 'desc' : 'asc';
        }
      });
      setDirection(dir);
    }
  }, [selected]);

  return (
    <>
      <div
        className={`select-container clickable ${useTheme ? gameConfig.gotchiverseTheme : ''} ${color} ${shadow ? 'shadow' : ''}'}`}
        style={{ minWidth: width, maxWidth: width, fontSize: size }}
        onClick={() => setOpen(!open)}
      >
        <span className="value" style={{ fontFamily, fontSize }}>
          {selected === undefined ? placeholder : `${selected.name} (${selected.direction === 'asc' ? 'Asc' : 'Desc'})`}
          <span className="indicator">
            <DownChevronIcon fill={`var(--col-${useTheme ? getThemeColor(color) : 'pink'}-400)`} />
          </span>
        </span>
        {open && (
          <>
            <div className="dropdown" style={{ fontFamily, fontSize }}>
              {options.map(({ name, value }, index) => (
                <div
                  className={`option ${value === selected?.value ? 'active' : ''}`}
                  key={index}
                  onClick={() => {
                    click();
                    onSelect(name, value, direction[value]);
                    setDirection({
                      ...direction,
                      [value]: direction[value] === 'asc' ? 'desc' : 'asc',
                    });
                    setOpen(false);
                  }}
                >
                  <span>{name}</span>
                  <SortDirectionIcon
                    direction={direction[value]}
                    fill={
                      value === selected?.value
                        ? `var(--col-${useTheme ? getThemeColor(color) : 'pink'}-200)`
                        : `var(--col-${useTheme ? getThemeColor(color) : 'pink'}-400)`
                    }
                  />
                </div>
              ))}
            </div>
            <div className="overlay" onClick={() => setOpen(false)} />
          </>
        )}
      </div>

      <style jsx>{styles}</style>
    </>
  );
};
