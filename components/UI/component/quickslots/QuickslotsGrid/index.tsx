import styles from './styles';
import { useEffect, useState } from 'react';
import { useRealm } from 'contexts/RealmContext';
import _ from 'lodash';
import { QuickslotsType } from 'types';
import { emptyQuickslots } from 'helpers/items.helpers';
import QuickslotItem from '../QuickslotItem';

interface Props {
  borderColor: string;
}

const QuickslotsGrid = ({ borderColor }: Props): JSX.Element => {
  // Init empty quickslots with hotKey === id (pressing 1 will trigger first quickslot)
  const [quickslotItems, setQuickSlotItems] = useState<QuickslotsType>(emptyQuickslots);
  const [{ userQuickslots }] = useRealm();

  useEffect(() => {
    // assign Quickslots based on userQuickslots received form BE;
    const currentQuickslots: QuickslotsType = _.cloneDeep(emptyQuickslots);
    _.each(userQuickslots, (quickslot) => (currentQuickslots[quickslot.slotIndex || 0].item = quickslot));
    setQuickSlotItems(currentQuickslots);
  }, [userQuickslots]);

  return (
    <div className="quickslots-grid">
      {_.map(quickslotItems, (slot) => (
        <QuickslotItem key={slot.index} slot={slot} borderColor={borderColor} />
      ))}
      <style jsx>{styles}</style>
    </div>
  );
};

export default QuickslotsGrid;
