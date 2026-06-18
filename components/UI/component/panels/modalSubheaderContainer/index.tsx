import styles from './styles';

interface Props {
  children: React.ReactNode;
  secondaryColor?: boolean;
  fullscreen?: boolean;
  color?: string;
}

export const ModalSubheaderContainer = ({ children, secondaryColor, fullscreen, color }: Props): JSX.Element => {
  const blockPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`modal-subheader-container ${secondaryColor ? 'secondary ' : ''} ${fullscreen ? 'fullscreen' : ''} ${color}`}
        onClick={blockPropagation}
        onMouseDown={blockPropagation}
      >
        <div className="left-cap"></div>
        <div className="right-cap"></div>
        {children}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
