import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';
import Image from 'next/image';
import { useGame } from 'contexts/GameContext';

interface Props {
  options: string[] | Array<{ value: string; icon: string; name: string }>;
  onSelect: (value: string) => void;
  currentOption: string;
  secondaryColor?: boolean;
}

export const Tabs = ({ options, onSelect, currentOption, secondaryColor }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();
  return (
    <>
      <ul className={`tabs-container ${secondaryColor ? 'secondary' : gameConfig.gotchiverseTheme}`}>
        {options.map((option, i) => {
          return (
            <li
              key={i}
              className={`tab ${currentOption === option || currentOption === option.value ? 'active' : ''}`}
              onClick={() => {
                if (currentOption !== option) click();
                onSelect(option.value || option);
              }}
              tabIndex={0}
            >
              {option.icon && (
                <span className="tab-icon">
                  <Image alt="" src={option.icon} height={36} width={36} objectPosition="center" />
                </span>
              )}
              <span className="tab-text">{option.name || option}</span>
            </li>
          );
        })}
      </ul>
      <style jsx>{styles}</style>
    </>
  );
};
