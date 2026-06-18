import { Vector2 } from 'types';
import GlobalState from 'contexts/GlobalState';
import _ from 'lodash';
import { GOTCHI_SIZE } from 'shared_code/constants/const.game';

const USE_DISTRICT_BASED = true;

const getGotchiPos = ({ x, y }: Vector2): Vector2 => {
  return {
    x: Math.floor(x / GOTCHI_SIZE.UNIT),
    y: Math.floor(y / GOTCHI_SIZE.UNIT),
  };
};

export const updateGlobalPlayerPos = _.throttle(
  (playerPosition: Vector2) => {
    const { x, y } = getGotchiPos(playerPosition);
    GlobalState?.PHASER?.dispatch({
      type: 'UPDATE_PLAYER_POSITION',
      playerPosition: USE_DISTRICT_BASED ? { x: x % 1056, y: y % 1056 } : { x, y },
    });
  },
  1000,
  { leading: true, trailing: false },
);
