// import { ChatIcon } from 'assets';
import { ChatIcon } from 'components/UI/elements';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useRealm } from 'contexts/RealmContext';
import styles from './styles';
import Image from 'next/image';
import { getThemeColor } from 'helpers/functions';
import { IndentedPanel } from 'components/UI/component';

interface Props {
  onClick: () => void;
  hide: boolean;
}

export const ChatToggle = ({ onClick, hide }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  return (
    <>
      <div
        className={`clickable toggle-wrapper ${hide ? 'hide' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          click();
          onClick();
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <IndentedPanel hideSides={{ left: true }} isChatBtn={true} useTheme={true}>
          <div className="toggle-container">
            <ChatIcon fill={getThemeColor('', 400)} size={54} />
          </div>
        </IndentedPanel>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
