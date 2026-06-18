import { smartTrim } from 'helpers/ethers.helper';
import React, { useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styles from './styles';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { PanelButton } from 'components/UI/elements';

interface Props {
  user?: string;
  network?: string;
  jazzicon?: boolean;
  handleLogout: () => void;
  color?: 'purple' | 'info';
}

export const Web3Button = ({ user, network, jazzicon, handleLogout, color = 'purple' }: Props): JSX.Element => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { click } = useAavegotchiSound();

  const handleClick = () => {
    click();
    setDropdownOpen((prevState) => !prevState);
  };

  const logout = (e: React.MouseEvent) => {
    handleLogout();
  };

  return (
    <>
      <PanelButton color={color} onClick={handleClick}>
        <div className="inner">
          {jazzicon && (
            <div className="jazzicon">
              <Jazzicon diameter={36} seed={jsNumberForAddress(user || '')} />
            </div>
          )}
          <div>
            <p className="user-address body">{smartTrim(user, 8)}</p>
            <p className={`network body-sm ${color}`}>{network === 'matic' ? 'polygon' : network}</p>
          </div>
          {dropdownOpen && (
            <div className={`dropdown ${color}`}>
              <div className="dropdown-item" onClick={logout}>
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
      </PanelButton>
      <style jsx>{styles}</style>
    </>
  );
};
