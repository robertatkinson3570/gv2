// import { getImageBlob } from 'helpers/parcels.helper';
// import { useEffect, useState } from 'react';
import styles from './styles';

interface Props {
  parcelId: string | number;
  size?: number;
}

export const ParcelImage = ({ parcelId, size = 10 }: Props): JSX.Element => {
  // const [img, setImg] = useState<string>();

  // const fetchAndSetImageBlob = async (id: string) => {
  //   const blob = await getImageBlob(id, size);
  //   setImg(blob);
  // };

  // useEffect(() => {
  //   void fetchAndSetImageBlob(parcelId);
  // }, [parcelId]);

  return (
    <>
      <div className="loading-container" style={{ width: `${size}em`, height: `${size}em` }}>
        <img src={`https://gotchiverse.s3.ap-northeast-1.amazonaws.com/${parcelId}.png`} />
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
