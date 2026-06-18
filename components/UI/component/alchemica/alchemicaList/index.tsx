import styles from './styles';
import { getOnChainAlchemicaIcon, nFormatter } from 'helpers/functions';
import Image from 'next/image';

interface Props {
  alchemicaBalances?: {
    fud: number;
    fomo: number;
    alpha: number;
    kek: number;
    gltr: number;
  };
  color?: string;
  size?: number;
  width?: string;
}

export const AlchemicaList = ({
  alchemicaBalances = {
    fud: 0,
    fomo: 0,
    alpha: 0,
    kek: 0,
    gltr: 0,
  },
  size,
  width,
}: Props): JSX.Element => {
  const imgSize = 12 * size || 32;
  return (
    <>
      <div className="alchemica-list" style={{ width: width || '50rem' }}>
        {Object.keys(alchemicaBalances).map((alchemica, i) => {
          return (
            <div key={i} className="alchemica">
              <Image alt="" src={getOnChainAlchemicaIcon(alchemica)} width={imgSize} height={imgSize} />
              <p style={size ? { fontSize: `${size}rem` } : {}}>{nFormatter(alchemicaBalances[alchemica], 1)}</p>
            </div>
          );
        })}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
