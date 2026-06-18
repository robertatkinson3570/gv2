import styles from './styles';
import { HealthBar } from 'components/UI/elements';
import { HeartHalloweenIcon, HeartIcon } from 'assets';
import { IndentedPanel, UserPortrait } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';

interface Props {
  name: string;
  health: {
    current: number;
    max: number;
  };
  hideHealth?: boolean;
  img: string;
  backgroundColor?: string;
  isSpectator?: boolean;
}

export const UsersHealthPanel = ({ name, health, img, backgroundColor = '#002278', hideHealth = false, isSpectator = false }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const blockPropagation = (e) => e.stopPropagation();

  return (
    <IndentedPanel hideSides={{ top: true, right: true }} isThin={true} useTheme={true}>
      <div className="panel-content" onClick={blockPropagation} onMouseDown={blockPropagation}>
        <UserPortrait
          img={img}
          backgroundColor={backgroundColor}
          staticImg={true}
          isSpectator={isSpectator}
          borderColor={
            gameConfig.gotchiverseTheme && gameConfig.gotchiverseTheme !== 'default' && gameConfig.gotchiverseTheme !== 'tooorkey'
              ? `var(--col-${gameConfig.gotchiverseTheme}-border)`
              : 'var(--col-mythical-400)'
          }
        />
        <div className="details-container">
          <h3 className={`user-name ${hideHealth ? 'small' : ''}`}>{name}</h3>
          {!hideHealth && (
            <HealthBar
              iconData={{ icon: gameConfig.gotchiverseTheme === 'halloween' ? HeartHalloweenIcon : HeartIcon, width: 22, height: 24 }}
              max={health.max}
              current={health.current}
            />
          )}
        </div>
      </div>
      <style jsx>{styles}</style>
    </IndentedPanel>
  );
};
