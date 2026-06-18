import styles from './styles';
import Image from 'next/image';
import { useRealm } from 'contexts/RealmContext';
import { useEffect } from 'react';
import { useGame } from 'contexts/GameContext';

interface Props {
  max: number;
  current: number;
  iconData: {
    icon: string;
    width: number;
    height: number;
  };
  color?: 'pink' | 'info' | 'purple';
  showNum?: boolean;
  increase?: string;
}

export const HealthBar = ({ max, current, iconData, color = 'pink', showNum = false, increase = '' }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const [{ health }] = useRealm();
  let width = current / max;

  useEffect(() => {
    width = Math.min(1, health / max);
  }, [health]);

  return (
    <>
      <div className={`health-bar-container ${gameConfig.gotchiverseTheme}`}>
        <div className="icon-container">
          <Image alt="" src={iconData.icon} width={iconData.width} height={iconData.height} />
        </div>
        <div className={`health-bar ${color} ${showNum ? 'numeric' : ''}`}>
          <div className={`current-health  ${width <= 0.025 ? 'low-health' : 'high-health'}`} style={{ width: `${width * 100}%` }}></div>
          {showNum && <div className="numeric-data">{`${current}/${max}`}</div>}
          {showNum && <div className="increase">{increase}</div>}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
