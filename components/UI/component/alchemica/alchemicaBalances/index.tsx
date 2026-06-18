import styles from './styles';
import Image from 'next/image';
import { getAlchemicaIcon, nFormatter } from 'helpers/functions';
import { useGame } from 'contexts/GameContext';

interface Props {
  balances: number[];
  name: string;
  color: string; // 'halloween' | 'pink' | 'white';
  size?: number;
  hasSurveyed: boolean;
}

export const AlchemicaBalances = ({ balances, color, name, hasSurveyed, size = 48 }: Props): JSX.Element => {
  const alchemicas = ['fud', 'fomo', 'alpha', 'kek'];
  const [{ gameConfig }] = useGame();

  return (
    <>
      <div className={`balances-container ${color}`}>
        <div className="title-container">
          <span className={color}>{name}</span>
        </div>
        <div className="balance-list">
          {alchemicas.map((key, index) => {
            return (
              <div key={key} className="alchemica">
                <div className="image">
                  <Image alt="" src={getAlchemicaIcon(key, gameConfig.gotchiverseTheme)} />
                </div>
                <p className="text">
                  {hasSurveyed
                    ? !isNaN(balances?.[index])
                        ? balances[index] < 1
                          ? nFormatter(balances[index], 4)
                          : nFormatter(balances[index], 2)
                        : 0
                    : '?'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
