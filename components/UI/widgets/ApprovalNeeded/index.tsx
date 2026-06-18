/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react';
import { GltrIcon, TickIcon, WarningIcon } from 'assets';
import styles from './styles';
import { NetworkNames } from 'types';
import type { Signer } from 'ethers';
import { DiamondName, setAllowance } from 'web3/contract';
import { AavegotchiMascot } from 'assets/images';
import { getOnChainAlchemicaIcon } from 'helpers/functions';
import { Loader, Button } from 'components/UI/elements';
import { useWeb3 } from 'contexts/Web3Context';
import { useNotification } from 'contexts/NotificationContext';
import { showNotificationWithTimeout } from 'contexts/NotificationContext/actions';
import Image from 'next/image';
import { FullscreenModal } from 'components/UI/component';

interface Props {
  approved: { [key in Tokens]: boolean };
  handleApproved: (e: { [key in Tokens]: boolean }) => void;
  open: boolean;
  onClose: () => void;
  contractName: DiamondName;
}

type Tokens = 'fud' | 'fomo' | 'alpha' | 'kek' | 'gltr';

export const ApprovalNeeded = ({ approved, handleApproved, open, onClose, contractName }: Props): JSX.Element => {
  const [{ currentNetwork, ethersSigner }] = useWeb3();
  const [, notificationDispatch] = useNotification();

  const [tokenApproved, setTokenApproved] = useState<{ [key in Tokens]: boolean }>(approved);
  const [currentlyFetching, setCurrentlyFetching] = useState<Tokens>();
  const [toBeFetched, setToBeFetched] = useState<Tokens | undefined>();

  const approveToken = async (token?: Tokens, network?: NetworkNames, signer?: Signer) => {
    if (!token) {
      console.error('No token selected!');
    } else if (!network || !signer) {
      console.error('Not connected');
    } else {
      setCurrentlyFetching(token);
      const res = await setAllowance(1000000000000, `${token}Address`, contractName, network, signer);
      if (res) {
        setTokenApproved((prevState) => {
          prevState[token] = true;
          return prevState;
        });
        showNotificationWithTimeout(notificationDispatch, {
          type: 'success',
          title: 'Approved Contract',
          message: `Increased ${token.toUpperCase()} allowance.`,
          options: {
            sound: true,
          },
        });
      }
      setCurrentlyFetching(undefined);
    }
  };

  const isInProgress = (approved: { [key in Tokens]: boolean }) => {
    return !!Object.keys(approved).find((token: Tokens) => tokenApproved[token]);
  };

  const getContractLink = () => {
    switch (contractName) {
      case 'installationDiamond':
        return 'https://polygonscan.com/address/0x19f870bd94a34b3adaa9caa439d333da18d6812a';
      case 'tileDiamond':
        return 'https://polygonscan.com/address/0x9216c31d8146bCB3eA5a9162Dc1702e8AEDCa355';
      default:
        return '#';
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    const notApproved = Object.keys(tokenApproved).find((token: Tokens) => tokenApproved[token] === false) as Tokens | undefined;
    if (notApproved === undefined) {
      setTimeout(() => {
        handleApproved(tokenApproved);
        onClose();
      }, 2000);
    }
    setToBeFetched(notApproved);
  }, [tokenApproved.fud, tokenApproved.fomo, tokenApproved.alpha, tokenApproved.kek, tokenApproved.gltr]);

  return (
    <FullscreenModal title="Approval Needed" open={open} onClose={onClose}>
      <div className="approval-container">
        <div className="warning-message-container">
          <Image alt="" src={WarningIcon} height={37} width={37} />
          <p className="warning-message">
            Before you can spend any of your hard earned alchemica.
            <br />
            You must first give our contract <span className="warning">permission</span> to spend it for you.
          </p>
        </div>
        <div className="mascot-container">
          <Image alt="" src={AavegotchiMascot} height={80} width={50} />
          <div className="speach-bubble">
            {isInProgress(tokenApproved) ? (
              <>
                <p className="success">Almost done! Keep going!</p>
                <p className="info">Approve the rest of Alchemica and start crafting</p>
              </>
            ) : (
              <>
                <p className="warning">This is for your own safety fren!</p>
                <p className="info">And don{"'"}t go around approving contracts willy nilly.</p>
              </>
            )}
          </div>
        </div>
        <div className="progress-container" style={{ gridTemplateColumns: `repeat(${Object.keys(tokenApproved).length}, 1fr)` }}>
          {Object.keys(tokenApproved).map((token, i) => {
            const status =
              token === currentlyFetching ? 'in-progress' : token === toBeFetched ? 'next' : tokenApproved[token] ? 'approved' : 'not-approved';

            return (
              <div key={i} className={status}>
                <div className="token">
                  <div className="image-filter">
                    <Image alt="" src={token === 'gltr' ? GltrIcon : getOnChainAlchemicaIcon(token)} height={40} width={token === 'gltr' ? 40 : 34} />
                  </div>
                  <div className="token-status">
                    <p className={token}>{token}</p>
                    {status === 'in-progress' && <Loader size={0.2} />}
                    {status === 'approved' && <Image alt="" src={TickIcon} width={18} />}
                  </div>
                </div>
                <div className="progress-indicator" />
              </div>
            );
          })}
        </div>
        <div className="button-container">
          <Button
            color="success"
            disabled={!!currentlyFetching || !toBeFetched}
            onClick={async () => await approveToken(toBeFetched, currentNetwork, ethersSigner)}
          >
            Approve
          </Button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </FullscreenModal>
  );
};
