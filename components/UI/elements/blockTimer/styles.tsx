import css from 'styled-jsx/css';

export default css`
  .container {
    width: 32rem;
    background: black;
    border: .2rem solid #02a5c9;
  }

  .estimated-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: .8rem;
  }

  .label {
    color: var(--col-info-300);
    font-size: 2.4rem;
    line-height: 2;
  }

  .blocks {
    color: var(--col-white);
    font-size: 3.2rem;
    line-height: 3.6rem;
  }

  .divider {
    border: .1rem solid #02a5c9;
  }

  .gltr-container {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    padding: .8rem;
    padding-bottom: 1.6rem;
    align-items: center;
    justify-content: center;
  }
  .speed-up {
    color: #4adbfb;
    font-size: 2.8rem;
    line-height: 3.2rem;
    text-transform: uppercase;
  }
  .gltr-value {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    font-size: 3.2rem;
    line-height: 3.6rem;
    color: var(--col-white);
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .input-container {
    display: flex;
  }

  .gltr-input {
    min-width: 14rem;
  }
  .gltr-container:before {
    left: 0;
    transform: translate(calc(-50% - .2rem), -50%);
  }

  .gltr-container:after {
    right: 0;
    transform: translate(calc(50% + .2rem), -50%);
  }

  .gltr-icon {
    display: flex;
    align-items: center;
    filter: grayscale(100%);
    opacity: 0.4;
  }

  .tick-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .tick-icon.hidden {
    display: none;
  }

  .input input {
    height: 100%;
    border: none;
    color: var(--col-white);
    text-align: center;
    background-color: var(--col-black);
    apparence: none;
  }


  .input input:focus {
    outline: none;
  }

  // Active
  .input-container.active,
  .input-container.active .gltr-container {
    border-color: var(--col-info-400);
  }

  .input-container.active .gltr-container:before,
  .input-container.active .gltr-container:after,
 

  .input-container.active .gltr-icon {
    filter: revert;
    opacity: 1;
  }

  // Error
  .input-container.error,
  .input-container.error .gltr-container {
    border-color: var(--col-error-400);
  }

  .input-container.error .gltr-container:before,
  .input-container.error .gltr-container:after,
  
`;
