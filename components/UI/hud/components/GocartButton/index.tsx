import { useState } from 'react';
import GameController from 'components/controllers/GameController';

// Click to hop on/off the gocart. The boost itself is server-authoritative
// (movement/toggle_cart -> world.js CART_FACTOR), so this just flips the state
// and tells the server; the client tweens to the faster server positions.
export const GocartButton = (): JSX.Element => {
  const [onCart, setOnCart] = useState(false);

  const toggle = () => {
    const next = !onCart;
    setOnCart(next);
    GameController.sendData('movement', 'toggle_cart', { action: next ? 'on' : 'off' });
  };

  return (
    <>
      <button
        type="button"
        className={`gocart-button ${onCart ? 'on' : ''}`}
        onClick={toggle}
        title={onCart ? 'Hop off the gocart' : 'Hop on the gocart (10x speed)'}
      >
        <span className="kart" aria-hidden>
          🛺
        </span>
        <span className="label">{onCart ? 'HOP OFF' : 'GO-CART'}</span>
      </button>
      <style jsx>{`
        .gocart-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.4rem;
          border-radius: 0.8rem;
          font-family: 'Alien Encounters Solid';
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          color: var(--col-white);
          background: linear-gradient(160deg, #2a1c52 0%, #160f2c 100%);
          border: 2px solid hsl(275 100% 64% / 0.55);
          box-shadow: 0 0 12px hsl(275 100% 64% / 0.3);
          cursor: url('/cursors/pointer.png'), pointer;
          transition: box-shadow 0.2s ease, transform 0.15s ease, border-color 0.2s ease;
        }
        .gocart-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 18px hsl(275 100% 64% / 0.45);
        }
        .gocart-button.on {
          color: #120d1f;
          background: linear-gradient(120deg, hsl(175 100% 56%), hsl(132 100% 64%));
          border-color: hsl(175 100% 56%);
          box-shadow: 0 0 20px hsl(175 100% 56% / 0.7);
        }
        .kart {
          font-size: 1.9rem;
          line-height: 1;
        }
      `}</style>
    </>
  );
};
