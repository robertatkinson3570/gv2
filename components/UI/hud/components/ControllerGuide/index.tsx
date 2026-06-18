import { CombatGuide } from 'assets';
import { useUI } from 'contexts/UIContexts';
import Image from 'next/image';
import styles from './styles';

export const ControllGuide = (): JSX.Element => {
  const [{ controllerGuideOpen }, uiDispatch] = useUI();
  return (
    <>
      {controllerGuideOpen && (
        <div className="lobby-overlay" onClick={() => uiDispatch({ type: 'UPDATE_CONTROLLER_GUIDE', controllerGuideOpen: false })}>
          <div className="guide-container">
            <Image alt="" src={CombatGuide} />
          </div>
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
};
