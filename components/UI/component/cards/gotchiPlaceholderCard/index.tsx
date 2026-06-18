import styles from './styles';
import Image from 'next/image';
import { GotchiSlotIcon } from 'assets';

export const GotchiPlaceholderCard = (): JSX.Element => {
  return (
    <>
      <div className="gotchi-panel">
        <div className="gotchi-img-container">
          <Image alt="" src={GotchiSlotIcon} layout="responsive" objectFit="contain" />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
