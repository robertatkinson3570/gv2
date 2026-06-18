/* eslint-disable multiline-ternary */
import Image from 'next/image';
import { Inactive } from 'assets';
import { useEffect, useState } from 'react';
import { Quickslot, ShopItem } from 'types';
import { getItemCooldownLeft, handleQuickslotAction, shopItemsById } from 'helpers/items.helpers';
import styles from './styles';

interface Props {
  slot: Quickslot;
  borderColor: string;
}

export const QuickslotItem = ({ slot, borderColor }: Props): JSX.Element => {
  const [cooldownDuration, setCooldownDuration] = useState(0);
  const [item, setItem] = useState<ShopItem>();

  const handleItemAction = (): void => {
    if (cooldownDuration || !item) return;
    handleQuickslotAction(slot.index);
  };

  useEffect(() => {
    const item: ShopItem = slot.item?.id ? shopItemsById[slot.item.id] : undefined;
    setItem(item);
    if (!item) return;
    const cooldownLeft = getItemCooldownLeft(slot.item);
    setCooldownDuration(cooldownLeft);

    if (!cooldownLeft) return;

    const cooldownTimer = setTimeout(() => {
      setCooldownDuration(0);
    }, cooldownLeft);
    return () => clearTimeout(cooldownTimer);
  }, [slot, shopItemsById]);

  return (
    <>
      <button type="button" className="quickslot-item box-inset-shadow" onClick={handleItemAction}>
        <div
          className="potion-image"
          style={{
            opacity: cooldownDuration || (item && !slot.item?.quantity) ? 0.3 : 1,
          }}
        >
          <Image src={item ? item.quickslotImage : Inactive} alt="potion" layout="fill" objectFit="contain" />
        </div>
        {/* Hotkey mapped to trigger the action, hooked up in items */}
        {item && !isNaN(Number(slot?.hotkey)) && <span className="hotkey">{slot.hotkey}</span>}
        {item && !isNaN(Number(slot?.item?.quantity)) && <span className="count">{slot.item.quantity}</span>}
        <div className={`cooldown-overlay ${cooldownDuration ? 'animate' : ''}`} />
      </button>
      <style jsx>{`
        .quickslot-item {
          --border-color: ${borderColor};
          --cooldown-duration: ${cooldownDuration}ms;
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};

export default QuickslotItem;
