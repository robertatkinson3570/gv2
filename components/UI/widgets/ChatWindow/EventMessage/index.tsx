import { formatDigit } from 'helpers/functions';
import styles from './styles';

export interface ServerMessage {
  message: string | React.ReactNode;
  date: Date;
}

export const EventMessage = ({ message, date }: ServerMessage): JSX.Element => {
  const formatDate = (sentDate: Date) => {
    const hours = sentDate.getHours();
    const mins = sentDate.getMinutes();
    const seconds = sentDate.getSeconds();

    return `${formatDigit(hours)}:${formatDigit(mins)}:${formatDigit(seconds)}`;
  };

  return (
    <>
      <div className="event-message">
        {typeof message === 'string' ? <p>{message}</p> : message}
        <p>{formatDate(date)}</p>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
