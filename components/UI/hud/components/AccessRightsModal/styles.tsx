import css from 'styled-jsx/css';

export default css`
  .access-rights-container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 3.2rem 3.2rem 1.6rem 3.2rem;
    margin-top: -1rem;
    width: 100.2rem;
    min-height: 52.5rem;
  }
  .toggle-access-rights {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    margin-left: 0.8rem;
    width: fit-content;
  }
  .access-rights-label {
    color: var(--col-pink-350);
    padding-top: 1rem;
    font-size: 2.3rem;
    line-height: 1.8rem;
    width: 7.7rem;
    text-transform: uppercase;
    user-select: none;
    text-shadow: 0 0 5px var(--col-pink-350);
    -webkit-text-stroke: thin;
  }
  .access-rights-button {
    position: relative;
    width: 4rem;
    height: 5rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .access-rights-button:active {
    transform: scale(1.2);
  }
  .access-rights-setting-container {
    margin-left: 0.8rem;
    width: calc(100% - 1.6rem);
  }
  .roles-list {
    width: 70rem;
    height: 5rem;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 2rem;
    line-height: 1.6rem;
    color: var(--col-white);
    text-transform: capitalize;
    padding: 0.8rem 2rem 0.8rem 0;
  }
  .header-whitelist-id {
    color: var(--col-pink-400);
    width: 14rem;
    text-align: center;
  }
  .role {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 13.5rem;
  }
  .settings-list {
    height: 31rem;
  }
  .settings-list .row {
    height: 6.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 2rem 0 0;
    justify-content: center;
  }
  .settings-list > li:nth-child(odd) {
    background: rgba(79, 0, 83, 0.5);
  }
  .settings-list > li:nth-child(even) {
    background: rgba(45, 26, 46, 0.6);
  }
  .row .item-text {
    font-size: 2.6rem;
    line-height: 2.2rem;
    font-weight: 400;
    color: var(--col-pink-200);
    width: 13rem;
    word-break: break-word;
  }
  .access-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-left: 4rem;
    width: 22rem;
  }

  .access-item .icon-container {
    width: 3rem;
  }

  .option-container {
    width: 15rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .option {
    background: rgba(79, 0, 83, 0.6);
    border: 2px solid var(--col-pink-border);
    box-shadow: 0px 0px 2px 1px rgba(200, 42, 194, 0.8);
    border-radius: 9rem;
    width: 2.4rem;
    height: 2.4rem;
    cursor: url('/cursors/pointer.png'), pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .option:active {
    transform: scale(1.2);
  }
  .option .inner {
    background: var(--col-pink-400);
    box-shadow: inset 0px 0px 0px 3px var(--col-pink-550);
    border-radius: 9rem;
    width: 1.4rem;
    height: 1.4rem;
    // margin: 0.3rem;
  }
  .button-group {
    display: flex;
    margin-top: 2rem;
    justify-content: center;
    gap: 3rem;
  }
  .role-ticks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 54rem;
  }
  .whitelist-input {
    width: 8rem;
    height: 4rem;
    border: 1px solid var(--col-pink-border);
    color: var(--col-pink-400);
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
    padding-left: 1rem;
    outline: none;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.5;
    margin: 0 3rem;
  }
  .whitelist-input:enabled {
    border: 2px solid var(--col-pink-border);
    opacity: 1;
  }
  /************************************/
  /********* Halloween Style **********/
  /************************************/
  .comment .reservoir.halloween {
    color: var(--col-halloween-300);
  }
`;
