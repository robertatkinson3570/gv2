import Layout from 'components/UI/Layout';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { Button, WalletConnectButton } from 'components/UI/elements';
import { useWeb3 } from 'contexts/Web3Context';
import { useUserWalletDataContext } from 'components/utility/WalletConnect';
import Image from 'next/image';
import { addBase } from 'helpers/ethers.helper';
import styles from './styles';
import { GotchiverseLogo, GotchiverseTitleHalloween } from 'assets';
import GameController from 'components/controllers/GameController';
import { useGame } from 'contexts/GameContext';

export const UnconnectedScreen = (): JSX.Element => {
  const { showSelectWalletModal, handleNetworkChange, walletModalVisible } = useUserWalletDataContext();
  const { click } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();
  const isHalloween = gameConfig.gotchiverseTheme === 'halloween';

  const [{ currentNetwork, currentAccount }] = useWeb3();

  const checkUser = async () => {
    click();
    showSelectWalletModal(true);
  };

  const connectToBase = async () => {
    // click();
    handleNetworkChange(8453);
    void addBase();
  };
  return (
    <>
      <Layout scene="unconnected">
        <div className="container mx-auto">
          <div className="main">
            <div className="title-container">
              {!walletModalVisible && (
                <>
                  <Image alt="" src={isHalloween ? GotchiverseTitleHalloween : GotchiverseLogo} className="title" />
                  {!isHalloween && <h2 className="version">REALM v{GameController.version}</h2>}
                  {isHalloween && <h2 className="halloween">HALLOWEEN WEEK</h2>}
                  {!currentAccount && !isHalloween && <WalletConnectButton onClick={checkUser} />}
                  {!currentAccount && isHalloween && (
                    <div className="button-container halloween">
                      <Button size={4.8} onClick={checkUser} halloweenMode={true} color={gameConfig.gotchiverseTheme}>
                        CONNECT WALLET
                      </Button>
                    </div>
                  )}
                  {currentAccount && !['base'].includes(currentNetwork || 'void') && (
                    <div className="connect-to-polygon">
                      <Button size={3.2} onClick={connectToBase} color={gameConfig.gotchiverseTheme} secondary fullWidth>
                        Connect to Base
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
      <style jsx>{styles}</style>
    </>
  );
};
