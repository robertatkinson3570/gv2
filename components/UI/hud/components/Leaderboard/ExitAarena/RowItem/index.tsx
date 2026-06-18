import { GotchiSVG } from 'components/UI/widgets';
import styles from './styles';
import _ from 'lodash';
import { nFormatter } from 'shared_code/utils/shared.utils.ethers';

interface Tips {
  [key: string]: number;
}

interface Props {
  rank: number;
  id: number;
  name: string;
  active: boolean;
  tips: Tips;
  tipsSent: number;
  fetching?: boolean;
}

const RowItem = ({ rank, id, name, active, tips, tipsSent, fetching }: Props) => {
  return (
    <>
      <div className={`row-item ${active && 'active'}`}>
        <div className="rank">{!fetching ? rank : '-'}</div>
        <div className="thumb">{!fetching && id && <GotchiSVG tokenId={id.toString()} height={4} radius={1} />}</div>
        <div className="meta">
          <span className="name">{active ? 'YOU' : name.length >= 20 ? `${name.substring(0, 20)}...` : name}</span>
          <div className="stats">
            <span className="alchemica">
              {_.keys(tips).map((key) => (
                <span
                  key={key}
                  style={{
                    color: `var(--col-text-${key.toLowerCase()}-2)`,
                  }}
                >
                  {nFormatter(Number(tips[key]), 0)}
                </span>
              ))}
            </span>
            <span className="value">
              Msg Sent: <span>{nFormatter(Number(tipsSent), 2)}</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default RowItem;
