/* eslint-disable multiline-ternary */
import styles from './styles';
import { Recipe } from 'types';
import { nFormatter, calculateTimeFromBlocks, getAlchemicaIcon } from 'helpers/functions';
import { InstallationDisplayImg } from 'components/UI/elements';
import Image from 'next/image';
import { Spider, SpiderWebSmall } from 'assets';
import { QuantityWidget } from '../QuantityWidget';
import { useGame } from 'contexts/GameContext';

interface Props {
  requiredBalance: {
    fud: boolean;
    fomo: boolean;
    alpha: boolean;
    kek: boolean;
  };
  selectedRecipe?: Recipe;
  crafting: boolean;
  quantity?: number;
  maxQuantity?: number;
  setQuantity?: (target: number) => void;
}

export const CraftingProgress = ({ requiredBalance, selectedRecipe, crafting, quantity, maxQuantity, setQuantity }: Props): JSX.Element => {
  const haveRequiredIngredients = () => {
    return !Object.keys(requiredBalance).find((alchemica) => !requiredBalance[alchemica]);
  };

  const [{ gameConfig }] = useGame();
  return (
    <>
      <div className={`crafting-widget ${gameConfig.gotchiverseTheme}`}>
        <div className={`ingredient-panels ${haveRequiredIngredients() ? 'ready' : ''}`}>
          {['fud', 'fomo', 'alpha', 'kek'].map((alchemica, index) => (
            <div key={index} className={`ingredient-panel ${requiredBalance[alchemica] ? 'ready' : ''}`}>
              <p>{Number(nFormatter(selectedRecipe?.ingredients[alchemica] * quantity, 1)) || 0}</p>
              <Image alt="" src={getAlchemicaIcon(alchemica, gameConfig.gotchiverseTheme)} />
            </div>
          ))}
        </div>

        <div className="loading-container">
          {selectedRecipe && (
            <div className={`estimated-time-container ${crafting ? 'crafting' : ''}`}>
              <div className="estimated-blocks">
                <h4>Estimated time:</h4>
                <h2>{`${selectedRecipe.craftingTime} BLOCKS`}</h2>
              </div>
              <p className="estimated-days">{calculateTimeFromBlocks(selectedRecipe.craftingTime) || 'INSTANT'}</p>
            </div>
          )}
          <div className={`alchemica-funnel ${crafting ? 'crafting' : ''}`}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={`loading ${crafting ? 'crafting' : ''}`}>
            {gameConfig.gotchiverseTheme === 'halloween' && (
              <div className="spider-progress" style={{ left: '55%' }}>
                <Image alt="" src={Spider} layout="fill" />
              </div>
            )}
          </div>
          {gameConfig.gotchiverseTheme === 'halloween' && (
            <div className="spider-web">
              <Image alt="" src={SpiderWebSmall} layout="fill" />
            </div>
          )}
        </div>

        <div className={`craftable-item ${crafting ? 'crafting' : ''}`}>
          {selectedRecipe ? (
            <div className="selected-item">
              <QuantityWidget quantity={quantity} setQuantity={setQuantity} maxQuantity={maxQuantity} />
              <div className="img-container">
                <InstallationDisplayImg itemId={selectedRecipe.id} type={selectedRecipe.type} installationScale={1} />
              </div>
              <div className="name-container">
                <p>{selectedRecipe.name}</p>
              </div>
            </div>
          ) : (
            <span className="empty-state-icon">?</span>
          )}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
