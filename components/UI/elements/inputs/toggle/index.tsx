import { useGame } from 'contexts/GameContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';

interface Props {
  checked: boolean;
  onChange: () => void;
  isParcel?: boolean;
  size?: number;
  useTheme?: boolean;
  color?: string;
}

export const Toggle = ({ checked, onChange, isParcel = false, size = 1, useTheme, color = '' }: Props): JSX.Element => {
  const { click, back } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const handleChange = () => {
    checked ? back() : click();
    onChange();
  };

  return (
    <>
      <div className={`${isParcel ? 'parcel' : ''} ${useTheme ? gameConfig.gotchiverseTheme : ''} ${color}`} style={{ display: 'flex' }}>
        <label className={`switch${checked ? ' active' : ''}`} style={{ fontSize: `${size}rem` }}>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          <span className="slider"></span>
        </label>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
