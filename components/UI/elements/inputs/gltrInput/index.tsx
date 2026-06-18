import styles from './styles';
import Image from 'next/image';
import { GltrIcon } from 'assets';

interface Props {
  value: string;
  maxGltr: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export const GltrInput = ({ value, onChange, error, maxGltr }: Props): JSX.Element => {
  return (
    <>
      <div className={`input-container ${value ? 'active' : ''} ${error ? 'error' : ''}`}>
        <div className="gltr-container">
          <span className="gltr-icon">
            <Image alt="" src={GltrIcon} width={50} height={50} />
          </span>
        </div>
        <div className="input">
          <label className="label">Speed up:</label>
          <input className="gltr-input" type="number" placeholder="1000000" value={value} onChange={onChange} min={0} max={maxGltr || 1000000} />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
