import { Candle1, Candle2, Candle2Right, Candle2Small, Candle3, PumpkinLeft, PumpkinRight } from 'assets';
import { useGame } from 'contexts/GameContext';
import Image from 'next/image';
import styles from './styles';

interface Props {
  children: React.ReactNode;
  title?: string;
  isHalloween?: boolean;
}

export const BorderedPanel = ({ children, title, isHalloween = false }: Props): JSX.Element => {
  const blockPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };
  const [{ gameConfig }] = useGame();

  return (
    <>
      <div className={`outer-box ${gameConfig.gotchiverseTheme}`} onClick={blockPropagation} onMouseDown={blockPropagation}>
        <div className="outer-left-cap outer-cap"></div>
        <div className="outer-right-cap outer-cap"></div>

        <div className="box-holder">
          {!!title && (
            <div className="title-panel">
              <div className="title-panel-contents">
                {isHalloween && (
                  <>
                    <div className="candle-top left">
                      <Image alt="" src={Candle2} layout="fill" objectFit="cover" />
                    </div>
                    <div className="candle-top center">
                      <Image alt="" src={Candle3} layout="fill" objectFit="cover" />
                    </div>
                    <div className="candle-top right">
                      <Image alt="" src={Candle2Right} layout="fill" objectFit="cover" />
                    </div>
                  </>
                )}
                <h2>{title}</h2>
              </div>
            </div>
          )}
          <div className="left-cap cap"></div>
          <div className="content">
            {children}
            {isHalloween && (
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
          <div className="right-cap cap"></div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
