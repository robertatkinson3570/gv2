import styles from './styles';

interface Props {
  secondsLeft: number;
  profitSplit: {
    borrower: number;
    owner: number;
    other: number;
  };
}

export const LendingDetails = ({ secondsLeft, profitSplit }: Props): JSX.Element => {
  const formatTime = (seconds: number) => {
    if (seconds < 0) return "TIME'S UP!";

    const secondsPerDay = 86400;
    const days = Math.floor(seconds / secondsPerDay);

    const secondsPerHour = 3600;
    const hours = Math.floor((seconds % secondsPerDay) / secondsPerHour);

    const secondsPerMinute = 60;
    const minutes = Math.floor((seconds % secondsPerHour) / secondsPerMinute);

    const remainingSeconds = Math.floor(seconds % secondsPerMinute);

    if (days) return `${days}d ${hours}h ${minutes}m`;
    if (hours) return `${hours}h ${minutes}m ${remainingSeconds}s`;
    if (minutes) return `${minutes}m ${remainingSeconds}s`;
    if (remainingSeconds) return `${remainingSeconds}s`;
    return "TIME'S UP!";
  };

  return (
    <>
      <div className="lending-details-wrapper">
        <div className="details-container">
          <div className="session-time">
            <p className="label">Session time left:</p>
            <p className="time-left">{formatTime(secondsLeft)}</p>
          </div>
          <div className="key-container">
            {Object.keys(profitSplit).map((key, i) => (
              <div className={`key ${key}`} key={i}>
                <div className="indicator" />
                <p>
                  {key === 'borrower' ? 'You' : key}: {profitSplit[key] * 100}%
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="graph-container">
          {Object.keys(profitSplit).map((key, i) => (
            <div className={`slice ${key}`} style={{ height: `${profitSplit[key] * 100}%` }} key={i}>
              <p>{profitSplit[key] * 100}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
