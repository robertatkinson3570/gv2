import styles from './styles';
import { TooltipType } from 'types';
import { useState } from 'react';
import { CopyIcon, CopySuccessIcon } from '../svgs';

export const Tooltip = ({ title, message, actionType, theme = '', subtitle }: TooltipType): JSX.Element => {
  const [actionState, setActionState] = useState(false);

  const handleAction = () => {
    switch (actionType) {
      case 'copy':
        return () => {
          void navigator.clipboard.writeText(message);
          setActionState(true);
        };
    }
  };

  const [iconSize, iconFill] = ['1.6rem', theme === '' ? 'var(--col-purple-250)' : 'var(--col-info-400)'];

  return (
    <>
      <div className={`toast-container ${theme}`}>
        <div className="toast-inner">
          <div className="content-container">
            <div className="title-container">
              <p className="title">{title}</p>
              {actionState && <span className="action-info">Link copied</span>}
              {!actionState && subtitle ? <p className="subtitle">{subtitle}</p> : <></>}
            </div>
            <div className="action-container">
              <p className="message">{message}</p>
              <button className="icon-button" onClick={handleAction()}>
                {!actionState ? <CopyIcon fill={iconFill} size={iconSize} /> : <CopySuccessIcon fill={iconFill} size={iconSize} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
