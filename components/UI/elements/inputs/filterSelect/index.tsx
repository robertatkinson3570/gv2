/* eslint-disable @typescript-eslint/indent */
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useEffect, useState } from 'react';
import { CheckIcon, DownChevronIcon } from '../../svgs';
import styles from './styles';
import { getThemeColor } from 'helpers/functions';
import { useGame } from 'contexts/GameContext';

interface Props {
  filters: Array<{
    name: string;
    value: string;
  }>;
  width?: string;
  onChange?: (state) => void;
}

export const FilterSelect = ({ filters, width = '14rem', onChange }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const [open, setOpen] = useState<boolean>(false);
  const { click } = useAavegotchiSound();
  const [checked, setChecked] = useState({});
  const filterCount = filters.length;
  const selCount = filters.reduce((count, { value }) => count + (checked[value] === true ? 1 : 0), 0);

  useEffect(() => {
    const check = {};
    filters.forEach(({ value }) => {
      check[value] = true;
    });
    setChecked(check);
  }, []);

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(checked);
    }
  }, [checked]);

  return (
    <>
      <div className={`select-container ${gameConfig.gotchiverseTheme}`} style={{ minWidth: width, maxWidth: width }}>
        <span
          className="value"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {selCount === filterCount ? 'Filters (All)' : `Filters (${selCount})`}
          <span className="indicator">
            <DownChevronIcon fill={getThemeColor('', 400)} />
          </span>
        </span>
        {open && (
          <>
            <div className="dropdown">
              <div
                className={`option ${selCount === filterCount ? 'checked' : ''}`}
                onClick={() => {
                  click();

                  const flag = selCount !== filterCount;
                  const checked = {};
                  filters.forEach(({ value }) => {
                    checked[value] = flag;
                  });
                  setChecked(checked);
                }}
              >
                <span>All</span>
                <CheckIcon
                  checked={selCount === filterCount}
                  fill={selCount === 0 ? 'var(--col-grey-400)' : selCount === filterCount ? getThemeColor('', 200) : getThemeColor('', 400)}
                />
              </div>
              {filters.map(({ name, value }, index) => (
                <div
                  className={`option ${checked[value] ? 'checked' : ''} sub`}
                  key={index}
                  onClick={() => {
                    click();
                    setChecked({
                      ...checked,
                      [value]: !checked[value],
                    });
                  }}
                >
                  <span>{name}</span>
                  <CheckIcon checked={checked[value]} fill={checked[value] ? getThemeColor('', 200) : getThemeColor('', 400)} />
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
