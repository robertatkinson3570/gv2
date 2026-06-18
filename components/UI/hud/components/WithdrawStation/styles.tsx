import css from 'styled-jsx/css';

export default css`
  .title {
    font-size: 4rem;
    line-height: 1;
    margin-top: 1.6rem;
    margin-bottom: 2.4rem;
  }
  .withdraw-container {
    padding-left: 3.2rem;
    padding-bottom: 2.4rem;
    margin-top: -1.6rem;
  }
  .alchemica-icon {
    width: 4.8rem;
    height: 4.8rem;
  }
  .alchemica-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    filter: drop-shadow(0 0 0.4rem var(--col-pink-border));
  }
  .alchemica-wrapper.borrow {
    filter: drop-shadow(0 0 0.4rem var(--col-blue-border));
  }
  .bottom-wrapper {
    display: flex;
    flex-direction: row;
  }
  .alchemica-wrapper .bottom {
    height: 1.6rem;
    flex-grow: 1;
    border-width: 0.4rem;
    border-color: var(--col-pink-border);
    border-style: solid;
    border-top: none;
  }
  .alchemica-wrapper.borrow .bottom {
    border-color: var(--col-blue-border);
  }
  .bottom-wrapper::before {
    content: '';
    display: block;
    width: 1.2rem;
    border-top: 0.4rem solid var(--col-pink-border);
  }
  .alchemica-wrapper.borrow .bottom-wrapper::before {
    border-top: 0.4rem solid var(--col-blue-border);
  }
  .bottom-wrapper::after {
    content: '';
    display: block;
    width: 1.2rem;
    border-top: 0.4rem solid var(--col-pink-border);
  }
  .alchemica-wrapper.borrow .bottom-wrapper::after {
    border-top: 0.4rem solid var(--col-blue-border);
  }
  .alchemica-container {
    font-size: 3.2rem;
    display: flex;
    flex-direction: row;
    border-style: solid;
    border-width: 0.4rem;
    border-color: var(--col-pink-border);
    border-top: none;
    border-bottom: none;
    padding: 0.8rem 0.4rem 0rem 0.4rem;
  }
  .alchemica-wrapper.borrow .alchemica-container {
    border-color: var(--col-blue-border);
  }
  .alchemica {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding-right: 1.2rem;
  }
  .quantity.insufficient {
    color: var(--col-warning-400);
  }

  .warning {
    display: flex;
    align-items: center;
    margin-top: 0.4rem;
  }

  .warning p {
    margin: 0 0 0 1rem;
    font-size: 2rem;
    color: var(--col-warning-400);
  }

  .withdraw-button {
    width: 30rem;
  }

  /***********************************/
  /********  Halloween Style *********/
  /***********************************/

  .halloween .alchemica-wrapper {
    filter: drop-shadow(0 0 0.4rem var(--col-halloween-border));
  }

  .halloween .alchemica-wrapper .bottom {
    border-color: var(--col-halloween-border);
  }

  .halloween .bottom-wrapper::before {
    border-top: 0.4rem solid var(--col-halloween-border);
  }

  .halloween .bottom-wrapper::after {
    border-top: 0.4rem solid var(--col-halloween-border);
  }

  .halloween .alchemica-container {
    border-color: var(--col-halloween-border);
  }

`;
