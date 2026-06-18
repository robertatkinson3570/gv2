import styles from './styles';
import Image from 'next/image';
import { GotchiverseAavegotchi } from 'types';
import { GotchiSVG } from 'components/UI/widgets';
import { BorrowedIcon, FreeTagIcon } from 'assets';

import { gotchiCanChannel } from 'helpers/parcels.helper';
import { useUser } from 'contexts/UserContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useEffect, useMemo, useState } from 'react';
import { useGame } from 'contexts/GameContext';
import { ChannelReadyToggle } from 'components/UI/elements/buttons/channelReadyToggle';
import { brsToRarity } from 'helpers/gotchi.helper';

interface Props {
  gotchi?: GotchiverseAavegotchi;
  handleSelect: (gotchi: GotchiverseAavegotchi) => void;
  isSelected: boolean;
}

export const GotchiSelectCard = ({ gotchi, handleSelect, isSelected }: Props): JSX.Element => {
  const { click, oops } = useAavegotchiSound();
  const isSpectator = gotchi?.isSpectator;
  const isLent = gotchi?.isLent;

  const [{ gameConfig }] = useGame();
  const [{ parcelAccessOwners }] = useUser();
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  useEffect(() => {
    if (!gotchi) return;
    setIsBlocked(!parcelAccessOwners.includes(gotchi.originalOwner.id.toLowerCase()));
  }, [parcelAccessOwners, gotchi]);

  const rarity = useMemo(() => 'gotchi-' + (gotchi.isSpectator ? 'freebie' : brsToRarity(Number(gotchi?.baseRarityScore))), [gotchi]);

  return (
    <>
      <div
        className={`gotchi-panel clickable ${rarity} ${isLent ? 'borrowed' : ''} ${gameConfig.gotchiverseTheme} ${isSelected ? 'selected' : ''}`}
        onClick={() => {
          if (!isBlocked) {
            click();
            handleSelect(gotchi);
          } else oops();
        }}
      >
        <div className="gotchi-img">
          <div className="icons">
            {/* <span className="top-left" /> */}
            <span className={`top-right ${isSpectator ? 'free-tag' : ''}`}>
              {isSpectator && <Image alt="" src={FreeTagIcon} />}
              {isLent && <Image alt="" src={BorrowedIcon} />}
            </span>
            {/* <span className="bottom-left" /> */}
            <span className="bottom-right">
              {!isSpectator && gotchiCanChannel(gotchi?.lastChanneledAlchemica) && (
                <ChannelReadyToggle size="3rem" active={gotchi?.readyToChannel} backgroundColor={`var(--col-${rarity}-card-label-bg)`} />
              )}
            </span>
          </div>
          <div className={`gotchi-img-wrapper ${isSpectator ? 'spectator' : ''}`}>
            <GotchiSVG height={gotchi?.isSpectator ? 10 : 12} tokenId={gotchi?.id} options={{ removeBg: true }} isSpectator={isSpectator} />
          </div>
        </div>
        <p className="gotchi-name">{gotchi?.name}</p>
        {/* {isBlocked
          ? (
          <div className="dark-layer">
            <span>Cannot choose</span>
            <p>Borrowed Gotchi</p>
          </div>
            )
          : null} */}
      </div>
      <style jsx>{`
        .gotchi-panel {
          --border-color: var(--col-${rarity}-card-border);
          --label-bg-color: var(--col-${rarity}-card-label-bg);
          --box-inner-bg: var(--col-${rarity}-card-bg);
          --box-inner-shadow: var(--col-${rarity}-card-inner-shadow);
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};
