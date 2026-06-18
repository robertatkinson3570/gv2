import GameController from 'components/controllers/GameController';
import { useUI } from 'contexts/UIContexts';
import AarenaHUD from './aarenaHud';
import { BuildHud } from './buildHud';
import { PlayHud } from './playHud';

const Hud = (): JSX.Element => {
  const [{ hud }] = useUI();
  if (GameController.MAP === 'aarena') return <AarenaHUD />;

  switch (hud) {
    case 'BUILD':
      return <BuildHud />;
    case 'PLAY':
      return <PlayHud />;
    default:
      return <PlayHud />;
  }
};

export default Hud;
