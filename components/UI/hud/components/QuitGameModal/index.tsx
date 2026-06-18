import InputController from 'components/controllers/inputController';
import { Modal } from 'components/UI/component';
import { Button } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const QuitGameModal = ({ open, onClose }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const { back } = useAavegotchiSound();
  useEffect(() => {
    InputController.updateDisableKeyboard(open, true);
  }, [open]);

  const handleExit = () => {
    back();
    void Router.back();
  };
  return (
    <>
      <Modal title="Quit Game?" open={open} onClose={onClose} secondaryColor>
        <div className="quit-modal-content">
          <p>Are you sure you want to quit the game?</p>
          <div className="modal-button-container">
            <Button disableSound secondary onClick={handleExit}>
              Quit
            </Button>
            <Button color={gameConfig.gotchiverseTheme} onClick={onClose}>
              Resume
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx>{styles}</style>
    </>
  );
};
