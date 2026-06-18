import Image from 'next/image';
import { UpArrowIcon } from '../svgs';
import styles from './styles';

interface Props {
  name: string;
  currentValue: number | string;
  nextValue: number | string;
}

export const TraitUpgradeVertical = ({ name, currentValue, nextValue }: Props): JSX.Element => {
  return (
    <>
      <div className="trait-container">
        <div className="name">{name}</div>
        <div className="value">
          <div className="old-value">{currentValue}</div>
          <div className="new-label">New:</div>
          <div className="new-value">{nextValue}</div>
          <UpArrowIcon width={40} height={36} />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
