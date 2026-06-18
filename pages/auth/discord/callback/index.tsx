import { useRouter } from 'next/router';
import { Button, Loader } from 'components/UI/elements';
import { useEffect } from 'react';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useWeb3 } from 'contexts/Web3Context';
import { useUserWalletDataContext } from 'components/utility/WalletConnect';
import { postAuthUnlink, postAuthValidation } from 'helpers/auth.helper';

const DiscordAuthCallback = (): JSX.Element => {
  const router = useRouter();
  const { code } = router.query;

  const { showSelectWalletModal } = useUserWalletDataContext();
  const { click } = useAavegotchiSound();

  const [{ currentAccount }] = useWeb3();

  const checkUser = async () => {
    click();
    showSelectWalletModal(true);
  };

  const handleAuth = async (address: string, code: string | string[]) => {
    const isUnlink = localStorage.getItem('oauth') === 'UNLINK';

    let res;
    if (isUnlink) {
      res = await postAuthUnlink(code);
    } else {
      res = await postAuthValidation(address, code);
    }
    if (res) {
      await router.push('/');
    }
  };

  useEffect(() => {
    if (currentAccount && code) {
      void handleAuth(currentAccount, code);
    }
  }, [code, currentAccount]);

  return (
    <>
      <div className="bg">
        {!currentAccount && (
          <div className="connect-message">
            <p>Click button below to connect your account.</p>
            <Button onClick={checkUser}>Connect</Button>
          </div>
        )}
        {currentAccount && (
          <div className="redirect-message">
            <p>Redirecting you back to the Title Screen...</p>
            <Loader size={0.2} color="white" />
          </div>
        )}
      </div>
      <style jsx>{`
        .bg {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
          color: var(--col-white);
          font-size: 24px;
          margin: 0 12px 0 0;
        }
        .redirect-message {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .connect-message {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .connect-message p {
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
};

export default DiscordAuthCallback;
