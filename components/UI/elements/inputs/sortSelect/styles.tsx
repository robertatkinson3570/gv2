import css from 'styled-jsx/css';

export default css`
  .overlay {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .select-container {
    position: relative;
    border: 0.3rem solid var(--col-pink-400);
    border-radius: 0.3rem;
    font-size: 2.4rem;
    line-height: 3rem;
    color: var(--col-pink-400);
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 10;
    height: 100%;
  }
  .select-container.info {
    border-color: var(--col-blue-border);
    color: var(--col-info-400);
    background: rgba(0, 0, 0, 0.25);
  }
  .select-container.shadow.info {
    box-shadow: 0 0 0.4rem var(--col-blue-border), 0 0 0.4rem var(--col-blue-border);
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
  }
  .select-container.shadow .dropdown {
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-pink-border);
  }

  .select-container.info .dropdown {
    border-color: var(--col-info-400);
  }
  .select-container.shadow .dropdown {
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-blue-border);
  }
  .select-container .option,
  .select-container .value {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 1.2rem 0.4rem 1.2rem;
    // text-transform: capitalize;
    white-space: nowrap;
  }

  .option.active {
    color: var(--col-pink-200);
  }
  .select-container.info .option.active {
    color: var(--col-info-200);
  }

  .select-container .option:hover {
    background-color: rgba(200, 42, 194, 0.2);
  }

  .select-container.info .option:hover {
    background-color: rgba(0, 185, 225, 0.2);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .select-container.halloween {
    border: 0.2rem solid var(--col-halloween-400);
    color: var(--col-halloween-400);
  }
  .select-container.shadow.halloween {
    box-shadow: 0 0 0.6rem 0.1rem var(--col-halloween-border);
  }

  .select-container.halloween .dropdown {
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-halloween-border);
  }

  .select-container.shadow.halloween .dropdown {
    box-shadow: 0 0.1rem 0.6rem 0.1rem var(--col-halloween-border);
  }

  .halloween .option.active {
    color: var(--col-halloween-200);
  }

  .select-container.halloween .option:hover {
    background-color: rgba(231, 94, 17, 0.2);
  }
`;
