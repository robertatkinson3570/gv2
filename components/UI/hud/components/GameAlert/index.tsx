import { useRealm } from 'contexts/RealmContext';
import { useEffect, useState } from 'react';
import styles from './styles';

export const GameAlert = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const [{ gameAlert }, realmDispatch] = useRealm();

  useEffect(() => {
    if (!show && gameAlert) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        realmDispatch({
          type: 'UPDATE_GAME_ALERT',
          gameAlert: '',
        });
      }, 3000);
    }
  }, [gameAlert]);

  if (!show) return <></>;
  return (
    <>
      <div className="alert-container">
        <p>{gameAlert}</p>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
