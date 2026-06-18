import { CopyIcon, CopySuccessIcon } from 'components/UI/elements';
import { useEffect, useState } from 'react';
import { RealmEvent } from 'types';
import styles from './styles';

interface Props {
  event: RealmEvent;
  onCopy?: () => void;
  color?: string;
  size?: string;
}
const isLocalEnvironment = !process.env.APP_ENV || process.env.APP_ENV === 'local';
export const ShareLink = ({ event, onCopy, color = 'var(--col-pink-400)', size = '2.3rem' }: Props): JSX.Element => {
  const [actionState, setActionState] = useState(false);

  const handleShareEvent = () => {
    const port = window.location.port ? ':' + window.location.port : '';
    const host = window.location.hostname + port;

    void navigator.clipboard.writeText(`${!isLocalEnvironment ? 'https://' : ''}${host}?eventId=${event.id}`);
    setActionState(true);
    if (onCopy) onCopy();
  };

  useEffect(() => {
    if (!actionState) return;
    const timer = setTimeout(() => {
      setActionState(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [actionState]);

  return (
    <>
      <button type="button" className="copy-icon-wrapper clickable clear" onClick={handleShareEvent}>
        {!actionState ? <CopyIcon fill={color} size={size} /> : <CopySuccessIcon fill={color} size={size} />}
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
