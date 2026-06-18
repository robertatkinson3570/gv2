import { Portal } from 'components/utility/Portal';
import styles from './styles';
import { useEffect } from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Image from 'next/image';
import { IndentedPanel } from '../..';
import { CloseButton } from 'components/UI/elements';

interface Props {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
  img: string;
  color?: string;
  bgImg?: string;
}

export const DialogueContainer = ({ children, open, title, onClose, img, color, bgImg }: Props): JSX.Element => {
  const { back } = useAavegotchiSound();

  const handleClose = () => {
    back();
    onClose();
  };

  const blockPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Escape') handleClose();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('keyup', handleKeyUp);
    } else {
      document.removeEventListener('keyup', handleKeyUp);
    }
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [open]);

  if (!open) return <></>;
  return (
    <>
      <Portal>
        <div className="overlay" onClick={handleClose}>
          <div className="panel-container" onClick={blockPropagation} onMouseDown={blockPropagation}>
            <div className={`dialogue-source-container ${`${color}` || ''}`}>
              <div className={`img-container ${color || ''}`}>
                {bgImg && (
                  <span className="bg-img">
                    <Image alt="" src={bgImg} layout="fill" />
                  </span>
                )}
                <span>
                  <Image alt="" src={img} />
                </span>
              </div>
              <div className={`title-container ${color || ''}`}>
                <h2>{title}</h2>
              </div>
            </div>
            <div className="content-panel-container">
              <IndentedPanel hideSides={{ bottom: true, left: true }} inheritWidth borrowedColor={color === 'info'} useTheme={true}>
                <div className="content-container">{children}</div>
              </IndentedPanel>
              <div className="close-icon-container">
                <CloseButton onClick={handleClose} size={3.5} color={color} />
              </div>
            </div>
          </div>
        </div>
      </Portal>
      <style jsx>{styles}</style>
    </>
  );
};
