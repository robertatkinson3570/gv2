import GlobalState from 'contexts/GlobalState';
import { MAP_CONFIG_BY_ID, MAP_ID_CITAADEL } from 'shared_code/constants/const.game';
import { MusicTheme } from 'types';
import GameController from './GameController';
import SFXController from './SFXController';

interface MinigameControllerInterface {
  playRoundAnim: (state: boolean) => void;
  onRoundChange: () => void;
  getMusicTheme: () => MusicTheme;
  onModeChange: () => void;
}

const onModeChange = (): void => {
  if (GlobalState.GAME.state.gameConfig.miniGameMode) {
    if (GlobalState.GAME.state.gameConfig.miniGameRoundActive) {
      SFXController.musicPlay(getMusicTheme());
    } else {
      SFXController.musicPlay(SFXController.getDefaultMusicTheme());
    }
  } else {
    SFXController.musicPlay(SFXController.getDefaultMusicTheme());
  }
};

const onRoundChange = (): void => {
  // console.log('@onRoundChange:', GlobalState.GAME.state.gameConfig.miniGameRoundActive);
  SFXController.musicPlay(GlobalState.GAME.state.gameConfig.miniGameRoundActive ? getMusicTheme() : SFXController.getDefaultMusicTheme());

  GlobalState.PHASER.dispatch({
    type: 'UPDATE_ROUND_ACTIVE',
    miniGameRoundActive: GlobalState.GAME.state.gameConfig.miniGameRoundActive,
  });
  if (!GlobalState.GAME.state.gameConfig.miniGameRoundActive) playRoundAnim(false);
  // Disable shootmode during rounds
  const shootMode = MAP_CONFIG_BY_ID[GameController.MAP || MAP_ID_CITAADEL].SHOOT_MODE;
  GameController.toggleShooting(
    Boolean(shootMode || (GlobalState.GAME.state.gameConfig.miniGameMode && GlobalState.GAME.state.gameConfig.miniGameRoundActive)),
  );
};
const getMusicTheme = (): MusicTheme => {
  if (GlobalState.GAME.state.gameConfig.gotchiverseTheme === 'tooorkey') {
    return 'theme_turkey';
  } else if (GlobalState.GAME.state.gameConfig.gotchiverseTheme === 'halloween') {
    return 'theme_halloween';
  } else return SFXController.getDefaultMusicTheme();
};

const playRoundAnim = (state: boolean): void => {
  if (state) {
    // Trigger Minigame Intro Animation
    GlobalState.PHASER.dispatch({
      type: 'UPDATE_MINIGAME_INTRO_ANIMATION',
      minigameIntroAnimation: true,
    });

    SFXController.fadeIn('round_begin_sound');
    SFXController.musicPlay(getMusicTheme());

    // Hide Intro Animation
    setTimeout(() => {
      GlobalState.PHASER.dispatch({
        type: 'UPDATE_MINIGAME_INTRO_ANIMATION',
        minigameIntroAnimation: false,
      });
    }, 4000);
  } else {
    SFXController.musicPlay('theme_citaadel');
  }
};

const MinigameController: MinigameControllerInterface = {
  playRoundAnim,
  onRoundChange,
  onModeChange,
  getMusicTheme,
};

export default MinigameController;
