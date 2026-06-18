import Image from 'next/image';
import styles from './styles';
import { useGame } from 'contexts/GameContext';

export interface DistrictItem {
  img: string;
  name: string;
  id: string;
}

interface Props {
  items: DistrictItem[];
  onSelect: (id: string) => void;
}

export const DistrictList = ({ items, onSelect }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`list-wrapper ${gameConfig.gotchiverseTheme}`}>
        <div className="title">
          <p className="text">district 1</p>
        </div>
        <div className="list-items">
          {items?.map((item, i) => (
            <div key={i} className="list-item clickable" onClick={() => onSelect(item.id)}>
              <div className="img-wrapper">
                <Image alt="" src={item.img} layout="fill" />
              </div>
              <p className="text">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
