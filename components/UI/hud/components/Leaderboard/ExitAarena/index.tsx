/* eslint-disable multiline-ternary */
import { BasePanel } from 'components/UI/component';
import { LeaderboardData } from 'types';
import _ from 'lodash';
import styles from './styles';
import RowItem from './RowItem';
import Image from 'next/image';
import { TrophyIcon } from 'assets';

interface Props {
  fetching: boolean;
  data: LeaderboardData[];
}

const ExitAarena = ({ fetching, data }: Props): JSX.Element => {
  return (
    <div className="leaderboard-wrapper">
      <BasePanel
        title={{
          value: 'Superchat Leaderboard',
          background: 'blue-900',
          fontSize: 1.3,
          padding: '1.25rem 1.5rem 0.75rem 1.5rem',
          fontFamily: 'Alien Encounters Solid',
        }}
        inherit={{
          width: false,
          height: false,
        }}
        sides={{
          color: 'info-400',
          size: 15,
          thickness: 4,
        }}
        content={{
          padding: 0,
        }}
        background={{
          color: 'blue-950',
          opacity: 0.7,
          hasShadow: true,
        }}
      >
        <div className="leaderboard-inner">
          {fetching
            ? _.range(5).map((i) => <RowItem key={i} rank={0} id={0} tips={{}} tipsSent={0} name="Loading..." active={i === 3} fetching={fetching} />)
            : _.filter(data, (item) => !!item).map((item, key) => (
                <RowItem
                  key={key}
                  id={item.id}
                  rank={item.rank}
                  name={item.name}
                  tips={item.tips}
                  tipsSent={item.tipsSent}
                  active={key === data.length - 1}
                />
            ))}
        </div>
        <div className="leaderboard-action w-full h-fit">
          <div className="trophy-icon">
            <Image alt="" src={TrophyIcon} objectFit="contain" />
          </div>
          <a className="leaderboard-action-link" target="_blank" href="/leaderboard" rel="noopener noreferrer">
            <span>See Full Leaderboard &gt;</span>
          </a>
        </div>
      </BasePanel>
      <style jsx>{styles}</style>
    </div>
  );
};

export default ExitAarena;
