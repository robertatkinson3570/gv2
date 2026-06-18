import { KekIcon, AlphaIcon, FomoIcon, FudIcon, CandyFudIcon, CandyFomoIcon, CandyAlphaIcon, CandyKekIcon } from 'assets';
import styles from './styles';
import Image from 'next/image';
import { useRealm } from 'contexts/RealmContext';
import { IndentedPanel } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

interface Props {
  alchemica: {
    fud: number;
    fomo: number;
    alpha: number;
    kek: number;
  };
  maxCapacity: number;
  total: number;
  color?: '' | 'yellow';
}

export const CarriedAlchemicaPanel = ({ alchemica, maxCapacity, total, color = '' }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const isHalloween = gameConfig.gotchiverseTheme === 'halloween';

  const getAlchemicaIcon = (alchemica: string) => {
    switch (alchemica) {
      case 'fud':
        return isHalloween ? CandyFudIcon : FudIcon;
      case 'fomo':
        return isHalloween ? CandyFomoIcon : FomoIcon;
      case 'alpha':
        return isHalloween ? CandyAlphaIcon : AlphaIcon;
      case 'kek':
        return isHalloween ? CandyKekIcon : KekIcon;
    }
  };

  const blockPropagation = (e) => e.stopPropagation();

  return (
    <IndentedPanel hideSides={{ right: true }} isThin={true} useTheme={true} color={color}>
      <div onClick={blockPropagation} onMouseDown={blockPropagation} className={`${gameConfig.gotchiverseTheme} ${color}`}>
        <div className="carried-alchemica-content">
          {['fud', 'fomo', 'alpha', 'kek'].map((key) => {
            return (
              <div key={key} className="alchemica">
                <Image alt="" src={getAlchemicaIcon(key)} width={50} height={50} />
                <p>{alchemica[key]}</p>
              </div>
            );
          })}
        </div>
        <div className="capacity">
          <div className="total-capacity">{total}</div>
          <span style={{ fontSize: '4.2rem' }}>/</span>
          <div className="max-capacity">{maxCapacity}</div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </IndentedPanel>
  );
};
