import css from 'styled-jsx/css';

export default css`
  .input-container {
    height: 7rem;
    border: 0.2rem solid #617797;
    display: flex;
  }

  .gltr-container {
    width: 7rem;
    border: 0.2rem solid #617797;
    border-right-width: 0.4rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gltr-container:before,
  .gltr-container:after {
    content: '';
    height: 0.6rem;
    position: absolute;
    top: 50%;
    width: 1.2rem;
    background-color: #617797;
  }
  .gltr-input {
    min-width: 19.2rem;
  }
  .gltr-container:before {
    left: 0;
    transform: translate(calc(-50% - 0.2rem), -50%);
  }

  .gltr-container:after {
    right: 0;
    transform: translate(calc(50% + 0.2rem), -50%);
  }

  .gltr-icon {
    display: flex;
    align-items: center;
    filter: grayscale(100%);
    opacity: 0.4;
  }

  .input {
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: var(--col-black);
  }
  .label {
    text-align: center;
    font-size: 2.4rem;
    line-height: 1;
    position: relative;
    height: 100%;
  }
  .label:after {
    content: '';
    position: absolute;
    top: calc(100% - 0.1rem);
    left: 0;
    height: 0.2rem;
    width: 100%;
    background-color: #617797;
  }
  .input input {
    border: none;
    color: var(--col-white);
    text-align: center;
    font-size: 2rem;
    background-color: var(--col-black);
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
  .input-container.active .label:after {
    background-color: var(--col-info-400);
  }

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
  .input-container.error .label:after {
    background-color: var(--col-error-400);
  }
`;
