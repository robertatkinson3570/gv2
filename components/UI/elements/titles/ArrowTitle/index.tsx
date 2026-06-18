import { ArrowIcon } from '../..';
import styles from './styles';

interface Props {
  text: string;
  size?: number;
  leftArrows?: boolean;
}

export const ArrowTitle = ({ text, size, leftArrows }: Props): JSX.Element => {
  return (
    <>
      <div className="arrow-title" style={{ fontSize: `${size || '10'}vw` }}>
        <h1 className="heading">{text}</h1>
        <div className="flex">
          <ArrowIcon fill="var(--col-common-300)" dir={leftArrows ? 'left' : 'right'} width="0.4em" height="0.8em" />
          <ArrowIcon fill="var(--col-common-300)" dir={leftArrows ? 'left' : 'right'} width="0.4em" height="0.8em" />
          <ArrowIcon fill="var(--col-common-300)" dir={leftArrows ? 'left' : 'right'} width="0.4em" height="0.8em" />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
