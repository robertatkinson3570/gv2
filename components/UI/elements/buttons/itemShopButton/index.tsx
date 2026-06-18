import { ItemShopImg, ItemShopSm } from 'assets';
import { ActionButton } from '../actionButton';
import { Tab } from '../tabButton';

interface ItemShopButtonProps {
  open: boolean;
  toggle: () => void;
}
export const ItemShopButton = ({ open, toggle }: ItemShopButtonProps) => {
  return !open
    ? (
    <ActionButton color="info" img={ItemShopImg} onClick={toggle} text="ITEM SHOP" isAlienFont />
      )
    : (
    <Tab img={ItemShopSm} onClick={toggle} active />
      );
};
