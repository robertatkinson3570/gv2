import { MutableRefObject } from 'react';
import styles from './styles';
import Image from 'next/image';

interface Props {
  src: string;
  markers: Array<{
    icon: string;
    coordinates: {
      x: number;
      y: number;
    };
  }>;
  size: {
    width: number;
    height: number;
  };
  ref?: MutableRefObject<HTMLDivElement>;
}

export const Map = ({ src, markers, size, ref }: Props): JSX.Element => {
  const getMarkerPosition = (x: number, y: number) => {
    const horizontalPercentage = `calc(${(x * 100) / size.width}% - .2rem)`;
    const verticalPercentage = `calc(${(y * 100) / size.height}% - 1.2rem)`;

    return { top: verticalPercentage, left: horizontalPercentage };
  };

  return (
    <>
      <div className="map-container" ref={ref}>
        <Image alt="" src={src} className="map" />
        {markers.map((marker, i) => (
          <div className="marker-container" key={i} style={getMarkerPosition(marker.coordinates.x, marker.coordinates.y)}>
            <Image alt="" src={marker.icon} />
          </div>
        ))}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
