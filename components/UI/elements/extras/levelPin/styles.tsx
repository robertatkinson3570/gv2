import css from 'styled-jsx/css';

export default css`
  .level-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: -2.2em;
    left: -1.9em;
    background-color: #1e083a;
    font-size: 1.6rem;
    color: white;
    z-index: 1;
    width: 3.7em;
    height: 3.7em;
    border-radius: 0.4rem;
    color: var(--col-white);
    border: 0.4rem solid var(--col-pink-400);
  }
  .level-container.small {
    font-size: 0.9rem;

    top: 0.4rem;
    left: 0.4rem;
  }

  .level-container p,
  .level-container small {
    margin: 0;
    line-height: 1;
    text-align: center;
  }

  .level-container p {
    margin-top: -0.6rem;
    font-size: 3em;
    // font-weight: bold;
  }
  .level-container small {
    margin-top: -0.8rem;
    font-size: 1.2em;
  }

  .common {
    border-color: var(--col-common-400);
    background-color: var(--col-black);
  }
  .uncommon {
    border-color: var(--col-uncommon-400);
    background-color: var(--col-uncommon-500);
  }

  .rare {
    border-color: var(--col-rare-400);
    background-color: var(--col-rare-500);
  }
  .legendary {
    border-color: var(--col-legendary-400);
    background-color: var(--col-legendary-500);
  }
  .mythical {
    border-color: var(--col-mythical-400);
    background-color: var(--col-mythical-500);
  }
  .godlike {
    border-color: var(--col-godlike-400);
    background-color: var(--col-godlike-500);
  }
  .halloween {
    border-color: var(--col-halloween-border);
    background-color: var(--col-halloween-600);
  }
`;
