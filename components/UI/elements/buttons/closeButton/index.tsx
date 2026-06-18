import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  secondary?: boolean;
  size?: number;
  color?: string;
}

export const CloseButton = ({ secondary, color, size = 3.2, ...props }: Props): JSX.Element => {
  const { back } = useAavegotchiSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    back();
    if (props?.onClick) props.onClick(e);
  };

  return (
    <>
      <button
        className={`button-container ${secondary ? 'secondary ' : ' '} ${color || ''}`}
        {...props}
        onClick={handleClick}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
