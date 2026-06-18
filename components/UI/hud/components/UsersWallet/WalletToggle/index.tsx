import styles from './styles';
import { IndentedPanel } from 'components/UI/component/panels';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { smartTrim } from 'helpers/ethers.helper';
import { NetworkNames } from 'types';
import useAavegotchiSound from 'hooks/useAavegotchiSound';

interface Props {
  address: string;
  network: NetworkNames;
  onClick?: () => void;
}

export const WalletToggle = ({ address, network, onClick }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  const handleClick = (e) => {
    e.stopPropagation();

    if (!onClick) return;
    click();
    onClick();
  };

  return (
    <>
      <div className="wallet-toggle-container" onClick={handleClick} onMouseDown={(e) => e.stopPropagation()}>
        <IndentedPanel hideSides={{ top: true }} secondaryColor padding={2} isWalletToggle isButton={true} isThin={true}>
          <div className="inner">
            <div className="jazzicon">
              <Jazzicon diameter={28} seed={jsNumberForAddress(address || '')} />
            </div>
            <div className="user-details">
              <p className="address">{smartTrim(address, 6)}</p>
              <p className="network">{network === 'matic' ? 'polygon' : network}</p>
            </div>
          </div>
        </IndentedPanel>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
