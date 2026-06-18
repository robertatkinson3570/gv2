import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Image from 'next/image';
import styles from './styles';

interface Props {
  img: string;
  onClick: () => void;
  active: boolean;
}

export const Tab = ({ img, onClick, active }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  return (
    <>
      <button
        className={`button-wrapper ${active ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          click();
          onClick();
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="outer">
          <div className="cap left" />
          <div className="inner">
            <span className="img-container">
              <Image alt="" src={img} height={`${active ? 75 : 65}`} width={`${active ? 75 : 65}`} />
            </span>
          </div>
        </div>
      </button>
      <style jsx>{styles}</style>
    </>
  );
};
