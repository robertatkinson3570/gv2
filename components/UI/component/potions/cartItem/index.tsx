import { CloseIcon } from 'components/UI/elements';
import Image from 'next/image';
import { ShopItem } from 'types';
import styles from './styles';

interface CartItemProps {
  item: ShopItem;
  editable?: boolean;
  count: number;
  onClose?: () => void;
}

export const CartItem = ({ item, editable = false, count, onClose }: CartItemProps): JSX.Element => {
  return (
    <>
      <div className={`cart-item-container ${editable ? 'editable' : ''}`}>
        <div className="icon-container">
          <Image alt="" src={item.quickslotImage} layout="fill" />
        </div>
        <div className="counter">x{count}</div>
        {editable && (
          <div className="btn-close flex-c-c" onClick={onClose}>
            <CloseIcon fill="var(--col-info-800)" size="0.9rem" />
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
