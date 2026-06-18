import { BulletIcon, CrosshairIcon, SkullIcon, TrophyBgIcon } from 'assets';
import Image from 'next/image';
import { useState } from 'react';

import RowItem from './RowItem';
import styles from './styles';
import _ from 'lodash';
import { ActionButton } from 'components/UI/elements';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { LeaderboardData } from 'types';

interface Props {
  fetching: boolean;
  data: LeaderboardData[];
}

const icons = {
  kills: BulletIcon,
  hits: CrosshairIcon,
  deaths: SkullIcon,
};

const InGame = ({ fetching, data }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { click } = useAavegotchiSound();

  const formatTime = (secs: number) => {
    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
    const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
    const days = Math.floor(secs / SECONDS_PER_DAY);
    const hours = Math.floor(secs / SECONDS_PER_HOUR);
    const minutes = Math.floor((secs % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
    const seconds = secs % SECONDS_PER_MINUTE;
    if (days) return `${days}d ${hours}h ${minutes}m`;
    if (hours) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div className={`leaderboard-wrapper ${open ? 'open' : ''}`}>
        <div className="leaderboard-toggle">
          <ActionButton
            size={2.2}
            img={TrophyBgIcon}
            onClick={() => {
              click();
              setOpen(!open);
            }}
            color="purple"
            hoverColor="purple"
            active={open}
            clipPathType="triangle"
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          {fetching
            ? _.range(4).map((i) => <RowItem key={i} rank={0} id={0} name="Loading..." stats={[]} time="" active={i === 3} fetching={fetching} />)
            : _.map(data, (item, key) => (
                <RowItem
                  key={key}
                  id={item.id}
                  rank={item.rank}
                  name={item.name}
                  stats={_.map(['kills', 'deaths', 'hits'], (key) => ({
                    stat: {
                      value: item[key],
                      icon: <Image alt="" src={icons[key]} objectFit="contain" />,
                    },
                  }))}
                  time={formatTime(item.sessionTime)}
                  active={key === data.length - 1}
                />
            ))}
        </div>
        <div className="leaderboard-action w-full h-fit">
          <a className="leaderboard-action-link" target="_blank" href="/leaderboard" rel="noopener noreferrer">
            <span>See Full Leaderboard &gt;</span>
          </a>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default InGame;
