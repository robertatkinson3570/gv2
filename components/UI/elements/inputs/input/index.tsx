import { useGame } from 'contexts/GameContext';
import styles from './styles';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  isParcel?: boolean;
  color?: string;
}

export const Input = ({ label, isParcel = false, color = '', ...props }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`${isParcel ? 'parcel' : ''} ${gameConfig.gotchiverseTheme} ${color}`}>
        <span>
          {label && <label className="label">{label}</label>}
          <input className="input" {...props} />
        </span>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
