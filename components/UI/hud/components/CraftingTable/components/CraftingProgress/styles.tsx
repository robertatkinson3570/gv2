import css from 'styled-jsx/css';

export default css`
  .crafting-widget {
    display: grid;
    grid-template-columns: 25.6rem 1fr 25.6rem;
  }

  .ingredient-panels {
    width: fit-content;
    display: grid;
    grid-template-columns: 12rem 12rem;
    grid-template-rows: 12rem 12rem;
    gap: 1.6rem;
    position: relative;
    z-index: 1;
  }
  .ingredient-panels:after {
    content: '';
    width: 14rem;
    height: 14rem;
    border: 0.4rem solid var(--col-grey);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .ingredient-panels.ready:after {
    border: 0.4rem solid var(--col-pink-400);
  }
  .halloween .ingredient-panels.ready:after {
    border: 0.4rem solid var(--col-halloween-400);
  }

  .ingredient-panel {
    border: 0.4rem solid var(--col-grey);
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 0.6rem 0.1rem var(--col-grey), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    background-color: var(--col-dark-grey);
    position: relative;
    padding-bottom: 1.2rem;
  }
  .ingredient-panel:before,
  .ingredient-panel:after {
    content: '';
    position: absolute;
    height: 0.8rem;
    width: 1.2rem;
    background-color: var(--col-grey);
    top: 50%;
  }
  .ingredient-panel:after {
    left: 0;
    transform: translate(calc(-50% - 0.2rem), -50%);
  }
  .ingredient-panel:before {
    right: 0;
    transform: translate(calc(50% + 0.2rem), -50%);
  }

  .ingredient-panel.ready {
    box-shadow: 0 0 0.6rem 0.1rem var(--col-pink-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    border: 0.4rem solid var(--col-pink-400);
  }
  .halloween .ingredient-panel.ready {
    box-shadow: 0 0 0.6rem 0.1rem var(--col-halloween-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    border: 0.4rem solid var(--col-halloween-400);
  }
  .ingredient-panel.ready:before,
  .ingredient-panel.ready:after {
    content: '';
    position: absolute;
    height: 0.8rem;
    width: 1.2rem;
    background-color: var(--col-pink-400);
    top: 50%;
  }
  .halloween .ingredient-panel.ready:before,
  .halloween .ingredient-panel.ready:after {
    background-color: var(--col-halloween-400);
  }

  .ingredient-panel p {
    color: var(--col-grey);
    font-size: 3.2rem;
    margin: 0;
    line-height: 1;
  }
  .ingredient-panel img {
    width: 5.4rem;
  }
  .ingredient-panel.ready p {
    color: var(--col-pink-400);
  }
  .halloween .ingredient-panel.ready p {
    color: var(--col-halloween-400);
  }
  .loading-container {
    display: flex;
    align-items: center;
    position: relative;
  }
  .loading-container .spider-web {
    position: absolute;
    right: -0.5rem;
    top: 1.6rem;
    width: 10rem;
    height: 11rem;
  }
  .spider-progress {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 6rem;
    height: 5.6rem;
  }
  .estimated-time-container {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    border: 0.2rem solid var(--col-grey);
    border-radius: 0.4rem;
    top: 1.2rem;
    height: 9rem;
    max-width: 40rem;
    width: calc(100% - 16.4rem);
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 300ms ease;
  }
  .estimated-time-container.crafting {
    opacity: 0;
  }
  .estimated-blocks {
    color: var(--col-pink-400);
    text-align: center;
    border-bottom: 0.2rem solid var(--col-grey);
    padding-bottom: 0.4rem;
    height: 6.2rem;
  }
  .halloween .estimated-blocks {
    color: var(--col-halloween-400);
  }
  .estimated-blocks h2,
  .estimated-blocks h4 {
    margin: 0;
    line-height: 1;
  }
  .estimated-days {
    text-align: center;
    font-size: 1.8rem;
    line-height: 1.2;
  }

  .alchemica-funnel {
    width: 7rem;
    height: 14rem;
    position: relative;
  }

  .alchemica-funnel > span:nth-child(1),
  .alchemica-funnel > span:nth-child(2),
  .alchemica-funnel > span:nth-child(3),
  .alchemica-funnel > span:nth-child(4),
  .alchemica-funnel > span:nth-child(5),
  .alchemica-funnel > span:nth-child(6),
  .alchemica-funnel > span:nth-child(7) {
    position: absolute;
    background-color: var(--col-grey);
  }

  .alchemica-funnel > span:nth-child(1),
  .alchemica-funnel > span:nth-child(2) {
    width: calc(100% - 1.2rem);
    height: 0.4rem;
  }

  .alchemica-funnel > span:nth-child(3),
  .alchemica-funnel > span:nth-child(4) {
    right: 1.2rem;
    height: 1.6rem;
    width: 0.4rem;
  }

  .alchemica-funnel > span:nth-child(5),
  .alchemica-funnel > span:nth-child(6) {
    right: 0;
    width: 1.2rem;
    height: 0.4rem;
  }

  .alchemica-funnel > span:nth-child(1),
  .alchemica-funnel > span:nth-child(3) {
    top: 0;
  }
  .alchemica-funnel > span:nth-child(2),
  .alchemica-funnel > span:nth-child(4) {
    bottom: 0;
  }

  .alchemica-funnel > span:nth-child(5) {
    top: 1.2rem;
  }
  .alchemica-funnel > span:nth-child(6) {
    bottom: 1.2rem;
  }
  .alchemica-funnel > span:nth-child(7) {
    width: 0.4rem;
    right: 0;
    top: 1.2rem;
    height: calc(100% - 2.4rem);
  }

  .loading {
    height: 0.4rem;
    width: 100%;
    background-color: var(--col-grey);
    position: relative;
  }

  .craftable-item {
    width: 25.6rem;
    height: 25.6rem;
    border: 0.4rem solid var(--col-grey);
    border-radius: 0.4rem;
    box-shadow: 0 0 0.6rem 0.1rem var(--col-grey), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    background-color: var(--col-dark-grey);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .craftable-item .empty-state-icon {
    color: var(--col-pink-600);
    font-size: 22rem;
    line-height: 1;
    text-align: center;
    margin-bottom: 2.4rem;
  }

  .halloween .craftable-item .empty-state-icon {
    color: var(--col-halloween-600);
  }

  .selected-item {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .selected-item .img-container {
    height: 21rem;
    width: 100%;
  }
  .selected-item .name-container {
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6rem;
  }
  .selected-item .name-container p {
    text-align: center;
    text-transform: uppercase;
    font-size: 3.6rem;
    line-height: 0.7;
    margin: 0;
  }

  /* Crafting animation */
  .alchemica-funnel > span:nth-child(1):after,
  .alchemica-funnel > span:nth-child(2):after,
  .alchemica-funnel > span:nth-child(3):after,
  .alchemica-funnel > span:nth-child(4):after,
  .alchemica-funnel > span:nth-child(5):after,
  .alchemica-funnel > span:nth-child(6):after,
  .alchemica-funnel > span:nth-child(7):after,
  .alchemica-funnel > span:nth-child(7):before,
  .loading:after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--col-pink-400);
    box-shadow: 0 0 0.4rem 0.1rem var(--col-pink-border);
  }

  .halloween .alchemica-funnel > span:nth-child(1):after,
  .halloween .alchemica-funnel > span:nth-child(2):after,
  .halloween .alchemica-funnel > span:nth-child(3):after,
  .halloween .alchemica-funnel > span:nth-child(4):after,
  .halloween .alchemica-funnel > span:nth-child(5):after,
  .halloween .alchemica-funnel > span:nth-child(6):after,
  .halloween .alchemica-funnel > span:nth-child(7):after,
  .halloween .alchemica-funnel > span:nth-child(7):before,
  .halloween .loading:after {
    background-color: var(--col-halloween-400);
    box-shadow: 0 0 0.4rem 0.1rem var(--col-halloween-border);
  }

  .alchemica-funnel > span:nth-child(1):after,
  .alchemica-funnel > span:nth-child(2):after,
  .alchemica-funnel > span:nth-child(5):after,
  .alchemica-funnel > span:nth-child(6):after,
  .loading:after {
    transform-origin: 0 50%;
    transform: scaleX(0);
  }

  .alchemica-funnel.crafting > span:nth-child(1):after,
  .alchemica-funnel.crafting > span:nth-child(2):after {
    animation: leftToRightFill 300ms forwards;
  }

  .alchemica-funnel > span:nth-child(3):after {
    transform-origin: 50% 0;
    transform: scaleY(0);
  }

  .alchemica-funnel > span:nth-child(4):after {
    transform-origin: 50% 100%;
    transform: scaleY(0);
  }

  .alchemica-funnel.crafting > span:nth-child(3):after,
  .alchemica-funnel.crafting > span:nth-child(4):after {
    animation: topToBottomFill 200ms forwards;
    animation-delay: 300ms;
  }

  .alchemica-funnel.crafting > span:nth-child(5):after,
  .alchemica-funnel.crafting > span:nth-child(6):after {
    animation: leftToRightFill 200ms forwards;
    animation-delay: 500ms;
  }

  .alchemica-funnel > span:nth-child(7):after,
  .alchemica-funnel > span:nth-child(7):before {
    transform: scaleY(0);
    height: 50%;
  }

  .alchemica-funnel > span:nth-child(7):after {
    transform-origin: 50% 0;
  }
  .alchemica-funnel > span:nth-child(7):before {
    bottom: 0;
    top: revert;
    transform-origin: 50% 100%;
    transform: scaleY(0);
  }

  .alchemica-funnel.crafting > span:nth-child(7):after,
  .alchemica-funnel.crafting > span:nth-child(7):before {
    animation: topToBottomFill 300ms forwards;
    animation-delay: 700ms;
  }

  .loading.crafting:after {
    animation: loadingFill 1200ms forwards;
    animation-delay: 1000ms;
  }

  .halloween .loading.crafting:after {
    animation: loadingFillHalloween 1200ms forwards;
  }

  @keyframes leftToRightFill {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  @keyframes topToBottomFill {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes loadingFill {
    0% {
      box-shadow: 0 0 0.4rem 0.1rem var(--col-pink-border);

      transform: scaleX(0);
    }
    50% {
      transform: scaleX(1);
    }
    100% {
      box-shadow: 0 0 1.2rem 0.2rem var(--col-pink-border);
      transform: scaleX(1);
    }
  }

  @keyframes loadingFillHalloween {
    0% {
      box-shadow: 0 0 0.4rem 0.1rem var(--col-halloween-border);

      transform: scaleX(0);
    }
    50% {
      transform: scaleX(1);
    }
    100% {
      box-shadow: 0 0 1.2rem 0.2rem var(--col-halloween-border);
      transform: scaleX(1);
    }
  }

  .craftable-item.crafting {
    animation: glow 1200ms forwards;
    animation-delay: 1600ms;
  }

  .halloween .craftable-item.crafting {
    animation: glowHalloween 1200ms forwards;
  }

  .craftable-item.crafting .selected-item {
    animation: fadeOut 600ms forwards;
    animation-delay: 2200ms;
  }

  @keyframes glow {
    0% {
      border-color: var(--col-grey);
      box-shadow: 0 0 0.6rem 0.1rem var(--col-grey), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
    50% {
      border-color: var(--col-pink-border);
      box-shadow: 0 0 1.6rem 0.3rem var(--col-pink-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
    100% {
      border-color: var(--col-pink-border);
      box-shadow: 0 0 0.6rem 0.1rem var(--col-pink-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
  }

  @keyframes glowHalloween {
    0% {
      border-color: var(--col-grey);
      box-shadow: 0 0 0.6rem 0.1rem var(--col-grey), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
    50% {
      border-color: var(--col-halloween-border);
      box-shadow: 0 0 1.6rem 0.3rem var(--col-halloween-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
    100% {
      border-color: var(--col-halloween-border);
      box-shadow: 0 0 0.6rem 0.1rem var(--col-halloween-border), 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
