import { Rarity } from 'types';
import styles from './styles';
import { useGame } from 'contexts/GameContext';

interface Props {
  level: number;
  rarity?: Rarity;
  isSmall?: boolean;
}

export const LevelPin = ({ level, rarity, isSmall = false }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      {' '}
      <div className={`level-container ${rarity || '' ? rarity : gameConfig.gotchiverseTheme} ${isSmall ? 'small' : ''}`}>
        <p>{level}</p>
        <small>Level</small>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
