/* eslint-disable multiline-ternary */
import { GotchiLending } from 'assets';
import styles from './styles';
import { BaazaarImage, Button } from 'components/UI/elements';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  type?: 'card-baazaar' | 'card-lending';
  title?: string;
  description?: string;
  ctaTitle?: string;
  titleColor?: string;
  outlineColor?: string;
  showCard?: boolean;
  showGradient?: boolean;
  clipPath?: string;
  onClick?: () => void;
}

export const BuyCTACard = ({
  type = 'card-baazaar',
  showCard,
  showGradient,
  title,
  description,
  ctaTitle,
  titleColor,
  outlineColor,
  clipPath,
  onClick,
}: Props): JSX.Element => {
  return (
    <>
      <div className="cta-baazaar">
        {showGradient && <div className="gradient" />}
        <div className="buy-cta-card">
          {showCard && (
            <div className={`img-container ${type}`}>
              {type === 'card-baazaar' ? (
                <BaazaarImage stroke={`var(--col-${type === 'card-baazaar' ? 'pink' : 'info'}-400)`} strokeWidth={4} />
              ) : type === 'card-lending' ? (
                <Image alt="" src={GotchiLending} layout="fill" objectFit="cover" />
              ) : null}
            </div>
          )}

          {showCard && (
            <div className="detail-wrapper">
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
            </div>
          )}

          {showCard && ctaTitle && (
            <div className="cta-button-wrapper">
              <Button variant="rounded" onClick={onClick}>
                {ctaTitle}
              </Button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .cta-baazaar {
          --title-color: ${showCard && titleColor ? `var(--col-${titleColor}-200)` : 'white'};
          --border-color: ${showCard && outlineColor ? `var(--col-${outlineColor}-400)` : 'transparent'};
          --bg-color: ${showCard ? 'var(--col-blue-750)' : 'transparent'};
          --clip-path: ${showCard && clipPath ? clipPath : 'none'};
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};
