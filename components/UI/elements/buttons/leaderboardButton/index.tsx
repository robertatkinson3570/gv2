import { TrophyIcon } from 'assets';
import Image from 'next/image';
import styles from './styles';

interface Props {
  onClick: () => void;
}

export const LeaderboardButton = ({ onClick }: Props): JSX.Element => {
  return (
    <>
      <div className="leaderboard-btn-container">
        <div className="trophy-icon-container">
          <div className="trophy-icon">
            <Image alt="" src={TrophyIcon} layout="fill" />
          </div>
        </div>
        <div className="cta-container" onClick={onClick}>
          <div className="cta-inner">
            <div className="btn-container">
              <div className="btn-inner">{'aarena leaderboard'}</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
