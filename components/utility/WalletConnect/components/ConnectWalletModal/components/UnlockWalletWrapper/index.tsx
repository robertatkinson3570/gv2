import React, { ReactNode } from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { WalletConnectButton } from 'components/UI/elements';
import styles from './styles';
import { useUserWalletDataContext } from 'components/utility/WalletConnect/data-provider';
import { Modal } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

interface ConnectWalletWrapperProps {
  children: ReactNode[];
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const UnlockWalletWrapper = ({ children, isVisible, onBackdropPress }: ConnectWalletWrapperProps): JSX.Element => {
  const { back } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();
  const { showSelectWalletModal } = useUserWalletDataContext();

  const handleClose = () => {
    back();
    onBackdropPress();
    showSelectWalletModal(false);
  };

  return (
    <Modal
      open={isVisible}
      secondaryColor
      onClose={handleClose}
      color={gameConfig.gotchiverseTheme}
      light
      title={{
        component: <WalletConnectButton onClick={null} clickable={false} />,
      }}
    >
      <div className={gameConfig.gotchiverseTheme}>
        <div className="wallet-connect-button"></div>
        <h2>Choose your wallet:</h2>
        <div className="content">{children}</div>
        <style jsx>{styles}</style>
      </div>
    </Modal>
  );
};
