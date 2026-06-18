import { State } from './store';
import { GlobalTransactionNotification, Notification } from 'types';

interface GlobalNotification extends Notification {
  id: string;
}

export type Action =
  | { type: 'SHOW_NOTIFICATION'; notification: GlobalNotification }
  | { type: 'HIDE_NOTIFICATION'; id: string }
  | { type: 'SHOW_TRANSACTION_NOTIFICATION'; transactionNotification: GlobalTransactionNotification }
  | { type: 'UPDATE_TRANSACTION_NOTIFICATION_STATUS'; id: string; status: 'success' | 'error' | 'pending'; title?: string }
  | { type: 'HIDE_TRANSACTION_NOTIFICATION'; id: string }
  | { type: 'UPDATE_WITHDRAWL_NOTIFICATION_ID'; withdrawlNotificationId: State['withdrawlNotificationId'] }
  | { type: 'UPDATE_INVENTORY_UPDATES'; inventoryUpdates: State['inventoryUpdates'] }
  | { type: 'UPDATE_STATUS_STACK'; statusStack: State['statusStack'] }
  | { type: 'REMOVE_INVENTORY_NOTIFICATION' };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    case 'UPDATE_WITHDRAWL_NOTIFICATION_ID':
      return {
        ...state,
        withdrawlNotificationId: action.withdrawlNotificationId,
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((item) => item.id !== action.id),
      };
    case 'SHOW_TRANSACTION_NOTIFICATION':
      return {
        ...state,
        transactionNotifications: [...state.transactionNotifications, action.transactionNotification],
      };
    case 'UPDATE_TRANSACTION_NOTIFICATION_STATUS': {
      const transNotifications = [...state.transactionNotifications];
      const selectedNotification = transNotifications.find((notification) => notification.id === action.id);

      if (selectedNotification) {
        selectedNotification.status = action.status;
        selectedNotification.title = action.title ? action.title : action.status;
        return {
          ...state,
          transactionNotifications: transNotifications,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'HIDE_TRANSACTION_NOTIFICATION': {
      return {
        ...state,
        transactionNotifications: state.transactionNotifications.filter((item) => item.id !== action.id),
      };
    }
    case 'UPDATE_STATUS_STACK': {
      return {
        ...state,
        statusStack: action.statusStack,
      };
    }
    case 'UPDATE_INVENTORY_UPDATES': {
      return {
        ...state,
        inventoryUpdates: [...state.inventoryUpdates, ...action.inventoryUpdates],
      };
    }
    case 'REMOVE_INVENTORY_NOTIFICATION': {
      return {
        ...state,
        inventoryUpdates: [],
      };
    }
    default:
      return state;
  }
};
