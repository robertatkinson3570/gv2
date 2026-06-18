/* eslint-disable curly */
import GlobalState from 'contexts/GlobalState';
import _ from 'lodash';
import { QuickslotUpdate } from 'types';

export const setQuickslotUpdate = (update: QuickslotUpdate): void => {
  // console.log('@setQuickslotUpdate:update', update);

  const userQuickSlotsByIndex = _.keyBy(_.cloneDeep(GlobalState.REALM.state.userQuickslots), 'slotIndex');

  // Update each prop received from BE.
  _.each(update.updatesByIndex, (updates, index) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (!updates) delete userQuickSlotsByIndex[index]; // remove if null received
    else
      userQuickSlotsByIndex[index] = userQuickSlotsByIndex[index]
        ? _.assign(userQuickSlotsByIndex[index], updates)
        : _.assign(updates, { slotIndex: index });
  });

  const userQuickslots = _.values(userQuickSlotsByIndex);
  // console.log('@setQuickslotUpdate:userQuickslots', userQuickslots);

  const dispatch = GlobalState.REALM.dispatch;
  dispatch({
    type: 'UPDATE_USER_QUICKSLOTS',
    userQuickslots,
  });
};
