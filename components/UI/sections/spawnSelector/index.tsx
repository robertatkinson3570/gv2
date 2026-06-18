/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import styles from './styles';
import { Button, CloseButton } from 'components/UI/elements';
import { Baazaar } from 'assets';
import { useWeb3 } from 'contexts/Web3Context';
import Image from 'next/image';
import { useUser } from 'contexts/UserContext';
import _ from 'lodash';
import { EventList, ParcelsList } from 'components/UI/structures';
import { BasePanel } from 'components/UI/component';
import { useGame } from 'contexts/GameContext';
import { useMemo } from 'react';
import { GotchiverseAavegotchi } from 'types';

interface Props {
  handleSelect: (id: string, isEvent?: boolean) => void;
  onClose: () => void;
  type: 'EVENTS' | 'PARCELS';
  selectedSpawn: string;
  selectedGotchi?: GotchiverseAavegotchi;
}

export const SpawnSelector = ({ handleSelect, onClose, type, selectedSpawn, selectedGotchi }: Props): JSX.Element => {
  const [{ currentAccount }] = useWeb3();
  const [{ gameConfig }] = useGame();
  const [{ ownedParcels }] = useUser();

  const parcels = useMemo(() => {
    // put selected parcel at the top of the list
    const ownedParcelsCopy = _.cloneDeep(ownedParcels);
    const selectedParcel = ownedParcelsCopy.find((parcel) => parcel.parcelId === selectedSpawn);
    if (selectedParcel) {
      const index = ownedParcelsCopy.indexOf(selectedParcel);
      ownedParcelsCopy.splice(index, 1);
      ownedParcelsCopy.unshift(selectedParcel);
    }

    const isBorrowedGotchi = selectedGotchi?.owner?.id?.toLowerCase() !== selectedGotchi?.originalOwnerId?.toLowerCase();

    // You should be able to enter a parcel from an owner with a gotchi from the same owner
    // But you should not be able to enter a parcel from an owner with a gotchi from other owner
    return selectedGotchi && isBorrowedGotchi
      ? ownedParcelsCopy.filter((parcel) =>
          parcel.owner
            ? _.includes([selectedGotchi.originalOwnerId?.toLowerCase(), currentAccount.toLowerCase()], parcel.owner?.toLowerCase())
            : true,
        )
      : ownedParcelsCopy;
  }, [ownedParcels, currentAccount, selectedGotchi, selectedSpawn]);
  return (
    <>
      <div className={`overlay ${gameConfig.gotchiverseTheme}`}>
        <div className="content-container">
          {/* <IndentedPanel inheritHeight useTheme={true} title={type} borrowedColor={type === 'PARCELS'}> */}
          <BasePanel
            inherit={{
              width: false,
              height: false,
            }}
            title={{
              value: type,
              padding: '0 0.8rem 0 0.8rem',
              width: '40rem',
              fontSize: 3.2,
            }}
            content={{
              padding: 20,
              scrollable: true,
            }}
            sides={{
              color: type === 'PARCELS' ? 'blue-border' : 'pink-border',
              size: 15,
              thickness: 4,
            }}
            background={{
              hasShadow: true,
              color: 'black',
              opacity: 1,
              scanlines: {
                color: type === 'PARCELS' ? 'info-400' : 'pink-400',
                opacity: 0.1,
                spacing: 0.75,
                size: 0.2,
              },
            }}
          >
            <div className="panel-content">
              {type === 'EVENTS' && (
                <div className="event-list">
                  <EventList
                    onSelect={(id, isEvent) => handleSelect(id, isEvent)}
                    showFilter={false}
                    selectedEvent={selectedSpawn}
                    fetchEnabled={false}
                  />
                </div>
              )}
              {type === 'PARCELS' && (
                <div className={`${gameConfig.gotchiverseTheme} parcels`}>
                  {parcels?.length === 0 ? (
                    <div className="empty-state">
                      <h2>You don{"'"}t have any parcels yet</h2>
                      <h4>You can buy your parcels in the Baazaar!</h4>
                      <div className="baazaar-link-container">
                        <div className="baazaar-img">
                          <Image alt="" src={Baazaar} width={193} height={206} layout="responsive" />
                        </div>
                        <a
                          href="https://app.aavegotchi.com/baazaar/realm"
                          target="__blank"
                          style={{
                            width: '100%',
                          }}
                        >
                          <Button size={3.2} fullWidth>
                            Open Baazaar
                          </Button>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <ParcelsList items={parcels} onSelect={handleSelect} scrollContainer=".parcels" spawnParcelId={selectedSpawn} mode="wide" />
                  )}
                </div>
              )}
            </div>
          </BasePanel>
          <div className="close-icon-container">
            <CloseButton onClick={onClose} color={type === 'EVENTS' ? '' : 'info'} />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
