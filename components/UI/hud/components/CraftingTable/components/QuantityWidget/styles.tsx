import css from 'styled-jsx/css';

export default css`
  .quantity-widget {
    max-width: 100%;
    display: grid;
    grid-template-columns: 4.6rem calc(100% - 9.2rem) 4.6rem;
    position: relative;
    height: 3.8rem;
  }
  .quantity-widget:after {
    position: absolute;
    content: '';
    top: 100%;
    height: 0.4rem;
    width: 100%;
    z-index: 1;
    background-color: var(--col-grey);
  }

  button {
    background-color: var(--col-pink-400);
    border: none;
    color: var(--col-white);
    height: 3.8rem;
    font-size: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.7rem;
    position: relative;
  }
  .halloween button {
    background-color: var(--col-halloween-400);
  }
  button:before {
    content: '';
    position: absolute;
    height: 0.4rem;
    width: 100%;
    background-color: var(--col-pink-500);
    bottom: 0;
  }
  .halloween button:before {
    background-color: var(--col-halloween-500);
  }
  button:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 0.4rem;
    background-color: var(--col-pink-500);
    right: 0;
    bottom: 0;
  }
  .halloween button:after {
    background-color: var(--col-halloween-500);
  }
  button:disabled {
    opacity: 0.5;
  }

  input {
    background-color: var(--col-black);
    text-align: center;
    font-size: 2rem;
    border: none;
    color: var(--col-pink-400);
    font-size: 2.6rem;
    padding: 0;
    height: 3.8rem;
    z-index: 4;
  }
  .halloween input {
    color: var(--col-halloween-400);
  }
  input:focus {
    outline: 0.2rem solid var(--col-pink-400);
  }
  .halloween input:focus {
    outline: 0.2rem solid var(--col-halloween-400);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
