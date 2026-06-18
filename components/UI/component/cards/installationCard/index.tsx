import styles from './styles';
import { BucketIcon, InstallationDisplayImg, LevelPin } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';

interface Props {
  typeId?: number;
  level?: number;
  pinLabel?: boolean;
  size?: number;
  progress?: string;
  percentage?: number;
  progressPos?: 'center' | 'bottom';
  color?: string; // 'pink' | 'info' | 'halloween';
  name?: string;
  scale?: number;
  type?: string;
}

export const InstallationCard = ({
  typeId,
  level,
  color = 'info',
  progress,
  size = 1,
  name,
  percentage,
  pinLabel = false,
  progressPos = 'center',
  scale,
  type,
}: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className="installation-card">
        <span className={`filter-wrapper ${color}`}>
          <div className={`card-container ${color} ${progress && progressPos === 'center' ? 'in-progress' : ''}`} style={{ fontSize: `${size}rem` }}>
            <div className={`content ${color}`}>
              {/* {!!typeId && <Image alt="" src={getInstallationDisplays(typeId).img} height={25 * size > 128 ? 128 : 25 * size} objectFit="cover" />} */}
              {!!typeId && (
                <InstallationDisplayImg type={'INSTALLATION'} itemId={typeId} withBG={false} installationScale={scale || (level < 8 ? 0.9 : 0.7)} />
              )}
              {level && (!pinLabel ? <span className={`card-title ${color}`}>{`Level ${level}`}</span> : <LevelPin level={level} />)}
              {name && (
                <div className="card-title">
                  <span className="text">{name}</span>
                </div>
              )}
            </div>
            <span className={`top-cap ${color}`}></span>
            {(!progress || progressPos === 'center') && <span className={`bottom-cap ${color}`}></span>}
            {progress && progressPos === 'center' && <h1 className="progress-percentage">{progress}</h1>}
          </div>
          {progress && progressPos === 'bottom' && (
            <div className={`progress-bottom-container ${color}`}>
              <div
                className={`progress-indicator ${type}`}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
              <div className="progress-value">{progress}</div>
            </div>
          )}
          {percentage === 100 && (
            <div className={`comment ${gameConfig.gotchiverseTheme}`}>
              <BucketIcon size={24} fill={`var(--col-${gameConfig.gotchiverseTheme === 'default' ? 'pink' : gameConfig.gotchiverseTheme}-300)`} />
              <span className="text">Ready to empty</span>
            </div>
          )}
        </span>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
