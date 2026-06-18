/* eslint-disable multiline-ternary */
import styles from './styles';
import Image from 'next/image';
import { StartTimeIcon, EndTimeIcon, EventPriceIcon } from 'assets';
import { RealmEvent } from 'types';
import { useEffect, useState } from 'react';
import { ShareLink } from 'components/UI/hud/components/Events/components/ShareLink';
import { useGame } from 'contexts/GameContext';

interface Props {
  event: RealmEvent;
  onSelect: (id: string, isEvent?: boolean) => void;
}

export const EventListCard = ({ event, onSelect }: Props): JSX.Element => {
  const { id, title, startTime, endTime, parcelId } = event;
  const nowEpoch = Number(Number(Date.now() / 1000).toFixed());
  const [isStartMinutes, setIsStartMinutes] = useState<boolean>();
  const [isEndMinutes, setIsEndMinutes] = useState<boolean>();
  const [startTimeText, setStartTimeText] = useState<number>();
  const [endTimeText, setEndTimeText] = useState<number>();
  const [{ gameConfig }] = useGame();

  useEffect(() => {
    let startText = Math.floor((nowEpoch - Number(startTime)) / 3600);
    if (startText === 0) {
      setIsStartMinutes(true);
      startText = Math.floor((nowEpoch - Number(startTime)) / 60);
    }
    setStartTimeText(startText);

    let endText = Math.floor((Number(endTime) - nowEpoch) / 3600);
    if (endText === 0) {
      endText = Math.ceil((Number(endTime) - nowEpoch) / 60);
      setIsEndMinutes(true);
    }
    endText = endText < 0 ? 0 : endText;
    setEndTimeText(endText);
  }, [event]);

  const blockPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={`card-wrapper  clickable ${gameConfig.gotchiverseTheme}`} onClick={() => onSelect(id, true)}>
        <div className="img-shadow">
          <div className="img-wrapper">
            <div className="inner">
              {event.image ? (
                <Image alt="" src={event.image} layout="fill" objectFit="cover" />
              ) : (
                <Image alt="" src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${event.id}.png`} layout="fill" objectFit="cover" />
              )}
            </div>
          </div>
        </div>
        <div className="contents-wrapper">
          <div className="top-side">
            <div className="title-wrapper" onClick={blockPropagation} onMouseDown={blockPropagation}>
              <p className="title">{title}</p>
              <ShareLink event={event} color="var(--col-purple-250)" />
            </div>

            {/* <div className="start-time">
              <span className="icon">
                <Image alt="" src={StartTimeIcon} />
              </span>
              <p className="text">
                {startTimeText} {isStartMinutes ? 'mins' : 'hrs'} ago
              </p>
            </div> */}
          </div>
          <div className="bottom-side">
            <div className="price">
              <span className="icon">
                <Image alt="" src={EventPriceIcon} />
              </span>
              <span className="text">{event.count}</span>
            </div>
            <div className="end-time">
              <span className="icon">
                <Image alt="" src={EndTimeIcon} />
              </span>
              <p className="text">
                Ends in {endTimeText} {isEndMinutes ? 'mins' : 'hrs'}
              </p>
            </div>
          </div>
          <div className="parcel-info">
            <p className="text">District {event.parcel.district}</p>
            <div className="img-border">
              <Image alt="" src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${id}.png`} layout="fill" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
