import { Decimal } from 'decimal.js';
import { DepositStation } from 'assets/images';
import { KekIcon, FudIcon, AlphaIcon, FomoIcon } from 'assets/icons';
import _ from 'lodash';
import { useUI } from 'contexts/UIContexts';
import { updateTransactionState, updateWithdrawDialog } from 'contexts/UIContexts/actions';
import GameController from 'components/controllers/GameController';
import Alchemicas from 'components/phaser/Alchemicas';
import { useNotification } from 'contexts/NotificationContext';
import { showNotification, showTransactionNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useEffect, useState } from 'react';
import styles from './styles';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useWeb3 } from 'contexts/Web3Context';
import { useRealm } from 'contexts/RealmContext';
import Image from 'next/image';
import { DialogueContainer } from 'components/UI/component';
import { Button } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';

export const WithdrawStation = (): JSX.Element => {
  const { sending, alchemicaDeposited, oops } = useAavegotchiSound();
  const [{ withdrawDialogState, alchemica, depositId, transactionState }, uiDispatch] = useUI();
  const [{ ethersSigner }] = useWeb3();
  const [, notificationDispatch] = useNotification();
  const [{ isAavegotchiLent }] = useRealm();
  const [{ gameConfig }] = useGame();

  const [transactionAlchemica, setTransactionAlchemica] = useState<string>();

  const sufficientAlchemicaQuantity = (quantity: number) => {
    return quantity >= 1;
  };

  const canWithdraw = (alchemica: number[]) => {
    const totalAlchemica = _.sum(alchemica);
    return Boolean(totalAlchemica >= 1);
  };

  const handleWithdraw = async () => {
    sending();

    try {
      await ethersSigner.signMessage('Hi fren, please sign this message to confirm your withdrawal!');
    } catch (error) {
      showNotification(notificationDispatch, {
        type: 'error',
        title: error.message,
        message: 'Withdraw Alchemica',
      });
      return;
    }

    const grecaptcha = (window as any).grecaptcha;

    const submitWithdraw = async () => {
      // this generates an encrypted recaptcha enterprise token to validate server side with the transaction
      let token;
      if (gameConfig.enableRECAPTCHA) {
        token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'ALCHEMICA_WITHDRAWL' });
      }

      GameController.sendData('alchemica', 'withdraw', { recaptchaToken: token, action: 'ALCHEMICA_WITHDRAWL' });
      updateWithdrawDialog({ withdrawDialogState: false }, uiDispatch);
      // const amountsString = getAvailableAmountsString(alchemica);

      const totalAlchemica = Number(Decimal.sum(...alchemica));

      const id = showTransactionNotification(notificationDispatch, {
        message: `Withdraw Initiated ${totalAlchemica} Alchemica`,
      });

      setTransactionAlchemica(id);

      Alchemicas.setAlchemicaHUD(false);
      Alchemicas.handleOnDepositAnimation(depositId);
    };

    // reCAPTCHA is optional (off for the self-hosted realm server, which has no
    // enterprise key). Only route through grecaptcha when it's enabled AND loaded;
    // otherwise fire the withdraw directly. Previously this called
    // grecaptcha.enterprise.ready() unconditionally, so with recaptcha disabled
    // `grecaptcha` was undefined and the whole withdraw threw before sending.
    if (gameConfig.enableRECAPTCHA && grecaptcha?.enterprise?.ready) {
      grecaptcha.enterprise.ready(submitWithdraw);
    } else {
      await submitWithdraw();
    }
  };

  const handleWithdrawConfirmation = (data) => {
    data.data.status !== 'ERRORED' ? alchemicaDeposited() : oops();
    setTimeout(() => {
      updateTransactionNotificationStatus(notificationDispatch, transactionAlchemica, data.data.status !== 'ERRORED' ? 'success' : 'error');
    }, 1000);

    if (data.data.status === 'ERRORED') {
      GameController.handleToastNotification({
        message: `${data?.data?.message}`,
        autoClose: true,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (transactionState) {
      handleWithdrawConfirmation(transactionState);
      updateTransactionState(undefined, uiDispatch);
    }
  }, [transactionState]);
  return (
    <>
      <DialogueContainer
        open={withdrawDialogState}
        title="Vortex"
        onClose={() => updateWithdrawDialog({ withdrawDialogState: false }, uiDispatch)}
        img={DepositStation}
        color={isAavegotchiLent ? 'info' : gameConfig.gotchiverseTheme}
      >
        <div className={`withdraw-container ${gameConfig.gotchiverseTheme}`}>
          <div className={`alchemica-wrapper ${isAavegotchiLent ? 'borrow' : ''}`}>
            <div className="alchemica-container">
              <div className="alchemica">
                <div className="alchemica-icon">
                  <Image alt="" className="alchemica-icon" src={FudIcon} />
                </div>
                <span className={'quantity'}>{alchemica[0] || 0}</span>
              </div>
              <div className="alchemica">
                <div className="alchemica-icon">
                  <Image alt="" className="alchemica-icon" src={FomoIcon} />
                </div>{' '}
                <span className={'quantity'}>{alchemica[1] || 0}</span>
              </div>
              <div className="alchemica">
                <div className="alchemica-icon">
                  <Image alt="" className="alchemica-icon" src={AlphaIcon} />
                </div>{' '}
                <span className={'quantity'}>{alchemica[2] || 0}</span>
              </div>
              <div className="alchemica">
                <div className="alchemica-icon">
                  <Image alt="" className="alchemica-icon" src={KekIcon} />
                </div>{' '}
                <span className={'quantity'}>{alchemica[3] || 0}</span>
              </div>
            </div>
            <div className="bottom-wrapper">
              <div className="bottom"></div>
            </div>
          </div>
          <p className="title">Withdraw Alchemica to Pocket?</p>
          <div className="withdraw-button">
            <Button
              onClick={handleWithdraw}
              disabled={!canWithdraw(alchemica || [0])}
              fullWidth
              color={isAavegotchiLent ? 'info' : gameConfig.gotchiverseTheme}
            >
              Withdraw now
            </Button>
          </div>
        </div>
      </DialogueContainer>

      <style jsx>{styles}</style>
    </>
  );
};
