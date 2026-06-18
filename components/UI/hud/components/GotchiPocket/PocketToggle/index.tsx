import styles from './styles';
import { PiggyBank } from 'assets/images';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

export const PocketToggle = ({ onClick }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  return (
    <>
      <div
        className="blur-wrapper"
        onClick={() => {
          click();
          onClick();
        }}
      >
        <div className="toggle-container">
          <div className='image-wrapper'>
            <Image alt="" src={PiggyBank} objectFit='cover' layout='fill'/>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
