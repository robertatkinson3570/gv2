import styles from './styles';
import { getOnChainAlchemicaIcon, nFormatter } from 'helpers/functions';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AlchemicaType } from 'contexts/UIContexts/store';
import { useRealm } from 'contexts/RealmContext';
import { AlchemicaNumbers, AllowedTokenTypes } from 'types';
import GameController from 'components/controllers/GameController';
import _ from 'lodash';
import InputController from 'components/controllers/inputController';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { handleDrop } from 'helpers/items.helpers';
const CHAR_LIMIT = 40;
interface Props {
  open: boolean;
  onClose: () => void;
  color?: string;
  size?: number;
  width?: string;
}

const alchemicaDefaults: AlchemicaNumbers = {
  fud: 0,
  fomo: 0,
  alpha: 0,
  kek: 0,
  // gltr: 0,
};

export const TippingManager = ({ size, open, width, onClose }: Props): JSX.Element => {
  const [{ playerWallet }, realmDispatch] = useRealm();
  const imgSize = 12 * size || 32;
  const [alchemicaInputs, setAlchemicaInputs] = useState<AlchemicaNumbers>(alchemicaDefaults);
  const [active, setActive] = useState<AlchemicaType>();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!open) setActive(undefined);
    InputController.updateDisableKeyboard(open, true);
    if (open) clearInputs();
  }, [open]);

  const clearInputs = () => {
    setMessage('');
    setAlchemicaInputs(alchemicaDefaults);
  };

  const handleActive = (type): void => {
    if (open) setActive(type as AlchemicaType);
  };

  const onchange = (token: AlchemicaType, val: number) => {
    val = val > playerWallet[token] ? playerWallet[token] : val;
    setAlchemicaInputs({ ...alchemicaInputs, [token]: val });
  };

  const sendSuperChat = () => {
    const amount = {};
    _.each(alchemicaInputs, (val, token) => {
      if (val) amount[token.toUpperCase()] = val;
    });
    console.warn('@sendSuperChat:', { message, amount });
    GameController.sendData('game-actions', 'tip', { message, amount });

    onClose();
  };

  const sum = (): number => _.sum(_.values(alchemicaInputs));
  return (
    <>
      <div className="tipping-manager-component" style={{ width: width || '50rem' }}>
        {Object.keys(playerWallet).map((token, i) => {
          return (
            <div
              className={`token-wrapper  ${active === token ? 'active' : 'clickable'}`}
              key={token}
              onClick={() => !open && handleDrop(token.toLocaleUpperCase() as AllowedTokenTypes)}
            >
              <div className={`alchemica-token flex-c-c ${open ? 'open clickable ' : ''}`} onClick={() => handleActive(token)}>
                <Image alt="" src={getOnChainAlchemicaIcon(token)} width={imgSize} height={imgSize} />
                <p className="value" style={size ? { fontSize: `${size}rem` } : {}}>
                  {nFormatter(playerWallet[token], 1)}
                </p>
              </div>
              {open && (
                <div className="input-wrapper">
                  <input
                    onClick={() => setActive(token as AlchemicaType)}
                    className="alchemica-input"
                    type="number"
                    value={Number(alchemicaInputs[token]).toFixed(0)}
                    onChange={(e) => onchange(token as AlchemicaType, Number(e.target.value))}
                    min={0}
                    max={Number(playerWallet[token])}
                  />
                </div>
              )}
            </div>
          );
        })}
        {open && (
          <>
            <input
              className="super-chat-input"
              type="text"
              value={message}
              maxLength={CHAR_LIMIT}
              placeholder="Say something aavesome!"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`cta-button ${!sum() ? 'disabled' : ''}`} disabled={!sum()} onClick={sendSuperChat}>
              send super chat
            </button>
          </>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
