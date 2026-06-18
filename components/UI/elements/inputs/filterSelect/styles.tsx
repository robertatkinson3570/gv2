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
    border: 2px solid var(--col-pink-400);
    box-shadow: 0 0 6px 1px var(--col-pink-border);
    font-size: 24px;
    line-height: 30px;
    color: var(--col-pink-400);
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .select-container .indicator {
    position: absolute;
    top: 50%;
    width: 16px;
    right: 4px;
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
    border: 2px solid var(--col-pink-400);
    border-top: none;
    box-shadow: 0 1px 6px 1px var(--col-pink-border);
    padding-bottom: 4px;
  }

  .select-container .option,
  .select-container .value {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4px 12px 4px 12px;
    text-transform: capitalize;
    white-space: nowrap;
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .option.checked {
    color: var(--col-pink-200);
  }
  .option.sub {
    margin-left: 8px;
  }

  .select-container .option:hover {
    background-color: rgba(200, 42, 194, 0.2);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/
  .halloween.select-container {
    border: 2px solid var(--col-halloween-400);
    box-shadow: 0 0 6px 1px var(--col-halloween-border);
    color: var(--col-halloween-400);
  }
  
  .halloween.select-container .dropdown {
    border: 2px solid var(--col-halloween-400);
    box-shadow: 0 1px 6px 1px var(--col-halloween-border);
  }

  .halloween .option.checked {
    color: var(--col-halloween-200);
  }
`;
