import Image from 'next/image';
import { UpArrowIcon } from '../svgs';
import styles from './styles';

interface Props {
  name: string;
  icon: string;
  value: number | string;
}

export const TraitMaximum = ({ name, icon, value = 0 }: Props): JSX.Element => {
  return (
    <>
      <div className="trait">
        <div className="name">{name}</div>
        <div className="trait-data">
          <div className="icon-container">
            <Image alt="" src={icon} width={44} height={44} />
          </div>
          <div className="value-container">
            <div className="trait-value">{value}</div>
            <UpArrowIcon width={21} height={27} />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
