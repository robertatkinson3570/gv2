import { GotchiSVG } from 'components/UI/widgets';
import _ from 'lodash';
import { SuperChatEvent } from 'types';
import styles from './styles';

interface Props {
  event: SuperChatEvent;
}

export const SuperChatItem = ({ event }: Props): JSX.Element => {
  return (
    <>
      <div className="super-chat-item">
        <div className="image-container">
          <GotchiSVG tokenId={event.id} height={3} isSpectator={event.isSpectator} />
        </div>
        <p className={`message ${event.message ? '' : 'default'}`}>{event.message || 'SENT TIP'}</p>
        <div className="tips">
          {_.map(event.tipAmountBySymbol, (val, token) => (
            <span key={token} className={`tip ${token.toLocaleLowerCase()}`}>
              {val}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
