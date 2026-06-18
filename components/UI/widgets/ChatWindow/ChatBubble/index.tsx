import { UserPortrait } from 'components/UI/component';
import { formatDigit } from 'helpers/functions';
import styles from './styles';

export interface ChatMessage {
  img?: string;
  background: string;
  from: string;
  message: string[];
  date: Date;
  isSender?: boolean;
  gotchiId: string;
}

export const ChatBubble = ({ img, background, from, message, date, isSender }: ChatMessage): JSX.Element => {
  const formatDate = (sentDate: Date) => {
    const hours = sentDate.getHours();
    const mins = sentDate.getMinutes();

    return `${formatDigit(hours)}:${formatDigit(mins)}`;
  };

  return (
    <>
      <div className={`bubble-wrapper ${isSender ? 'sender' : ''}`}>
        <div className="bubble-container">
          <div>
            <UserPortrait img={img} backgroundColor={background} borderColor="white" staticImg={true} size={0.55} />
          </div>
          <div className="message-container">
            <div className="details-container">
              <span className="name">{isSender ? 'You' : from}</span>
              <span>{formatDate(date)}</span>
            </div>
            {message.map((text, i) => (
              <p className="message" key={i}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
