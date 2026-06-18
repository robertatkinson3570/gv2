import styles from './styles';
import { Map } from 'components/UI/elements';
import { MiniMap, PlayerMarker } from 'assets/map';
import { usePhaser } from 'contexts/PhaserContext';

export const Minimap = (): JSX.Element => {
  const [{ playerPosition }] = usePhaser();

  return (
    <>
      <Map src={MiniMap} size={{ width: 2112, height: 1056 }} markers={[{ icon: PlayerMarker, coordinates: playerPosition }]} />
      <style jsx>{styles}</style>
    </>
  );
};
