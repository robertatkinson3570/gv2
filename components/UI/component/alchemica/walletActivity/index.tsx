/* eslint-disable multiline-ternary */
import styles from './styles';
import Image from 'next/image';
import { formatDigit, getAlchemicaIcon } from 'helpers/functions';
import { ErrorIcon, GotchiverseLogoBlue, InfoIcon, LoadingIcon, SuccessIcon, TransferedIcon, WalletIcon } from 'assets';
import { ActivityIcon, Button, ExternalLinkIcon, Loader, Tooltip } from 'components/UI/elements';
import { useEffect, useRef, useState } from 'react';
import { useWeb3 } from 'contexts/Web3Context';
import { NetworkNames, TransactionHistory } from 'types';
import { getUserAlchemTransactionHistory, getUserTransactionHistory } from 'helpers/gotchi.helper';
import { useNotification } from 'contexts/NotificationContext';
import _ from 'lodash';
import GlobalState from 'contexts/GlobalState';

export interface Props {
  toggle: () => void;
}

export const WalletActivity = ({ toggle }: Props): JSX.Element => {
  const [, dispatch] = useNotification();
  const [{ currentNetwork, currentAccount }] = useWeb3();

  const [tooltipId, setTooltipId] = useState<number>();
  const [userTransactionHistory, setUserTransactionHistory] = useState<TransactionHistory[]>();
  const [fetching, setFetching] = useState<boolean>(true);
  const tooltipRef = useRef(null);
  const scrollRef = useRef(null);
  const refs = useRef([]);
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();
  const [txId, setTxId] = useState('');
  const [txTime, setTxTime] = useState('');

  const fetchAndSetUserTransactions = async (account: string, currentNetwork: NetworkNames) => {
    setFetching(true);
    const alchemRes = await getUserAlchemTransactionHistory(account, currentNetwork, dispatch);
    const playerWalletRes = await getUserTransactionHistory(account, currentNetwork, dispatch);
    let transactionList = [];
    if (alchemRes) transactionList = _.concat(alchemRes);
    // console.log('alchemRes', alchemRes);

    if (playerWalletRes) {
      console.log('playerWalletRes', playerWalletRes);
      const deposits = _.map(playerWalletRes.deposits, (item) =>
        _.assign(item, { type: 'deposit' }),
      );
      const withdraws = _.map(playerWalletRes.withdraws, (item) =>
        _.assign(item, { type: 'withdraw' }),
      );
      transactionList = _.concat(transactionList, deposits, withdraws);
    }
    _.sortBy(transactionList, 'createdAt');
    setUserTransactionHistory(transactionList);
    setFetching(false);
  };

  useEffect(() => {
    if (currentAccount && currentNetwork) void fetchAndSetUserTransactions(currentAccount, currentNetwork);
  }, [currentAccount, currentNetwork]);

  const handleMouseEnter = (index: number) => {
    setTooltipId(index);
    const { y, width } = refs.current[index].getBoundingClientRect();
    const { y: sy } = scrollRef.current.getBoundingClientRect();
    setX(width - 30);
    setY(y - sy + 100);
  };

  useEffect(() => {
    if (tooltipId !== undefined) {
      setTxId(userTransactionHistory[tooltipId].id);
      const _time = userTransactionHistory[tooltipId].createdAt;
      setTxTime(formatTime(_time ? new Date(_time) : new Date()));
    }
  }, [tooltipId]);

  const getStatusIcon = (transaction: TransactionHistory) => {
    switch (transaction.status) {
      case 'COMPLETED':
      case 'CLOSE':
        return SuccessIcon;
      case 'ERRORED':
      case 'MANUAL':
        return ErrorIcon;
      case 'TRANSFERRED':
        return TransferedIcon;
      case 'PENDING':
        return LoadingIcon;
      default:
        return InfoIcon;
    }
  };
  const formatTime = (date: Date) => {
    // const day = date.getDate();
    // const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const pmOrAm = hours >= 12 ? 'pm' : 'am';
    if (hours > 12) hours -= 12;

    return `${formatDigit(hours)}:${formatDigit(minutes)}:${formatDigit(seconds)}${pmOrAm}`;
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'deposit':
        return GotchiverseLogoBlue;

      case 'withdraw':
        return WalletIcon;

      default:
        return WalletIcon;
    }
  };

  const viewTx = (tx: TransactionHistory): void => {
    const networkURL = GlobalState.WEB3.state.currentNetwork === 'matic' ? 'www.polygonscan.com' : 'mumbai.polygonscan.com';
    if (!tx.hash) return;
    window.open(`https://${networkURL}/tx/${tx.hash}`, 'blank');
  };

  return (
    <>
      {
        <div className="wallet-activity-component">
          <div className="activity-header">
            <div className="flex-c-c gap-2">
              <ActivityIcon width="1.5rem" height="1.5rem" fill="var(--col-white)" />
              <p className="title">ACTIVITY</p>
            </div>
            <div className="table-header flex-c-b">
              <span className="flex-1 justify-start">To</span>
              <span className="flex flex-1 justify-center pl-3">Amount</span>
              <span className="flex-1 text-right">Status</span>
            </div>
          </div>

          <div className="activity-list" ref={scrollRef}>
            {fetching && (
              <div className="flex-c-c gap-5 h-full">
                <Loader size={0.3} color="info" />
                <p className="status-fetching">Fetching transaction...</p>
              </div>
            )}
            {!fetching && (
              <>
                {userTransactionHistory?.map((tx, i) => (
                  <div
                    className={`tx-row ${tx.status === 'ERRORED' ? 'error' : ''}`}
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    ref={(ref) => {
                      if (ref && !refs.current.includes(ref)) refs.current.push(ref);
                    }}
                    onClick={() => viewTx(tx)}
                  >
                    <div className="flex-c-c gap-2">
                      <div className="dest-icon">
                        <Image alt="" src={getIconByType(tx.type)} layout="fill" />
                      </div>
                      {tx.type && (
                        <div className="polyscan-container">
                          <ExternalLinkIcon fill={i === tooltipId ? 'var(--col-info-200)' : 'var(--col-info-400)'} width="0.9rem" height="0.9rem" />
                        </div>
                      )}
                    </div>
                    <div className="tx-amount">
                      {['fud', 'fomo', 'alpha', 'kek'].map((alchemica) => (
                        <div className="alchemica-tx-info" key={alchemica}>
                          <div className="alchemica-icon">
                            <Image alt="" src={getAlchemicaIcon(alchemica)} />
                          </div>
                          <div className="alchemica-amount">{['fud', 'fomo', 'alpha', 'kek'][Number(tx.tokenId) - 1] === alchemica ? tx.value : 0 }</div>
                        </div>
                      ))}
                    </div>
                    <div className="status-icon">
                      {['PENDING', 'INIT'].includes(tx.status) || (tx.status === 'ERRORED' && tx.errorMsg === null) ? (
                        <Loader size={0.2} />
                      ) : (
                        <Image alt="" src={getStatusIcon(tx)} layout="fill" />
                      )}
                    </div>
                  </div>
                ))}
                <div
                  className="tooltip-wrapper"
                  style={{
                    display: tooltipId === undefined ? 'none' : 'block',
                    left: x,
                    top: y,
                  }}
                  ref={tooltipRef}
                >
                  <Tooltip title="Request ID:" message={txId} subtitle={txTime} actionType="copy" theme="info"></Tooltip>
                </div>
              </>
            )}
          </div>
          <div className="cta-wrapper">
            <div className="flex-c-c">
              <Button size={1.8} fullWidth color="info" onClick={() => toggle()}>
                <span className="cta-button-label">{'< Manage Tokens'}</span>
              </Button>
            </div>
          </div>
        </div>
      }
      <style jsx>{styles}</style>
    </>
  );
};
