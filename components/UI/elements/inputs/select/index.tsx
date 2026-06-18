import styles from './styles';
import { useState } from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { DownChevronIcon } from '../../svgs';

interface Props {
  options: Array<{ value: string; name: string }>;
  onSelect: (value: string) => void;
  value: string;
  width?: string;
  theme?: 'pink' | 'info';
}

export const Select = ({ options, onSelect, value, theme = 'pink', width = '14rem' }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { click } = useAavegotchiSound();

  return (
    <>
      <div className={`select-container ${theme === 'info' ? theme : ''}`} style={{ minWidth: width, maxWidth: width }}>
        <span
          className="value"
          onClick={() => {
            setOpen((prevState) => !prevState);
            click();
          }}
        >
          {options.find((option) => option.value === value)?.name}
          <span className="indicator">
            <DownChevronIcon fill={`var(--col-${theme}-400)`} />
          </span>
        </span>
        {open && (
          <div className="dropdown">
            {options.map((option, i) => (
              <div
                className="option"
                key={i}
                onClick={() => {
                  click();
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
