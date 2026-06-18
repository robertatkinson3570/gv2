import { ToastNotification } from 'components/UI/component';
import { Portal } from 'components/utility/Portal';
import { useNotification } from 'contexts/NotificationContext';
import { capitalizeFirstLetter } from 'helpers/functions';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useEffect, useState } from 'react';
import { GlobalNotification, GlobalTransactionNotification } from 'types';
import styles from './styles';

export const NotificationStack = () => {
  const [{ notifications, transactionNotifications }, dispatch] = useNotification();
  const { success, oops, sending } = useAavegotchiSound();

  const [currentNotification, setCurrentNotification] = useState<GlobalNotification>();
  const [displayNotifaction, setDisplayNotification] = useState(false);

  const [currentTransactionNotification, setCurrentTransactionNotification] = useState<GlobalTransactionNotification>();
  const [displayTransactionNotifaction, setDisplayTransactionNotification] = useState(false);

  const playSound = (type: 'info' | 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success':
        success();
        break;
      case 'error':
        oops();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (currentNotification) {
      setDisplayNotification(true);
      if (currentNotification.options?.sound) playSound(currentNotification.type);

      const displayTimeout = setTimeout(() => {
        setDisplayNotification(false);
      }, 4700);

      const notificationTimeout = setTimeout(() => {
        setCurrentNotification(undefined);
        dispatch({
          type: 'HIDE_NOTIFICATION',
          id: currentNotification.id,
        });
      }, 5200);

      return () => {
        clearTimeout(displayTimeout);
        clearTimeout(notificationTimeout);
      };
    }
  }, [currentNotification]);

  useEffect(() => {
    if (notifications.length) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications]);

  useEffect(() => {
    if (transactionNotifications[0] && transactionNotifications[0].status !== 'pending') {
      if (transactionNotifications[0].options?.sound) playSound(transactionNotifications[0]?.status);
      const displayTimeout = setTimeout(() => {
        setDisplayTransactionNotification(false);
      }, 4700);

      const notificationTimeout = setTimeout(() => {
        setCurrentTransactionNotification(undefined);
      }, 5000);

      return () => {
        setDisplayTransactionNotification(false);
        setCurrentTransactionNotification(undefined);
        clearTimeout(displayTimeout);
        clearTimeout(notificationTimeout);
      };
    }
  }, [transactionNotifications[0]?.status]);

  useEffect(() => {
    if (transactionNotifications.length) {
      if (transactionNotifications[0].options?.sound) sending();
      setCurrentTransactionNotification(transactionNotifications[0]);
      setDisplayTransactionNotification(true);
    }
  }, [transactionNotifications?.length]);

  return (
    <Portal>
      <>
        {(currentNotification ?? currentTransactionNotification) && (
          <div className="stack-container">
            {currentTransactionNotification && (
              <div className={`notification-container ${displayTransactionNotifaction ? 'show' : 'hide'}`}>
                <ToastNotification
                  key={currentTransactionNotification.id}
                  type={currentTransactionNotification.status}
                  title={capitalizeFirstLetter(currentTransactionNotification.title ?? currentTransactionNotification.status)}
                  message={currentTransactionNotification.message.toLowerCase()}
                />
              </div>
            )}
            {currentNotification && (
              <div className={`notification-container ${displayNotifaction ? 'show' : 'hide'}`}>
                <ToastNotification
                  key={currentNotification.id}
                  type={currentNotification.type}
                  title={currentNotification.title}
                  message={currentNotification.message}
                />
              </div>
            )}
          </div>
        )}
      </>
      <style jsx>{styles}</style>
    </Portal>
  );
};
