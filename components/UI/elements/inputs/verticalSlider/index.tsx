import { useGame } from 'contexts/GameContext';
import styles from './styles';

interface Props {
  min: number;
  max: number;
  step: number;
  size?: number;
  value: number;
  color?: '' | 'yellow' | 'purple';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const VerticalSlider = ({ size = 1, min, step, max, value, onChange, color }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();

  return (
    <>
      <div className={`range-container ${gameConfig.gotchiverseTheme} ${color}`} style={{ fontSize: `${size}rem` }}>
        <div className="input-container">
          <input type="range" value={value} className="input" max={max} min={min} step={step} onChange={onChange} />
        </div>
        <span className="value" style={{ bottom: `calc(${(value * 100) / 105}% + 1.8rem)` }}>
          {`${value === 0 ? '' : value}`}
        </span>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};
