import { useGame } from 'contexts/GameContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';

interface Props {
  quantity: number;
  setQuantity: (target: number) => void;
  maxQuantity: number;
}

export const QuantityWidget = ({ quantity, setQuantity, maxQuantity }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const updateQuantity = (targetQuantity: number) => {
    if (targetQuantity <= 1) setQuantity(1);
    else setQuantity(targetQuantity > maxQuantity ? maxQuantity : targetQuantity);
  };
  return (
    <>
      <div className={`quantity-widget ${gameConfig.gotchiverseTheme}`}>
        <button
          disabled={quantity === 1}
          onClick={() => {
            click();
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
          }}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            click();
            updateQuantity(parseInt(e.target.value, 10));
          }}
          name="number"
        />
        <button
          disabled={maxQuantity <= quantity}
          onClick={() => {
            click();
            setQuantity(quantity + 1);
          }}
        >
          +
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
