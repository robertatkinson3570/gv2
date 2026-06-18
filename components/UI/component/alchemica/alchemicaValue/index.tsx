import { getAlchemicaIcon } from 'helpers/functions';
import Image from 'next/image';
import styles from './styles';
import { useGame } from 'contexts/GameContext';

interface HarvestInfoProps {
  label: string;
  type: string;
  value: number;
}

export const AlchemicaValue = ({ label, type, value }: HarvestInfoProps): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`alchemica-single-container ${gameConfig.gotchiverseTheme}`}>
        <span className="label">{label}</span>
        <div className="alchemica">
          <Image alt="" src={getAlchemicaIcon(type, gameConfig.gotchiverseTheme)} width={36} height={36} />
          <span className="amount">{value}</span>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
