import { InstallationDisplayImg } from 'components/UI/elements';
import { OngoingUpgrades } from 'types';
import styles from './styles';

interface Props {
  installation: OngoingUpgrades;
  progress: string;
}

export const UpgradeCard = ({ installation, progress }: Props): JSX.Element => {
  const spliceOutLevelFromName = (name: string) => {
    const spliced = name.split('Level');
    return spliced[0];
  };

  return (
    <>
      <div className={`card-container ${progress === '100%' ? 'complete' : ''}`}>
        {installation.level && (
          <div className="level-container">
            <p>{installation.level}</p>
            <small>Level</small>
          </div>
        )}
        <div className="img-container">
          <InstallationDisplayImg type="INSTALLATION" itemId={installation.installationId + 1} />
          <div className="progress-overlay">
            <p>{progress}</p>
          </div>
        </div>
        <div className="name-container">
          <p>{spliceOutLevelFromName(installation.name)}</p>
          {progress !== '100%' && (
            <div className="progress-bar">
              <div className="current-progress" style={{ width: progress }}></div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
