import { BotIcon, DoneIcon } from 'assets';
import Image from 'next/image';
import styles from './styles';

interface Props {
  id?: number;
  label?: string;
  progress?: number;
  status: 'complete' | 'progress' | 'inactive';
}

export const UpgradeStatus = ({ id, label, progress, status }: Props): JSX.Element => {
  return (
    <>
      <div className={`container ${status}`}>
        <div className="no-container">{id}</div>
        <div className="main">
          <div className="label-container">{label}</div>
          {status === 'progress'
            ? (
            <div className="progress-counter">{`${progress}%`}</div>
              )
            : status === 'complete'
              ? (
            <Image alt="" src={DoneIcon} width={32} height={32} layout="fixed" />
                )
              : (
            <></>
                )}
        </div>
        <div className="bottom"></div>
        {status === 'complete'
          ? (
          <div className="progress-bar"></div>
            )
          : status === 'progress'
            ? (
          <>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <div className="bot-icon" style={{ left: `max(0rem, calc(${progress}% - 1.6rem))` }}>
              <Image alt="" src={BotIcon} width={32} height={32} />
            </div>
          </>
              )
            : (
          <></>
              )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
