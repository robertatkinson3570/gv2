import styles from './styles';
import { ModalWrapper } from '..';
import { BigIndentedPanel } from '../..';
import { CloseButton } from 'components/UI/elements';

interface Props {
  title: string;
  open: boolean;
  children: React.ReactNode;
  secondaryColor?: boolean;
  color?: 'info';
  onClose: () => void;
}

export const UpgrdModal = ({ title, children, secondaryColor, open, color, onClose }: Props): JSX.Element => {
  return (
    <>
      <ModalWrapper open={open} onClose={onClose}>
        <BigIndentedPanel title={title}>{children}</BigIndentedPanel>
        <div className="close-icon-container">
          <CloseButton onClick={onClose} size={3.5} color={color} />
        </div>
      </ModalWrapper>
      <style jsx>{styles}</style>
    </>
  );
};
