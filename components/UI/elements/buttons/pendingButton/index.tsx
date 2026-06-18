import styles from './styles';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { IndentedPanel } from 'components/UI/component';
import { Loader } from '../..';

interface Props {
  title: string;
  message: string;
  onClick: () => void;
}

export const PendingButton = ({ title, message, onClick }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    click();
    onClick();
  };

  return (
    <>
      <button className="button-container" onClick={handleClick}>
        <IndentedPanel hideSides={{ top: true }}>
          <div className="inner">
            <div className="loader-container">
              <IndentedPanel>
                <div className="loader-inner">
                  <Loader color="pink" size={0.3} />
                </div>
              </IndentedPanel>
            </div>
            <div className="message-container">
              <p>{title}</p>
              <p>{message}</p>
            </div>
          </div>
        </IndentedPanel>
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
