import React from 'react';
// import Image from 'next/image';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useNotification } from 'contexts/NotificationContext';
import { showNotificationWithTimeout } from 'contexts/NotificationContext/actions';
import { AvailableWeb3Connectors } from '../../../../data-provider/connectors';
import { Wallet } from '../../index';
import Image from 'next/image';
import styles from './styles';
import { useGame } from 'contexts/GameContext';

interface WalletCardProps extends Wallet {
  handleUnlockExternalWallet: (providerName: AvailableWeb3Connectors) => void;
}

export const WalletCard = ({
  title,
  description,
  icon,
  disabled,
  providerName,
  handleUnlockExternalWallet,
  errorMessage,
  inDevelopment,
}: WalletCardProps): JSX.Element => {
  const { oopsClick, click } = useAavegotchiSound();
  const [, dispatch] = useNotification();
  const [{ gameConfig }] = useGame();

  const handleSelect = () => {
    if (errorMessage) {
      oopsClick();
      showNotificationWithTimeout(dispatch, {
        type: 'error',
        title: 'Connector error',
        message: errorMessage,
      });
    } else {
      click();
      handleUnlockExternalWallet(providerName);
    }
  };

  return (
    <button
      className={`wallet-card clickable ${inDevelopment ? 'in-development' : ''} ${gameConfig.gotchiverseTheme}`}
      onClick={handleSelect}
      disabled={disabled}
      type="button"
    >
      {disabled && errorMessage && <strong className="error">{errorMessage}</strong>}

      <div className="image-inner">
        <Image src={icon} alt={title} layout="fill" />
      </div>

      <div className="text-inner">
        <p>{title}</p>
        {inDevelopment && <span>(In Development)</span>}
        {!!description && <span>{description}</span>}
      </div>

      <style jsx>{styles}</style>
    </button>
  );
};
