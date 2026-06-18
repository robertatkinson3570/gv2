import Truncate from 'components/UI/widgets/Truncate';
import Image from 'next/image';
import styles from './styles';

interface Props {
  icon: string;
  label: string;
  value: number | string;
}

export const GotchiStat = ({ icon, label, value }: Props) => {
  return (
    <>
      <div className="stat-details">
        <div className="stat-icon">
          <Image alt="" src={icon} objectFit="contain" />
        </div>
        <div className="stat-description">
          <span className="value">
            <Truncate chars={16}>{label}</Truncate>
          </span>
        </div>
        <div className="stat-value">
          <span className="value">{value}</span>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
