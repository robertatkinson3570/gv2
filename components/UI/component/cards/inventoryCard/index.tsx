import { InstallationDisabled, Rarity } from 'types';
import styles from './styles';
import { InstallationDisplayImg, LevelPin } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';

interface Props {
  installation: {
    name: string;
    rarity?: Rarity;
    itemType: number;
    alchemicaType?: number;
    width?: number;
    height?: number;
    itemId?: number;
    level?: number;
    type: 'INSTALLATION' | 'TILE';
    id: number;
  };
  quantity?: number;
  fontSize?: number;
  isDisabled?: InstallationDisabled;
}

export const InventoryCard = ({ installation, quantity, fontSize = 1, isDisabled }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const spliceOutLevelFromName = (name: string) => {
    const spliced = name.split('Level');
    return spliced[0];
  };
  const disableText = () => {
    if (isDisabled.reason) {
      return isDisabled.reason;
    } else if (installation.itemType === 1) {
      return (
        <>
          Requires{' '}
          <span style={{ textTransform: 'uppercase', color: 'var(--col-info-400)' }}>
            Reservoir {spliceOutLevelFromName(installation.name).replace('Harvester', '').trim()}{' '}
          </span>
        </>
      );
    } else if (installation.itemType === 2) {
      return (
        <>
          Require <span style={{ textTransform: 'uppercase', color: 'var(--col-info-400)' }}>Aaltar</span>
        </>
      );
    }
  };

  return (
    <>
      <div className={`card-container ${installation.rarity ? installation.rarity : gameConfig.gotchiverseTheme}`}>
        <div className={`card-content-wrapper  ${!isDisabled?.state ? '' : 'disabled'} `}>
          {installation.level && (
            <LevelPin level={installation.level} rarity={`${installation.rarity ? installation.rarity : undefined}`} isSmall={true} />
          )}
          <div className="img-container">
            {!!quantity && <span className="quantity">{quantity}</span>}
            <InstallationDisplayImg type={installation.type} itemId={installation.id} />
          </div>

          <div className="name-container">
            <p>{spliceOutLevelFromName(installation.name)}</p>
          </div>
        </div>

        {isDisabled?.state && (
          <div className="disable-container">
            <span className="disabled-text">{disableText()} </span>
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
