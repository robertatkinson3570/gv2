import css from 'styled-jsx/css';

export default css`
  .wrapper {
    filter: drop-shadow(0 0 0.8rem var(--col-blue-border));
    position: relative;
    width: 100%;
    max-width: 90rem;
    padding: 0 7.5rem;
    margin: 0 auto;
  }

  .outer-border {
    background-color: var(--col-blue-border);
    clip-path: polygon(0 0, 100% 0, 100% 66%, 50% 100%, 0 66%);
    position: relative;
    width: 100%;
    min-height: 65rem;
  }

  .outer-container {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    clip-path: polygon(0 0, 100% 0, 100% calc(66% - 0.2rem), 50% calc(100% - 0.2rem), 0 calc(66% - 0.2rem));
    position: absolute;
    height: calc(100% - 0.8rem);
    width: calc(100% - 0.8rem);
    top: 0.4rem;
    left: 0.4rem;
  }

  .inner-border {
    background-color: rgba(0, 185, 225, 0.5);
    clip-path: polygon(0 0, 100% 0, 100% calc(66% - 0.4rem), 50% calc(100% - 0.6rem), 0 calc(66% - 0.4rem));
    position: relative;
    width: calc(100% - 3.2rem);
    height: calc(100% - 1.6rem);
    left: 1.6rem;
  }

  .inner-container {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    clip-path: polygon(0 0, 100% 0, 100% calc(66% - 0.2rem), 50% calc(100% - 0.2rem), 0 calc(66% - 0.2rem));
    position: absolute;
    height: calc(100% - 0.8rem);
    width: calc(100% - 0.8rem);
    top: 0;
    left: 0.4rem;
    padding: 7.2rem 3.2rem;
  }

  .title-container {
    background-color: var(--col-black);
    color: var(--col-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.2rem solid var(--col-blue-border);
    border-radius: 0.4rem;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 70%;
    max-width: 56rem;
    padding: 0.4rem 3.2rem;
  }
  .title-container h2 {
    text-transform: uppercase;
    margin: 0 0 0 1.2rem;
    font-size: 5rem;
  }

  .close-icon-container {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
