import css from 'styled-jsx/css';

export default css`
  .auth {
    height: 5.5rem;
    width: 100%;
    margin-bottom: 3.2rem;
  }
  .auth a {
    color: var(--col-purple-400);
    text-align: right;
    font-size: 1.6rem;
    display: block;
  }

  .verified-check {
    background-color: var(--col-black);
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 0 2.4rem 0 1.2rem;
  }
  .verified-check p {
    margin: 0;
    color: var(--col-white);
  }

  .settings-container {
    padding: 2.4rem 3.2rem 0;
    width: 55rem;
  }
  .settings-container.scrollable {
    height: 55rem;
    overflow-y: auto;
  }

  .setting-container {
    background-color: transparent;
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;
  }
  .settings-container h3 {
    font-family: 'Alien Encounters Solid';
    color: var(--col-purple-300);
    font-size: 2em;
    line-height: 1.1;
    text-transform: uppercase;
  }
  .settings-container h3:not(:first-of-type) {
    margin-top: 2.4rem;
  }
  .setting-container p {
    margin: 0;
    padding: 0;
    color: white;
    font-size: 1.2em;
    line-height: 1;
  }
  .setting-container.radio {
    display: flex;
    justify-content: flex-start;
  }
  .setting-container.radio > p {
    width: 18.5rem;
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .halloween h3 {
    color: var(--col-halloween-400);
  }

  // .halloween.scrollable::-webkit-scrollbar-thumb {
  //   background: var(--col-halloween-400);
  //   box-shadow: 0 0 0.8rem 0.1rem var(--col-halloween-border);
  // }

  .option-header-decoration {
    flex-grow: 1;
    border-bottom: 3px solid var(--col-purple-300);
    margin-bottom: 0.8em;
    position: relative;
  }
  .option-header-decoration::after {
    content: ' ';
    position: absolute;
    width: 0.6em;
    height: 0.6em;
    background: var(--col-purple-300);
    bottom: -0.4em;
    right: 0;
  }
`;
