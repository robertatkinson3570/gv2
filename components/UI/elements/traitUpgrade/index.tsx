import Image from 'next/image';
import styles from './styles';

interface Props {
  name?: string;
  icon?: string;
  currentValue?: number | string;
  nextValue?: number | string;
}

export const TraitUpgrade = ({ name = '', icon, currentValue = 0, nextValue = 0 }: Props): JSX.Element => {
  return (
    <>
      <div className="trait">
        <div className="trait-label">
          <p>{name}</p>
        </div>
        <div className="upgrade-container">
          <div className="icon-container">{icon && <Image alt="" src={icon} height={44} width={44} />}</div>
          <div className="upgrade-amount">
            <div className="old-container">
              <p>
                Old: <span>{currentValue}</span>
              </p>
            </div>
            <div className="new-container">
              <p>
                New: <span>{nextValue}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
