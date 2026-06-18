import React from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import * as icons from '../../assets/providers';
import { AvailableWeb3Connectors, ConnectWalletModalProps, getWeb3ProviderFromBrowser } from '../../data-provider';
import { ChainId } from '../../data-provider/chains';
import { VENLY_CLIENT_ID } from '../../data-provider/config';
import { WarningArea } from '../WarningArea';
import messages from './messages';
import styles from './styles';
import { UnlockWalletWrapper, WalletCard } from './components';

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
  inDevelopment?: boolean;
}

export const ConnectWalletModal = ({
  preferredChainId,
  onSelectPreferredChainId,
  supportedChainIds,
  onUnlockExternalWallet,
  error,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps): JSX.Element => {
  const { success, oopsClick } = useAavegotchiSound();
  const browserWalletProvider = getWeb3ProviderFromBrowser();

  const handleUnlockExternalWallet = async (providerName: AvailableWeb3Connectors) => {
    const unlocked = await onUnlockExternalWallet(providerName, preferredChainId, supportedChainIds, false);
    unlocked ? success() : oopsClick();
  };

  // @ts-expect-error
  const isImToken = typeof window !== 'undefined' ? !!window.imToken : false;
  // @ts-expect-error
  const hasClover = typeof window !== 'undefined' ? !!window.clover : false;

  const wallets: Wallet[] = [
    {
      title: messages.titleBrowserWallet.replace('{walletName}', isImToken ? 'imToken' : 'Browser'),
      description: '(MetaMask, Trustwallet, Enjin)',
      providerName: 'browser',
      icon: isImToken ? icons.imToken : icons.browserWallets,
      disabled: !browserWalletProvider,
      errorMessage: messages.noBrowserBrowserWallet,
    },
    {
      title: 'Wallet Connect',
      providerName: 'wallet-connect',
      icon: icons.walletConnectIcon,
    },
    {
      title: 'Clover',
      providerName: 'clover',
      icon: icons.cloverIcon,
      errorMessage: hasClover ? undefined : 'Cannot detect Clover browser extension.',
    },
    {
      title: 'imToken',
      providerName: 'wallet-connect',
      icon: icons.imToken,
      notSupported: isImToken || preferredChainId === ChainId.polygon || preferredChainId === ChainId.avalanche,
    },
    {
      title: 'Venly',
      providerName: 'venly',
      icon: icons.venlyIcon,
      notSupported: !VENLY_CLIENT_ID,
    },
  ];

  return (
    <UnlockWalletWrapper isVisible={isVisible} onBackdropPress={onBackdropPress}>
      {/* <div className="network-selector">
        <SelectPreferredNetwork
          preferredNetwork={preferredChainId}
          onSelectPreferredNetwork={onSelectPreferredChainId}
          supportedNetworks={supportedChainIds}
        />
      </div> */}

      {error && (
        <WarningArea title={messages.errorCaption}>
          <p>{error}</p>
        </WarningArea>
      )}

      <div className="content">
        {wallets
          .filter((wallet) => !wallet.notSupported)
          .map((wallet, index) => (
            <WalletCard
              title={wallet.title}
              description={wallet.description}
              errorMessage={
                (wallet.providerName === 'browser' && !browserWalletProvider) || wallet.providerName === 'clover' ? wallet.errorMessage : undefined
              }
              providerName={wallet.providerName}
              icon={wallet.icon}
              disabled={wallet.disabled}
              handleUnlockExternalWallet={handleUnlockExternalWallet}
              key={index}
              inDevelopment={wallet.inDevelopment}
            />
          ))}
      </div>

      <div className="privacy-inner">
        {/* <p>
          {messages.needHelp}
          <a href="https://docs.aave.com/faq/troubleshooting" target="__blank">
            {messages.readOurFAQ}
          </a>
        </p> */}
        <p>
          <span className="disclaimer">{messages.disclaimer}</span>
          {messages.disclaimerBottomText}
        </p>
      </div>

      <style jsx>{styles}</style>
    </UnlockWalletWrapper>
  );
};
