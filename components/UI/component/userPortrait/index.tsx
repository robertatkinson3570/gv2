import styles from './styles';
import Image from 'next/image';
import { GotchiLoading } from 'assets';

interface Props {
  img?: string;
  backgroundColor?: string;
  borderColor?: string;
  staticImg?: boolean;
  size?: number;
  isSpectator?: boolean;
}

export const UserPortrait = ({
  img,
  backgroundColor = 'var(--col-white)',
  borderColor = 'var(--col-mythical-400)',
  staticImg,
  size = 1,
  isSpectator = false,
}: Props): JSX.Element => {
  return (
    <>
      <div className="user-img-container" style={{ fontSize: `${size}rem`, backgroundColor: backgroundColor, borderColor: borderColor }}>
        {staticImg && (
          <div className={`static-img ${isSpectator ? 'observor' : ''}`}>
            <Image alt="" src={img || GotchiLoading} layout="fill" objectFit="contain" />
          </div>
        )}
        {!staticImg && <img src={img || GotchiLoading} />}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
