import { Scene } from 'types/phaser';

let scene: Scene; // change to global
interface SceneControllerInterface {
  setScene: (sceneObj: Scene) => void;
}

function setScene(sceneObj: Scene) {
  scene = sceneObj;
  // debug: expose the active scene for inspection
  if (typeof window !== 'undefined') (window as any).__scene = sceneObj;
}

const SceneController: SceneControllerInterface = {
  setScene,
};

export { scene };

export default SceneController;
