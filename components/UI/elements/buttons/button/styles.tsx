import css from 'styled-jsx/css';

export default css`
  .button-container {
    padding: 0.2em;
    position: relative;
    z-index: 0;
    background-color: transparent;
    border: none;
    width: 7em;
  }
  .button-container.rounded {
    border: 0.2em solid transparent;
    padding: 0;
    overflow: hidden;
    border-radius: 0.2em;
  }

  .button-container:after,
  .button-container:before {
    z-index: -1;
    content: '';
    position: absolute;
  }
  .button-container:after,
  .button-container:before {
    background-color: var(--col-pink-700);
  }
  .button-container.rounded {
    border-color: var(--col-pink-700);
  }
  .button-container.rounded:before {
    background-color: var(--col-pink-700);
  }

  .button-container.secondary:after,
  .button-container.secondary:before {
    background-color: var(--col-purple-700);
  }
  .button-container.rounded.secondary:after,
  .button-container.rounded.secondary:before {
    border-color: var(--col-purple-700);
  }

  .button-container.success:after,
  .button-container.success:before {
    background-color: var(--col-success-600);
  }
  .button-container.rounded.success:after,
  .button-container.rounded.success:before {
    border-color: var(--col-success-600);
  }

  .button-container.info:after,
  .button-container.info:before {
    background-color: var(--col-info-600);
  }
  .button-container.rounded.info:after,
  .button-container.rounded.info:before {
    border-color: var(--col-info-600);
  }

  .button-container.halloween:after,
  .button-container.halloween:before {
    background-color: var(--col-halloween-600);
  }
  .button-container.rounded.halloween:after,
  .button-container.rounded.halloween:before {
    border-color: var(--col-halloween-600);
  }

  .button-container:disabled:after,
  .button-container:disabled:before {
    background-color: var(--col-grey-600);
  }
  .button-container.rounded:disabled:after,
  .button-container.rounded:disabled:before {
    border-color: var(--col-grey-600);
  }

  .button-container:after {
    top: 0;
    bottom: 0;
    left: 0.2em;
    right: 0.2em;
  }
  .button-container:before {
    left: 0;
    right: 0;
    top: 0.2em;
    bottom: 0.2em;
  }
  .button-container.rounded:after,
  .button-container.rounded:before {
    content: none;
  }

  .inner {
    position: relative;
    background-color: var(--col-pink-400);
    color: white;
    padding: 0.3em 0.4em 0.2em;
    line-height: 1;
    border-bottom: 0.2em solid var(--col-pink-500);
    border-right: 0.2em solid var(--col-pink-500);
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 1.1em;
  }

  .inner.build {
    position: relative;
    background-color: var(--col-pink-400);
    color: white;
    padding: 0.2em 0.4em 0.2em;
    line-height: 1;
    border-bottom: 0.2em solid var(--col-pink-500);
    border-right: 0.2em solid var(--col-pink-500);
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 1.4em;
  }

  .button-container.secondary .inner {
    background-color: var(--col-purple-400);
    border-bottom: 0.2em solid var(--col-purple-500);
    border-right: 0.2em solid var(--col-purple-500);
  }
  .button-container.success .inner {
    background-color: var(--col-success-400);
    border-color: var(--col-success-500);
  }
  .button-container.info .inner {
    background-color: var(--col-info-400);
    border-color: var(--col-info-500);
  }
  .button-container.halloween .inner {
    background-color: var(--col-halloween-400);
    border-color: var(--col-halloween-500);
  }
  .button-container:disabled .inner {
    background-color: var(--col-grey-400);
    border-color: var(--col-grey-500);
  }
  .button-container:not(:disabled):active .inner {
    background-color: var(--col-pink-500);
    border-color: var(--col-pink-400);
  }
  .button-container.secondary:not(:disabled):active .inner {
    background-color: var(--col-purple-500);
    border-color: var(--col-purple-400);
  }
  .button-container.success:not(:disabled):active .inner {
    background-color: var(--col-success-400);
    border-color: var(--col-success-300);
  }
  .button-container.info:not(:disabled):active .inner {
    background-color: var(--col-info-400);
    border-color: var(--col-info-300);
  }
  .button-container.halloween:not(:disabled):active .inner {
    background-color: var(--col-halloween-400);
    border-color: var(--col-halloween-300);
  }

  .button-container .inner:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 0.2em;
    width: calc(100% + 0.2em);
    background-color: var(--col-pink-300);
  }

  .button-container.secondary .inner:after {
    background-color: var(--col-purple-300);
  }
  .button-container.success .inner:after {
    background-color: var(--col-success-300);
  }
  .button-container.info .inner:after {
    background-color: var(--col-info-300);
  }
  .button-container.halloween .inner:after {
    background-color: var(--col-halloween-300);
  }
  .button-container:disabled .inner:after {
    background-color: var(--col-grey-300);
  }

  .button-container:not(:disabled):active .inner:after {
    background-color: var(--col-pink-600);
  }
  .button-container.secondary:not(:disabled):active .inner:after {
    background-color: var(--col-purple-600);
  }
  .button-container.success:not(:disabled):active .inner:after {
    background-color: var(--col-success-500);
  }
  .button-container.info:not(:disabled):active .inner:after {
    background-color: var(--col-info-500);
  }
`;
