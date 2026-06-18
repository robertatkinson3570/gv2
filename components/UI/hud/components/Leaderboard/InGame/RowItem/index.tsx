import { Fragment, ReactNode } from 'react';
import Image from 'next/image';
import { GotchiSVG } from 'components/UI/widgets';
import { TimeIcon } from 'assets';
import styles from './styles';
import _ from 'lodash';

interface Stats {
  [key: string]: {
    value: number;
    icon: ReactNode;
  };
}

interface Props {
  rank: number;
  id: number;
  name: string;
  active: boolean;
  stats: Stats[];
  time: string;
  fetching?: boolean;
}

const RowItem = ({ rank, id, name, active, stats, time, fetching }: Props) => {
  return (
    <>
      <div className={`row-item w-full h-fit ${active && 'active'}`}>
        <div className="rank">{!fetching ? rank : '-'}</div>
        <div className="thumb">{!fetching && id && <GotchiSVG tokenId={id.toString()} height={3.5} radius={1} />}</div>
        <div className="meta">
          <span className="name">{active ? 'YOU' : name.length >= 20 ? `${name.substring(0, 20)}...` : name}</span>
          <div className="meta-row">
            <span className="stats">
              {fetching
                ? _.map(['kills', 'deaths', 'hits'], (index) => (
                    <Fragment key={index}>
                      <span className={`icon ${active && 'active'}`}></span>
                      <span>-</span>
                    </Fragment>
                ))
                : _.map(stats, ({ stat: { icon, value } }, index) => (
                    <Fragment key={index}>
                      <span className={`icon ${active && 'active'}`}>{icon}</span>
                      <span>{value}</span>
                    </Fragment>
                ))}
            </span>
            <span className="time">
              <span className="icon">
                <Image alt="" src={TimeIcon} objectFit="contain" />
              </span>
              <span>{time}</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default RowItem;
