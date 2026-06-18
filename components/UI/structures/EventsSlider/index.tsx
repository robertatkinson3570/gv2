/* eslint-disable multiline-ternary */
import { ArrowIcon } from 'components/UI/elements';
import { useRealm } from 'contexts/RealmContext';
import Image from 'next/image';
import styles from './styles';
import { useEffect, useState } from 'react';
import { RealmEvent } from 'types';
import useAavegotchiSound from 'hooks/useAavegotchiSound';

interface Props {
  onSelect: (id: string, isEvent?: boolean) => void;
}
export const EventsSlider = ({ onSelect }: Props): JSX.Element => {
  const { click, oops } = useAavegotchiSound();
  const [{ eventsList }, realmDispatch] = useRealm();
  const [selectedEvent, setSelectedEvent] = useState<RealmEvent>();
  const [currentIndex, setCurrentIndex] = useState<number>();

  useEffect(() => {
    if (eventsList?.length) {
      setSelectedEvent(eventsList[0]);
      setCurrentIndex(0);
    }
  }, [eventsList]);

  const isValidIndex = (index: number): boolean => {
    return index >= 0 && index < eventsList.length;
  };

  const onChange = (increment: number) => {
    if (isValidIndex(currentIndex + increment)) {
      click();
      setSelectedEvent(eventsList[currentIndex + increment]);
      setCurrentIndex(currentIndex + increment);
    } else oops();
  };

  return (
    <>
      <div className="events-slider">
        <div className="arrow-left" onClick={() => onChange(-1)}>
          <ArrowIcon
            fill={isValidIndex(currentIndex - 1) ? 'var(--col-pink-350)' : 'rgba(243, 28, 237, 0.5)'}
            width="2.4rem"
            height="4rem"
            dir="left"
          />
        </div>

        <div className="event" onClick={() => onSelect(selectedEvent.id, true)}>
          {selectedEvent?.image ? (
            <Image alt="" src={selectedEvent.image} layout="fill" objectFit="cover" />
          ) : !selectedEvent ? (
            <></> // add loading state
          ) : (
            <Image alt="" src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${selectedEvent.id}.png`} layout="fill" objectFit="cover" />
          )}
        </div>

        <div className="arrow-right" onClick={() => onChange(1)}>
          <ArrowIcon
            fill={isValidIndex(currentIndex + 1) ? 'var(--col-pink-350)' : 'rgba(243, 28, 237, 0.5)'}
            width="2.4rem"
            height="4rem"
            dir="right"
          />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
