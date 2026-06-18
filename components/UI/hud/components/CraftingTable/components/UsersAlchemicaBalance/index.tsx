import styles from './styles';
import { getOnChainAlchemicaIcon, nFormatter } from 'helpers/functions';
import { ModalSubheaderContainer } from 'components/UI/component';
import Image from 'next/image';
import { GltrIcon } from 'assets';

interface Props {
  usersAlchemicaBalance?: {
    fud: number;
    fomo: number;
    alpha: number;
    kek: number;
  };
  gltr?: number;
  color?: string;
  size?: number;
  width?: string;
}

export const UsersAlchemicaBalance = ({
  usersAlchemicaBalance = {
    fud: 0,
    fomo: 0,
    alpha: 0,
    kek: 0,
  },
  gltr,
  color,
  size,
  width,
}: Props): JSX.Element => {
  const imgSize = 12 * size || 32;
  return (
    <>
      <ModalSubheaderContainer fullscreen color={color}>
        <div className="users-alchemica" style={{ width: width || '50rem' }}>
          {Object.keys(usersAlchemicaBalance).map((alchemica, i) => {
            return (
              <div key={i} className="alchemica">
                <Image alt="" src={getOnChainAlchemicaIcon(alchemica)} width={imgSize} height={imgSize} />
                <p style={size ? { fontSize: `${size}rem` } : {}}>{nFormatter(usersAlchemicaBalance[alchemica], 1)}</p>
              </div>
            );
          })}
          {gltr !== undefined && (
            <div className="alchemica">
              <Image alt="" src={GltrIcon} width={imgSize} height={imgSize} />
              <p style={size ? { fontSize: `${size}rem` } : {}}>{nFormatter(gltr, 1)}</p>
            </div>
          )}
        </div>
      </ModalSubheaderContainer>
      <style jsx>{styles}</style>
    </>
  );
};
