import css from 'styled-jsx/css';

export default css`
  .quickslot-item {
    position: relative;
    font-size: 1rem;
    background: var(--col-quickslot-item-bg);
    border: 1px solid var(--border-color);
    border-radius: 2px;
    width: 100%;
    height: 100%;
    min-width: 3.8em;
    max-height: 3.8em;
    flex: 0 1 25%;
  }

  .cooldown-overlay {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: var(--border-color);
    opacity: 0.3;
    z-index: 2;
  }

  .cooldown-overlay.animate {
    animation-name: animate-height;
    animation-duration: var(--cooldown-duration);
  }

  .hotkey {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--col-quickslot-item-category-bg);
    border-radius: 2px;
    padding: 0.2em;
    line-height: 1;
    font-size: 1.2rem;
    color: var(--col-white);
    text-transform: uppercase;
  }

  .count {
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    font-family: Alien Encounters Solid;
    color: var(--border-color);
  }

  .potion-image {
    position: relative;
    width: 100%;
    min-height: 3.2em;
  }

  @keyframes animate-height {
    0% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  }
`;
