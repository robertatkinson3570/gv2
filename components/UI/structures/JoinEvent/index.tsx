import { StyledTitle } from 'components/UI/elements';
import { useUser } from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { EventList } from '..';
import { EventsSlider } from '../EventsSlider';
import styles from './styles';

interface Props {
  handleSpawnSelect: (id: string) => void;
}

export const JoinEvent = ({ handleSpawnSelect }: Props): JSX.Element => {
  const filters = ['top events', 'new events', 'your events'];
  const [filter, setFilter] = useState(0);
  const [ownerOnly, setOwnerOnly] = useState(false);

  const [, userDispatch] = useUser();
  useEffect(() => {
    if (filter === 0) {
      userDispatch({
        type: 'UPDATE_EVENT_FILTER',
        eventInitialFilter: 'priority',
      });
    } else if (filter === 1) {
      userDispatch({
        type: 'UPDATE_EVENT_FILTER',
        eventInitialFilter: 'startTime',
      });
    }
    setOwnerOnly(filter === 2);
  }, [filter]);

  return (
    <>
      <div className="join-event-container">
        <StyledTitle text="JOIN AN EVENT" style="centered" />
        <div className="content-wrapper">
          <div className="filter-buttons">
            {filters.map((_filter, index) => (
              <span className={`filter-button ${filter === index ? 'active' : ''}`} key={index} onClick={() => setFilter(index)}>
                {_filter}
              </span>
            ))}
          </div>
          <EventsSlider onSelect={(id) => handleSpawnSelect(id)} />
          <div className="event-list">
            <EventList onSelect={(id) => handleSpawnSelect(id)} enableInitialFilter ownerOnly={ownerOnly} />
          </div>
        </div>
        <div className="bottom-outline"></div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
