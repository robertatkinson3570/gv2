import styles from './styles';
import { SuccessIcon, InfoIcon, ErrorIcon, WarningIcon, BuildWarningIcon } from 'assets/icons';
import { Notification } from 'types';
import Image from 'next/image';
import { Loader } from 'components/UI/elements';

interface Props extends Omit<Notification, 'type'> {
  type: 'success' | 'info' | 'pending' | 'error' | 'warning' | 'build';
}

export const ToastNotification = ({ type, title, message }: Props): JSX.Element => {
  const renderIcon = () => {
    switch (type) {
      case 'info':
        return InfoIcon;
      case 'success':
        return SuccessIcon;
      case 'error':
        return ErrorIcon;
      case 'warning':
        return WarningIcon;
      case 'build':
        return BuildWarningIcon;
    }
  };

  return (
    <>
      <div className={`toast-container ${type}`}>
        <div className="toast-inner">
          {type === 'pending' ? <Loader size={0.3} /> : <Image alt="" src={renderIcon()} height={32} width={32} />}
          <div className="content-container">
            <p className="message">{message}</p>
            <p className="title">{title}</p>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
