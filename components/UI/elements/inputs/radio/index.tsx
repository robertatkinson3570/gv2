import { useGame } from 'contexts/GameContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';

interface Props {
  checked: boolean;
  onChange: () => void;
  size?: number;
  name?: string;
  color?: string;
}

export const Radio = ({ checked, name, onChange, size = 2, color = '' }: Props): JSX.Element => {
  const { click, back } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const handleChange = () => {
    checked ? back() : click();
    onChange();
  };

  return (
    <>
      <div className={`radio clickable ${color}`} style={{ fontSize: `${size}rem` }}>
        <input name={name} type="radio" checked={checked} onChange={handleChange} />
      </div>
      <style jsx>{`
        .radio {
          --color: var(--col-${color}-400, var(--col-pink-400));
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};
