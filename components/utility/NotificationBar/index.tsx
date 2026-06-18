import { WarningIcon } from 'assets';
import { useWeb3 } from 'contexts/Web3Context';
import { useEffect, useState } from 'react';
import styles from './styles';
import Image from 'next/image';

export const NotificationBar = (): JSX.Element => {
  const [{ currentNetwork }] = useWeb3();
  const [message, setMessage] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // This is where we will see if server has any system messages
    // For now we hard code
    if (currentNetwork !== undefined && currentNetwork !== 'mumbai') {
      setMessage('Testnet Version: Please connect to Mumbai to access every feature');
      setOpen(true);
    } else {
      setMessage(undefined);
      setOpen(false);
    }
  }, [currentNetwork]);

  return (
    <>
      <div className={`banner ${open ? 'open' : ''}`}>
        <a
          className="message-container"
          href="https://blog.aavegotchi.com/how-to-access-the-gotchiverse-on-mumbai-testnet/"
          target="_blank"
          rel="noreferrer"
        >
          <Image alt="" src={WarningIcon} />
          <p>{message}</p>
        </a>
        <div className="close-container clickable" onClick={() => setOpen(false)}>
          <p>x</p>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
