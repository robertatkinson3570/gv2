import { Candle1, Candle1Small, Candle2, Candle2Right, Candle2Small, Candle3Narrow, PumpkinLeft, PumpkinRight } from 'assets';
import { ModalWrapper } from 'components/UI/component';
import { CloseButton } from 'components/UI/elements';
import { useGame } from 'contexts/GameContext';
import Image from 'next/image';
import styles from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const RecipeBookModal = ({ open, onClose, children }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  return (
    <>
      <ModalWrapper open={open} onClose={onClose} fullWidth useHalloween>
        <div className={`wrapper ${gameConfig.gotchiverseTheme}`}>
          <div className="close-icon-container">
            <CloseButton onClick={onClose} color={gameConfig.gotchiverseTheme} />
          </div>
          {gameConfig.gotchiverseTheme === 'halloween' && (
            <>
              <div className="candle-layer-1 left">
                <Image alt="" src={Candle3Narrow} layout="fill" />
              </div>
              <div className="candle-layer-1 right">
                <Image alt="" src={Candle2} layout="fill" />
              </div>
              <div className="candle-layer-2 left">
                <Image alt="" src={Candle2} layout="fill" />
              </div>
              <div className="candle-layer-2 left">
                <Image alt="" src={Candle2} layout="fill" />
              </div>
              <div className="candle-layer-2 right">
                <Image alt="" src={Candle1Small} layout="fill" />
              </div>
            </>
          )}

          <div className="inner-container" onClick={(e) => e.stopPropagation()}>
            <div className="title-panel">
              <div className="title-panel-contents">
                {gameConfig.gotchiverseTheme === 'halloween' && (
                  <>
                    <div className="candle-top left">
                      <Image alt="" src={Candle2} layout="fill" objectFit="cover" />
                    </div>
                    <div className="candle-top right">
                      <Image alt="" src={Candle2Right} layout="fill" objectFit="cover" />
                    </div>
                  </>
                )}
                <h2>RECIPES BOOK</h2>
              </div>
            </div>
            <span className="divider" />
            {children}
            <span className="bottom-notch" />
            <span className="next-page-left" />
            <span className="next-page-right" />
            <span className="back-bottom-notch" />
            <span className="back-left-page" />
            <span className="back-right-page" />
            <span className="back-left-page-bottom" />
            <span className="back-right-page-bottom" />
            {gameConfig.gotchiverseTheme === 'halloween' && (
              <>
                <div className="pumpkin-bottom left">
                  <Image alt="" src={PumpkinLeft} layout="fill" />
                </div>
                <div className="pumpkin-bottom right">
                  <Image alt="" src={PumpkinRight} layout="fill" />
                </div>
                <div className="candle-bottom left">
                  <Image alt="" src={Candle2Small} layout="fill" />
                </div>
                <div className="candle-bottom right">
                  <Image alt="" src={Candle1} layout="fill" />
                </div>
              </>
            )}
          </div>
        </div>
      </ModalWrapper>
      <style jsx>{styles}</style>
    </>
  );
};
