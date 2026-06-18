import { GuideIcon } from 'assets';
import { PanelButton } from 'components/UI/elements';
import { gotchiverseLinks } from 'data/links';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Image from 'next/image';
import styles from './styles';

interface Props {
  color?: 'pink' | 'info';
}

export const GameGuide = ({ color = 'pink' }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();
  return (
    <>
      <PanelButton
        onClick={() => {
          window.open(gotchiverseLinks.aavegotchi.doc);
          click();
        }}
        color="guide"
      >
        <div className="icon-container">
          <Image alt="" src={GuideIcon} layout="fill" />
        </div>
        <div className={`guide-text ${color}`}>GAME GUIDE</div>
      </PanelButton>
      <style jsx>{styles}</style>
    </>
  );
};
