import { useState } from 'react';
import { VerticalSlider } from 'components/UI/elements/inputs';
import { usePhaser } from 'contexts/PhaserContext';
import { ZOOM_STEP, handleZoomSlider } from 'helpers/phaser.helper';

interface Props {
  color?: '' | 'yellow' | 'purple';
}

export const ZoomSlider = ({ color = '' }: Props): JSX.Element => {
  const [{ scene, zoom }] = usePhaser();
  const [value, setValue] = useState(1);

  return (
    <VerticalSlider
      min={0}
      max={100}
      step={ZOOM_STEP}
      value={Math.round((zoom * 100) / ZOOM_STEP) * ZOOM_STEP}
      onChange={(e) => {
        const zoom = Number(e.target.value);
        const zoomPercentage = zoom / 100;
        setValue(zoom);
        handleZoomSlider(zoomPercentage);
      }}
      size={1.6}
      color={color}
    />
  );
};
