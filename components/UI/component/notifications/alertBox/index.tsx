import styles from './styles';
import { SuccessIcon, InfoIcon, ErrorIcon, WarningIcon } from 'assets/icons';
import { Notification } from 'types';
import Image from 'next/image';
import { Loader } from '../../../elements/loader';
import { PopupIcon } from 'components/UI/elements';

interface Props extends Omit<Notification, 'type'> {
  type: 'success' | 'info' | 'pending' | 'error' | 'warning';
  icon?: string;
  href?: string;
  handleClick?: () => void;
}

export const AlertBox = ({ type, title, message, icon, href, handleClick }: Props): JSX.Element => {
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
    }
  };

  return (
    <>
      <div className={`toast-container ${type}`}>
        <div className="toast-inner">
          {type === 'pending' ? <Loader size={0.3} /> : <Image alt="" src={icon || renderIcon()} height={32} width={32} />}
          <div className="content-container">
            {(href || handleClick) && (
              <div className="flex items-center gap-2" onClick={() => (handleClick ? handleClick() : null)}>
                <a className="title" href={href || '#'}>
                  {title}
                </a>
                <PopupIcon />
              </div>
            )}
            {!href && !handleClick && <p className="title">{title}</p>}
            <p className="message">{message}</p>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
