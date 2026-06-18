/* eslint-disable no-case-declarations */
import { Action } from './reducer';
import {
  Notification,
  NotificationDetails,
  Status,
  StatusNotification,
  StatusNotificationOptions,
  StatusNotificationType,
  TransactionNotification,
} from 'types';
import React from 'react';
import GlobalState from 'contexts/GlobalState';
import _ from 'lodash';
import { getErrMessage } from 'helpers/ethers.helper';

const installationIdToName = (id: number) => {
  if (id === 0) return 'Alchemical Aaltar';
  return `Item Id: ${id}`;
};

export const getRandomId = (): string => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
};

interface SignatureMessage {
  message: string;
  error: string;
}

const getDefaultSignatureMessagePerType = (type: StatusNotificationType, info?: string): SignatureMessage => {
  switch (type) {
    case 'purchase':
      return {
        message: `Sign this message to confirm your ${info || 'items'} purchase! \n\nAlchemica will be deducted from your player wallet!`,
        error: 'Purchase Error',
      };
    default:
      break;
  }
};

const getDefaultNotificationPerType = (type: StatusNotificationType, info?: string): NotificationDetails => {
  switch (type) {
    case 'purchase':
      return { message: 'PURCHASE ITEMS', title: info };

    default:
      break;
  }
};

export const handleStatusNotification = async (notification: StatusNotification, options?: StatusNotificationOptions): Promise<void> => {
  // console.log('@handleStatusNotification:notification', notification);

  const dispatch = GlobalState.NOTIFICATION.dispatch;
  const statusStack = _.cloneDeep(GlobalState.NOTIFICATION.state.statusStack.stack); // use clone since we don't want to modify the globalState directly
  let notificationId = statusStack[notification.type];
  const status: Status = notification?.data?.status;

  // Sanity Check -  return if no status was received.
  if (!status) return;
  // Check if notification was initiated, we cannot update a notification if it was not created!
  if (!notificationId && status !== 'init') {
    console.warn(`@handleStatusNotification: notification for type ${notification.type}, was not initiated! `);
    return;
  }

  switch (notification.data.status) {
    case 'init':
      // init notification id and add it to notification stack per type. This way we will assure each notification type will have only one notification running
      if (notificationId) console.warn(`@handleStatusNotification: type ${notification.type} already has an active notification!`);

      const statusNotification: TransactionNotification = getDefaultNotificationPerType(notification.type, notification.data.info);
      // Handle init signature;
      if (options?.signature) {
        const signature = await handleSignature(notification.type, dispatch, notification.data.info);
        // return if user rejected signature !
        if (!signature) return;
      }
      if (options?.sound) _.assign(statusNotification, { options: { sound: true } });
      notificationId = showTransactionNotification(dispatch, statusNotification);
      dispatch({
        type: 'UPDATE_STATUS_STACK',
        statusStack: {
          stack: { ...statusStack, [notification.type]: notificationId },
        },
      });
      break;
    case 'pending': // do nothing let it run.
      break;
    case 'success':
      _.delay(() => updateTransactionNotificationStatus(dispatch, notificationId, 'success'), 1000);
      // updateTransactionNotificationStatus(dispatch, notificationId, 'success');

      break;
    case 'failed':
      _.delay(() => updateTransactionNotificationStatus(dispatch, notificationId, 'error', notification.data.error), 1000);
      // updateTransactionNotificationStatus(dispatch, notificationId, 'error', notification.data.error);

      break;
    default:
      break;
  }

  // clean stack after resolve
  if (status === 'success' || status === 'failed') {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (_.has(statusStack, [notification.type])) delete statusStack[notification.type];
    dispatch({
      type: 'UPDATE_STATUS_STACK',
      statusStack: {
        stack: { ...statusStack },
      },
    });
  }
};

const handleSignature = async (type: StatusNotificationType, dispatch: React.Dispatch<Action>, info?: string): Promise<boolean> => {
  const defaultMessageByType = getDefaultSignatureMessagePerType(type, info);

  try {
    await GlobalState.WEB3.state.ethersSigner.signMessage(defaultMessageByType.message);
    return true;
  } catch (error) {
    showNotification(dispatch, {
      type: 'error',
      title: getErrMessage(error),
      message: defaultMessageByType.error,
      options: { sound: true },
    });
    return false;
  }
};

export const showNotificationWithTimeout = (dispatch: React.Dispatch<Action>, notification: Notification): void => {
  const id = getRandomId();

  dispatch({
    type: 'SHOW_NOTIFICATION',
    notification: {
      ...notification,
      id,
    },
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE_NOTIFICATION',
      id,
    });
  }, 5000);
};

export const showNotification = (dispatch: React.Dispatch<Action>, notification: Notification): void => {
  const id = getRandomId();
  dispatch({
    type: 'SHOW_NOTIFICATION',
    notification: {
      ...notification,
      id,
    },
  });
};

export const showTransactionNotification = (dispatch: React.Dispatch<Action>, notification: TransactionNotification): string => {
  const id = getRandomId();
  dispatch({
    type: 'SHOW_TRANSACTION_NOTIFICATION',
    transactionNotification: {
      ...notification,
      id,
      status: 'pending',
    },
  });

  return id;
};

export const updateTransactionNotificationStatus = (
  dispatch: React.Dispatch<Action>,
  id: string,
  status: 'success' | 'error',
  title?: string,
): void => {
  dispatch({
    type: 'UPDATE_TRANSACTION_NOTIFICATION_STATUS',
    id,
    status,
    title,
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE_TRANSACTION_NOTIFICATION',
      id,
    });
  }, 5000);
};

export const handleCompletedCraft = (dispatch: React.Dispatch<Action>, ids: number[], name: string): void => {
  const grouped = ids.reduce((acc: number[][], id) => {
    const index = acc.findIndex((array) => array.includes(id));
    if (index > -1) {
      acc[index].push(id);
    } else {
      acc.push([id]);
    }
    return acc;
  }, []);

  grouped.forEach((group) => {
    showNotificationWithTimeout(dispatch, {
      type: 'success',
      title: 'Completed crafting',
      message: `${name}${group.length > 1 ? ` (x${group.length})` : ''}`,
    });
  });

  dispatch({
    type: 'UPDATE_INVENTORY_UPDATES',
    inventoryUpdates: ids,
  });
};
