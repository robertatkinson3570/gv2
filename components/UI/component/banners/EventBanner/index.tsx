import { Button } from '../../../elements';
import styles from './styles';
import Image from 'next/image';

interface Props {
  padding?: number;
  title?: string | { value: string; fontSize: string };
  backgroundImage: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export const EventBanner = ({ padding = 0, title, backgroundImage, buttonText, buttonAction }: Props): JSX.Element => {
  return (
    <>
      <div className={'box-holder'}>
        <div className="content">
          <span className="img-container">
            <Image alt="" src={backgroundImage} />
          </span>
        </div>
        <div className="event-button">
          <Button size={2.5} color="info" onClick={buttonAction}>
            {buttonText}
          </Button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
