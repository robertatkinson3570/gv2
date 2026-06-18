import styles from './styles';
import Image from 'next/image';
import { CloseButton } from 'components/UI/elements';
import { ModalWrapper } from 'components/UI/component';
import { PiggyBankIcon } from 'assets/images';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PocketModal = ({ open, onClose, children }: Props): JSX.Element => {
  return (
    <>
      <ModalWrapper open={open} onClose={onClose} fullWidth>
        <div className="wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="title-container">
            <Image alt="" src={PiggyBankIcon} height={80} width={80} objectFit="contain" />
            <h2>Gotchi&apos;s pocket</h2>
          </div>
          <div className="outer-border">
            <div className="outer-container">
              <div className="inner-border">
                <div className="inner-container">{children}</div>
              </div>
            </div>
          </div>
          <div className="close-icon-container">
            <CloseButton onClick={onClose} size={3.5} color="info" />
          </div>
        </div>
      </ModalWrapper>
      <style jsx>{styles}</style>
    </>
  );
};
