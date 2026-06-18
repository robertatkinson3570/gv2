import { getOnChainAlchemicaIcon } from 'helpers/functions';
import { Tokens } from 'types';
import styles from './styles';
import { numberWithCommas } from 'helpers/ethers.helper';
import { BorrowedIcon } from 'assets';
import Image from 'next/image';

interface Props {
  balances: { [key in Tokens]: number };
  claimable: { [key in Tokens]: number };
  revenueTokens: { [key in Tokens]: boolean };
}

export const PocketAssets = ({ balances, claimable, revenueTokens }: Props): JSX.Element => {
  return (
    <>
      <div>
        {Object.keys(balances).map((token, i) => (
          <div key={i} className={`token-container ${revenueTokens[token] ? 'shared' : ''}`}>
            <span className="borrowed-icon">
              <Image alt="" src={BorrowedIcon} />
            </span>
            <Image alt="" src={getOnChainAlchemicaIcon(token)} className="alchemica-icon" width={40} height={40} />
            <div className="balance-container">
              <p className={`claimable ${claimable[token] ? '' : 'invalid'}`}>
                {numberWithCommas(claimable[token], 2)} {token}
              </p>
              <p className="balance">
                {numberWithCommas(balances[token], 2)} {token}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
