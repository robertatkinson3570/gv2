import css from 'styled-jsx/css';

export default css`
  .button-container {
    position: relative;
    z-index: 0;
    background-color: transparent;
    border: none;
    width: 4em;
    height: 4em;
  }
  .button-container > span {
    position: absolute;
    background-color: var(--col-pink-400);
    height: 33.3%;
    width: 33.3%;
  }
  .button-container:hover > span {
    background-color: var(--col-pink-300);
  }

  .button-container.secondary > span {
    background-color: var(--col-purple-400);
  }
  .button-container.secondary:hover > span {
    background-color: var(--col-purple-300);
  }

  .button-container.info > span {
    background-color: var(--col-info-400);
  }
  .button-container.info:hover > span {
    background-color: var(--col-info-300);
  }

  .button-container.halloween > span {
    background-color: var(--col-halloween-400);
  }
  .button-container.halloween:hover > span {
    background-color: var(--col-halloween-300);
  }

  .button-container > span:first-child {
    top: 0;
    left: 0;
  }
  .button-container > span:nth-child(2) {
    top: 0;
    right: 0;
  }
  .button-container > span:nth-child(3) {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .button-container > span:nth-child(4) {
    bottom: 0;
    left: 0;
  }
  .button-container > span:nth-child(5) {
    bottom: 0;
    right: 0;
  }
`;
