import { useEffect, useState } from 'react';
import Image from 'next/image';
import { providers, utils } from 'ethers';
import _ from 'lodash';
import { useWeb3 } from 'contexts/Web3Context';
import { useUser } from 'contexts/UserContext';
import { fetchAndSetAlchemicaBalance } from 'contexts/UserContext/actions';
import { AlchemicaType } from 'contexts/UIContexts/store';
import { TickIconSVG } from 'components/UI/elements/svgs/tick';
import { ActivityIcon, Button } from 'components/UI/elements';
import { GotchiverseLogoBlue, TransferArow, TransferIcon, WalletIcon } from 'assets';
import { getOnChainAlchemicaIcon, nFormatter } from 'helpers/functions';
import { AlchemicaNumbers, NetworkNames, TokenCounters } from 'types';
import styles from './styles';
import { useRealm } from 'contexts/RealmContext';
import { ContractName, getContract } from 'web3/contract';
import { useNotification } from 'contexts/NotificationContext';
import { showNotification, showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { getErrMessage } from 'helpers/ethers.helper';
import GameController from 'components/controllers/GameController';
import { gasPriceDict } from 'web3/web3';
import { useGame } from 'contexts/GameContext';

export interface Props {
  toggle: () => void;
  onClose: () => void;
}

export const TokenManager = ({ toggle, onClose }: Props): JSX.Element => {
  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const { send, sending, oops, success } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const [{ globalProvider, ethersSigner, currentNetwork, currentAccount }] = useWeb3();
  const [{ alchemicaBalance }, userDispatch] = useUser();
  const [{ playerWallet }] = useRealm();
  const [, notificationDispatch] = useNotification();

  const alchemicaDefaults: AlchemicaNumbers = {
    fud: 0,
    fomo: 0,
    alpha: 0,
    kek: 0,
    // gltr: 0,
  };

  const [fetching, setFetching] = useState<boolean>(true);
  const [alchemicaInputs, setAlchemicaInputs] = useState<AlchemicaNumbers>(alchemicaDefaults);

  const alchemicas = !fetching && isDeposit ? alchemicaBalance : playerWallet;

  // Fetching web3 balances
  const fetchAndSetBalances = async (account: string, currentNetwork: NetworkNames, provider: providers.Provider) => {
    setFetching(true);
    await fetchAndSetAlchemicaBalance({ account, network: currentNetwork, provider }, userDispatch);
    setFetching(false);
  };
  const onchange = (token: AlchemicaType, val: number) => {
    val = val > alchemicas[token] ? alchemicas[token] : val;
    setAlchemicaInputs({ ...alchemicaInputs, [token]: val });
  };

  // const isMax = (type: AlchemicaType): boolean => {
  //   return alchemicaInputs[type] === alchemicaBalance[type];
  // };

  const reverseFrom = (): void => {
    setIsDeposit(!isDeposit);
    setAlchemicaInputs(alchemicaDefaults);
  };

  useEffect(() => {
    void fetchAndSetBalances(currentAccount, currentNetwork, globalProvider);
  }, [currentAccount, globalProvider, currentNetwork]);

  useEffect(() => {
    if (currentAccount && currentNetwork && globalProvider) {
      void fetchAndSetBalances(currentAccount, currentNetwork, globalProvider);
    }
  }, []);

  const handleTokenDeposit = async () => {
    showNotification(notificationDispatch, {
      type: 'error',
      title: 'Error',
      message: 'Deposits are disabled!',
    });
    return;
    const tokens = _.keys(alchemicaInputs);
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (alchemicaInputs[token]) {
        const message = `Deposit ${alchemicaInputs[token]} ${token.toUpperCase()}`;
        const notificationId = showTransactionNotification(notificationDispatch, { message });

        send();
        const tokenContract = getContract(currentNetwork, ethersSigner, `${token}Address` as ContractName, true);
        if (!tokenContract) {
          console.log(`@handleTokenDeposit:Err getting contract for token ${token}`);
        }
        console.log(`@handleTokenDeposit: INIT Transfer ${utils.parseEther(alchemicaInputs[token].toString())}${token.toLocaleUpperCase()} `);
        try {
          const tx = await tokenContract.transfer(process.env.ALCHEMICA_DEPOSIT, utils.parseEther(alchemicaInputs[token].toString()), {
            ...(await gasPriceDict(ethersSigner)),
          });
          console.log(`@handleTokenDeposit:Depoist ${alchemicaInputs[token]} ${token.toUpperCase()}`, tx);
          sending();
          await tx.wait();

          success();
          updateTransactionNotificationStatus(notificationDispatch, notificationId, 'success');
        } catch (e) {
          console.log('@handleTokenDeposit:ERR', e);
          if (notificationId) {
            oops();
            updateTransactionNotificationStatus(notificationDispatch, notificationId, 'error', getErrMessage(e));
            break;
          }
        }
      }
    }
    onClose();
  };

  const handleTokenWithdrawl = async () => {
    const grecaptcha = (window as any).grecaptcha;
    grecaptcha.enterprise.ready(async function () {
      // this generates an encrypted recaptcha enterprise token to validate server side with the transaction
      let token;
      if (gameConfig.enableRECAPTCHA) {
        token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'PLAYER_WALLET_WITHDRAWL' });
      }

      const tokens: TokenCounters = {};
      _.each(alchemicaInputs, (val, token) => {
        if (val) tokens[token.toUpperCase()] = val;
      });

      console.log('@handleTokenWithdrawl:INIT ', tokens);
      let message = 'WITHDRAW: ';
      _.each(alchemicaInputs, (val, token) => {
        if (val) message += `${val} ${token.toUpperCase()} `;
      });

      // Init transaction notification to be handeled in GameController
      const notificationId = showTransactionNotification(notificationDispatch, { message });
      notificationDispatch({
        type: 'UPDATE_WITHDRAWL_NOTIFICATION_ID',
        withdrawlNotificationId: notificationId,
      });

      GameController.sendData('alchemica', 'withdraw-from-player-wallet', {
        recaptchaToken: token,
        action: 'PLAYER_WALLET_WITHDRAWL',
        tokens,
      });
      onClose();
    });
  };

  return (
    <>
      {
        <div className={`token-manager-component ${isDeposit ? '' : 'withdraw'}`}>
          <p className="title">TRANSFER TOKENS</p>

          <div className={`transfer-info flex ${!isDeposit ? 'reverse' : ''}`}>
            <div className="transfer-info-container">
              <p className="transfer-label">{isDeposit ? 'from' : 'to'}</p>
              <div className="icon-wrapper flex-c-c">
                <div className="icon-container">
                  <Image alt="" src={WalletIcon} layout="fill" />
                </div>
              </div>
              <span className="token-label">Blockchain Wallet</span>
            </div>

            <div className="transfer-animation" onClick={reverseFrom}>
              <div className="transfer-arrow">
                <Image alt="" src={TransferArow} objectFit="cover" />
              </div>
              <div className="transfer-icon">
                <Image alt="" src={TransferIcon} objectFit="cover" />
              </div>
            </div>
            <div className="transfer-info-container">
              <p className="transfer-label">{isDeposit ? 'to' : 'from'}</p>
              <div className="icon-wrapper flex-c-c">
                <div className="icon-container">
                  <Image alt="" src={GotchiverseLogoBlue} layout="fill" />
                </div>
              </div>
              <span className="token-label">Gotchiverse</span>
            </div>
          </div>
          <div className="transfer-details">
            {Object.keys(alchemicas).map((token, i) => (
              <div key={token} className={`alchemica-type ${token}`}>
                <div className="alchemica-type-detail flex-c-c">
                  <Image alt="" src={getOnChainAlchemicaIcon(token)} width={28} height={28} />

                  <p className="alchemica-type-balance">{fetching ? '?' : nFormatter(alchemicas[token], 1)}</p>
                </div>
                <div className={`alchemica-input-container ${alchemicaInputs[token] === 0 ? 'zero' : ''}`}>
                  <input
                    className="alchemica-input"
                    type="number"
                    value={Number(alchemicaInputs[token]).toFixed(0)}
                    onChange={(e) => onchange(token as AlchemicaType, Number(e.target.value))}
                    min={0}
                    max={Number(alchemicas[token])}
                  />
                  <div className="input-extra">
                    {!alchemicaInputs[token] && (
                      <span
                        className="max-button"
                        onClick={() => {
                          const input: AlchemicaNumbers = { ...alchemicaInputs, [token]: Number(alchemicas[token]) };
                          setAlchemicaInputs(input);
                        }}
                      >
                        Max
                      </span>
                    )}
                    {!!alchemicaInputs[token] && <TickIconSVG fill="var(--col-info-800)" size={14} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cta-wrapper">
            <div className="flex-c-c btn-transfer">
              <Button
                size={1.8}
                fullWidth
                color="info"
                disabled={_.sum(_.values(alchemicaInputs)) === 0}
                onClick={async () => {
                  isDeposit ? await handleTokenDeposit() : await handleTokenWithdrawl();
                }}
              >
                <span className="cta-button-label">{`TRANSFER ${_.filter(alchemicaInputs, (type) => type > 0).length} TOKENS`}</span>
              </Button>
            </div>
            <div className="activity-button-wrapper flex-c-c" onClick={() => toggle()}>
              <ActivityIcon width={20} height={20} fill="var(--col-info-800)" />
              <span className="activity-cta-label">See Activity</span>
            </div>
          </div>
        </div>
      }
      <style jsx>{styles}</style>
    </>
  );
};
