import { GlobalNotification, GlobalTransactionNotification, StatusStack } from 'types';

export interface State {
  notifications: GlobalNotification[];
  transactionNotifications: GlobalTransactionNotification[];
  inventoryUpdates: number[];
  withdrawlNotificationId?: string;
  statusStack: StatusStack;
}

export const initialState: State = {
  notifications: [],
  transactionNotifications: [],
  inventoryUpdates: [],
  statusStack: { stack: {} },
};
