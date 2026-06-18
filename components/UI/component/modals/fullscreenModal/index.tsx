import { CloseButton } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';
import { ModalWrapper } from '..';
import { BorderedPanel } from '../..';
import styles from './styles';

interface Props {
  title: string;
  open: boolean;
  children: React.ReactNode;
  isCrafting?: boolean;
  onClose: () => void;
}

export const FullscreenModal = ({ title, children, open, isCrafting = false, onClose }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <ModalWrapper open={open} onClose={onClose} fullWidth useHalloween={isCrafting}>
        <div className={`panel-container ${isCrafting ? 'crafting' : ''}`} onClick={(e) => e.stopPropagation()}>
          <BorderedPanel title={title} isHalloween={isCrafting && gameConfig.gotchiverseTheme === 'halloween'}>
            {children}
          </BorderedPanel>
          <div className="close-icon-container">
            <CloseButton onClick={onClose} size={3.5} color={gameConfig.gotchiverseTheme} />
          </div>
        </div>
      </ModalWrapper>

      <style jsx>{styles}</style>
    </>
  );
};
