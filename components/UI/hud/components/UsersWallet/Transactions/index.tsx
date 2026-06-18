import { useNotification } from 'contexts/NotificationContext';
import { getGlobalTransactionStatus, getUserAlchemTransactionHistory } from 'helpers/gotchi.helper';
import { useEffect, useState } from 'react';
import { NetworkNames, TransactionHistory } from 'types';
import { Loader, Tooltip } from 'components/UI/elements';
import styles from './styles';
import { ErrorIcon, SuccessIcon, InfoIcon, WarningIcon, BorrowedIcon } from 'assets/icons';
import { useWeb3 } from 'contexts/Web3Context';
import { useRealm } from 'contexts/RealmContext';
import Image from 'next/image';
import { formatDigit } from 'helpers/functions';
import _ from 'lodash';

interface Props {
  user: string;
}

export const Transactions = ({ user }: Props): JSX.Element => {
  const [, dispatch] = useNotification();
  const [{ currentAccount, currentNetwork }] = useWeb3();
  const [fetching, setFetching] = useState(true);
  const [{ isAavegotchiLent }] = useRealm();
  const [globalTransactionStatus, setGlobalTransactionStatus] = useState<number>(0);
  const [tooltipId, setTooltipId] = useState<number>();
  const [userTransactionHistory, setUserTransactionHistory] = useState<TransactionHistory[]>();

  const fetchAndSetBalances = async (account: string, currentNetwork: NetworkNames) => {
    setFetching(true);
    const results = await getUserAlchemTransactionHistory(account, currentNetwork, dispatch);

    if (results) {
      setUserTransactionHistory(results);
    }
    setFetching(false);
  };
  const fetchAndSetGlobalTransactions = async () => {
    setFetching(true);
    const results = await getGlobalTransactionStatus(dispatch);
    if (results) {
      setGlobalTransactionStatus(results);
    }
    setFetching(false);
  };

  const getStatusIcon = (transaction: TransactionHistory) => {
    switch (transaction.status) {
      case 'COMPLETED':
        return SuccessIcon;
      case 'ERRORED':
      case 'MANUAL':
        return ErrorIcon;
      case 'TRANSFERRED':
        return InfoIcon;
      default:
        return InfoIcon;
    }
  };

  const formatTime = (date: Date) => {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
    const pmOrAm = hours >= 12 ? 'pm' : 'am';

    return `${month}.${day} ${formatDigit(hours)}:${formatDigit(minutes)}${pmOrAm}`;
  };

  useEffect(() => {
    void fetchAndSetBalances(currentAccount, currentNetwork);
    void fetchAndSetGlobalTransactions();
  }, [user, currentNetwork]);

  const getTransactionHistoryUrl = (transaction) => {
    let transactionUrl = 'https://polygonscan.com/';
    if (transaction?.hash) {
      transactionUrl += `tx/${transaction.hash}`;
    }
    return transactionUrl;
  };
  // const handleOnMouseEnter = () => {};
  return (
    <>
      <div>
        <div className="status-container">
          {fetching && (
            <div className="loading-state">
              <Loader size={0.3} color="purple" />
              <p>Fetching Balances...</p>
            </div>
          )}
          {!fetching && !userTransactionHistory && (
            <div className="error-state">
              <Image alt="" src={ErrorIcon} height={`${20}`} />
              <p>Error updating balances</p>
            </div>
          )}
        </div>
        <div className="transactions-content">
          <div className="scrollable secondary">
            <div className="transactions-grid">
              <div className="transaction-info-wrapper">
                {globalTransactionStatus > 0 && (
                  <div className="transaction-info-container">
                    <Image alt="" src={WarningIcon} height={`${40}`} />
                    <div className="info-details">
                      <p>Polygon network is under heavy load, withdrawals may be delayed.</p>
                      <p className="transaction-pending"> There are currently {globalTransactionStatus} pending withdrawals.</p>
                    </div>
                  </div>
                )}
                {isAavegotchiLent && (
                  <div className="transaction-info-container">
                    <Image alt="" src={BorrowedIcon} height={`${40}`} />
                    <div className="info-details">
                      <p className="borrow-info">
                        Withdrawals delayed longer than 5 minutes will go directly to your wallet, not your Gotchi Pocket!
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {_.map(userTransactionHistory, (transaction, i) => (
                <div key={i} className="link-wrapper">
                  <a
                    key={i}
                    href={getTransactionHistoryUrl(transaction)}
                    onMouseEnter={() => {
                      setTooltipId(i);
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="transaction-row">
                      <div className="status">
                        {['PENDING', 'INIT'].includes(transaction.status) || (transaction.status === 'ERRORED' && transaction.errorMsg === null)
                          ? (
                          <Loader size={0.2} />
                            )
                          : (
                          <Image alt="" src={getStatusIcon(transaction)} />
                            )}
                      </div>
                      <div className="type">{transaction.to.toLowerCase() === user.toLowerCase() ? 'Withdraw' : 'Deposit'}</div>
                      <div className="fud">{transaction.tokenId === 1 && transaction.value ? transaction.value : 0} FUD</div>
                      <div className="fomo">{transaction.tokenId === 2 && transaction.value ? transaction.value : 0} FOMO</div>
                      <div className="alpha">{transaction.tokenId === 3 && transaction.value ? transaction.value : 0} ALPHA</div>
                      <div className="kek">{transaction.tokenId === 4 && transaction.value ? transaction.value : 0} KEK</div>
                      <div className="time">{formatTime(new Date(transaction.createdAt))}</div>
                    </div>
                  </a>
                  <div className="tooltip-wrapper" style={{ display: tooltipId === i ? 'block' : 'none' }}>
                    <Tooltip title="Request ID:" message={transaction.id} actionType="copy"></Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
