import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  secondary?: boolean;
  size?: number;
  disableSound?: boolean;
  color?: string;
  fullWidth?: boolean;
  buildMode?: boolean;
  upgrade?: boolean;
  preventPropagation?: boolean;
  halloweenMode?: boolean;
  variant?: 'default' | 'rounded';
  outlineColor?: string;
}

export const Button = ({
  secondary,
  size = 2.8,
  disableSound,
  color,
  fullWidth,
  buildMode,
  upgrade,
  preventPropagation = true,
  halloweenMode,
  variant = 'default',
  outlineColor = 'transparent',
  ...props
}: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!disableSound) click();
    if (props?.onClick) props.onClick(e);
  };

  return (
    <>
      <button
        className={`button-container ${secondary ? 'secondary' : color || ''} ${variant}`}
        style={{
          fontSize: `${size}rem`,
          width: buildMode ? '30rem' : fullWidth ? '100%' : upgrade ? '50%' : halloweenMode ? '40rem' : '7em',
        }}
        {...props}
        onClick={handleClick}
      >
        <div className={`inner ${buildMode ? 'build' : ''}`}>{props.children}</div>
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
