import { IndentedPanel } from 'components/UI/component';
import { CloseButton } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';
import styles from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ChatModal = ({ onClose, children, open }: Props): JSX.Element => {
  const blockPropagation = (e) => e.stopPropagation();
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`modal-wrapper ${open ? 'open' : ''}`} onClick={blockPropagation} onMouseDown={blockPropagation}>
        <div className="modal-container">
          <IndentedPanel hideSides={{ left: true, bottom: true }} useTheme={true}>
            <div className="inner-content">{children}</div>
          </IndentedPanel>
          <div className="close-container">
            <CloseButton onClick={onClose} color={gameConfig.gotchiverseTheme} />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
