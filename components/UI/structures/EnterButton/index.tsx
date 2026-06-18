/* eslint-disable multiline-ternary */
import styles from './styles';

interface Props {
  label?: string;
  onClick?: () => void;
}

export const EnterButton = ({ label, onClick }: Props): JSX.Element => {
  return (
    <>
      <button type="button" className="enter-button" onClick={onClick}>
        <div className="enter-button-inner">
          <div className="enter-button-text">
            <span>{label}</span>
          </div>
        </div>
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
