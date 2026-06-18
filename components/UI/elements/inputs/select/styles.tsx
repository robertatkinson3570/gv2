import css from 'styled-jsx/css';

export default css`
  .select-container {
    position: relative;
    border: 0.2rem solid var(--col-pink-400);
    box-shadow: 0 0 0.6rem 0.1rem var(--col-pink-border);
    font-size: 2rem;
    color: var(--col-pink-400);
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .select-container.info {
    border: 0.2rem solid var(--col-info-400);
    box-shadow: 0 0 0.6rem 0.1rem var(--col-blue-border);
    color: var(--col-info-400);
  }
  .select-container .indicator {
    position: absolute;
    top: 50%;
    width: 1.6rem;
    right: 0.4rem;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-container .dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
    border: 0.2rem solid var(--col-pink-400);
    border-top: none;
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-pink-border);
  }

  .select-container.info .dropdown {
    border-color: var(--col-info-400);
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-info-400);
  }

  .select-container .option,
  .select-container .value {
    display: block;
    padding: 0.4rem 2.4rem 0.4rem 1.2rem;
    text-transform: capitalize;
    white-space: nowrap;
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .select-container .option:hover {
    background-color: rgba(200, 42, 194, 0.2);
  }

  .select-container.info .option:hover {
    background-color: rgba(0, 185, 241, 0.2);
  }
`;
