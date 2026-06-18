/* eslint-disable multiline-ternary */
import Image from 'next/image';
import styles from './styles';
import { GotchiverseAavegotchi, JsonParcel, RealmEvent } from 'types';
import { ShareLink } from 'components/UI/hud/components/Events/components/ShareLink';
import { ChannelReadyToggle } from 'components/UI/elements/buttons/channelReadyToggle';
import { gotchiCanChannel } from 'helpers/parcels.helper';
import Truncate from 'components/UI/widgets/Truncate';
import { useMemo } from 'react';
import { brsToRarity } from 'helpers/gotchi.helper';
import { EnterButton } from '../EnterButton';

interface Props {
  gotchi: GotchiverseAavegotchi;
  type?: 'parcel' | 'event';
  parcel?: JsonParcel;
  event?: RealmEvent;
  onClickChange?: () => void;
  onClickEnter?: () => void;
}

export const SpawnLocation = ({ gotchi, type = 'parcel', event, parcel, onClickChange, onClickEnter }: Props): JSX.Element => {
  const rarity = useMemo(() => 'gotchi-' + (gotchi ? brsToRarity(Number(gotchi?.baseRarityScore)) : 'disabled'), [gotchi]);
  const canBeChannelled = useMemo(() => gotchiCanChannel(gotchi?.lastChanneledAlchemica), [gotchi]);
  return (
    <>
      <div className={`spawn-location ${type}`}>
        <div className="header">
          <div className="label">
            {type === 'parcel' && 'Parcel'}
            {type === 'event' && 'Event'}
          </div>
          <button type="button" className="cta-change" onClick={onClickChange}>
            Change
          </button>
        </div>
        <div className="detail-wrapper">
          {type === 'parcel' && parcel && (
            <div className="img-container parcel-banner">
              <Image alt="" src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${parcel.tokenId}.png`} layout="fill" />
            </div>
          )}
          {type === 'event' && event && (
            <div className="img-container event-banner">
              {event.image ? (
                <Image alt="" src={event.image} layout="fill" objectFit="cover" />
              ) : (
                <Image alt="" src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${event.id}.png`} layout="fill" objectFit="cover" />
              )}
            </div>
          )}
          <div className="labels">
            <div className="spawn-location-name-container">
              {(parcel || event) && (
                <div className="spawn-location-name">
                  <Truncate chars={40}>{type === 'parcel' ? parcel?.parcelHash : event?.title}</Truncate>
                </div>
              )}

              {type === 'event' && <ShareLink event={event} color="var(--col-info-400)" size="1.5rem" />}
            </div>
            <div className={`spawn-location-addr ${type}`}>
              {!gotchi?.isSpectator && type === 'parcel' && parcel && (
                <ChannelReadyToggle
                  active={canBeChannelled}
                  borderColor="var(--col-info-400)"
                  backgroundColor={`var(--col-${canBeChannelled ? rarity : 'uncommon'}-card-label-bg)`}
                  size="1em"
                  noGlow
                />
              )}
              {(parcel || event) && (
                <>
                  <span className="spawn-location-district">District {type === 'parcel' ? parcel.district : event.parcel.district}</span>
                  <span className="spawn-location-id">ID: {type === 'parcel' ? parcel.tokenId : event.id}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <EnterButton label="Enter Now >" onClick={onClickEnter} />
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
