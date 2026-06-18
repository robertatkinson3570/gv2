import Image from 'next/image';
import styles from './styles';
import { useGame } from 'contexts/GameContext';

interface Props {
  label: string;
  icon: string;
  value: string;
}

export const ParamStatus = ({ label, icon, value }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`container ${gameConfig.gotchiverseTheme}`}>
        <span className="label">{label}</span>
        <div className="content">
          <div className="iconWrapper">
            <Image alt="" src={icon} width={30} height={30} layout="fixed" />
          </div>
          <div className="value">{value}</div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </>
  );
};
