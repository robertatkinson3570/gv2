import { GltrIcon, TickIcon } from 'assets';
import { Button } from 'components/UI/elements';
import { numberWithCommas } from 'helpers/ethers.helper';
import { calculateTimeFromBlocks } from 'helpers/functions';
import Image from 'next/image';
import styles from './styles';

interface Props {
  blocks: number;
  maxValue: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMax: () => void;
  error?: boolean;
}

export const BlockTimer = ({ blocks, maxValue, value, onChange, onMax, error }: Props): JSX.Element => {
  return (
    <>
      <div className="container">
        <div className="estimated-time">
          <div className="label">{`TIME: ${calculateTimeFromBlocks(blocks) || 'INSTANT'} `}</div>
          <div className="blocks">{`BLOCKS: ${numberWithCommas(blocks, 0)}`}</div>
        </div>
        <hr className="divider" />
        <div className="gltr-container">
          <div className="speed-up">SPEED UP WITH GLTR</div>
          <div className="gltr-value">
            <div className={`input-container ${value ? 'active' : ''} ${error ? 'error' : ''}`}>
              <span className="gltr-icon">
                <Image alt="" src={GltrIcon} width={50} height={50} />
              </span>
              <div className="input">
                <input
                  className="gltr-input"
                  type="number"
                  placeholder={blocks?.toString() || '1000000'}
                  value={value}
                  onChange={onChange}
                  min={0}
                  max={maxValue || 1000000}
                />
              </div>
              <div className={`tick-icon ${blocks === 0 ? '' : 'hidden'}`}>
                <Image alt="" src={TickIcon} width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
        <Button secondary fullWidth size={2.4} onClick={onMax} disabled={blocks === 0}>
          + Max GLTR
        </Button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
