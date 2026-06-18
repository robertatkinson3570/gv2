import { Action } from './reducer';
import { TransactionState } from './store';
import GameController from '../../components/controllers/GameController';
import InputController from 'components/controllers/inputController';
import { Direction } from 'types';
import Players from 'components/phaser/Players';
import { scene } from 'components/controllers/SceneController';

interface WithdrawDialog {
  withdrawDialogState?: boolean;
  alchemica?: number[];
  depositId?: number;
}

export const updateWithdrawDialog = (data: WithdrawDialog, dispatch: React.Dispatch<Action>) => {
  const { withdrawDialogState, alchemica, depositId } = data;
  dispatch({
    type: 'UPDATE_DIALOG_MODAL_OPEN',
    withdrawDialogState,
    alchemica: alchemica || [0, 0, 0, 0],
    depositId,
  });
};

export const updateTransactionState = (transactionState: TransactionState, dispatch: React.Dispatch<Action>) => {
  dispatch({
    type: 'UPDATE_TRANSACTION_STATE',
    transactionState,
  });
};
export const updateTransactionStatusUpdate = (transactionStatusUpdate: TransactionState, dispatch: React.Dispatch<Action>) => {
  dispatch({
    type: 'UPDATE_TRANSACTION_STATUS_UPDATE',
    transactionStatusUpdate,
  });
};

export const updateInGameAlchemica = (inGameAlchemica: number[], dispatch: React.Dispatch<Action>) => {
  dispatch({
    type: 'UPDATE_IN_GAME_ALCHEMICA',
    inGameAlchemica,
  });
};

export const postFocusStatus = (newFocus: boolean, dispatch: React.Dispatch<Action>): void => {
  GameController.sendData('interaction', 'focus', { label: newFocus ? '1' : '0' });
  if (!newFocus) {
    scene.isSprint = false;
    GameController.sendData('movement', 'toggle_sprint', { action: 'stop' });
    Players.updateServerDirection(Direction.NONE, false);
  }
  dispatch({
    type: 'UPDATE_FOCUS',
    currentFocus: newFocus,
  });
};
