import css from 'styled-jsx/css';

export default css`
  .range-container {
    position: relative;
    width: fit-content;
    height: 13em;
  }

  .input-container {
    -webkit-transform: rotate(-90deg) translate(-6em, -2em);
    position: relative;
    width: 13em;
    opacity: 0.5;
  }

  .input-container:hover {
    -webkit-transform: rotate(-90deg) translate(-6em, -2em);
    position: relative;
    width: 13em;
    opacity: 1;
  }

  input[type='range'] {
    -webkit-appearance: none;
    -moz-appearance: initial;
    background-color: transparent;
    padding: 0;
    width: 13em;
    position: relative;
    z-index: 1;
    cursor: url('/cursors/pointer.png'), pointer;
    opacity: 0.5;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']:hover {
    opacity: 1;
  }
  .input-container:after {
    content: '';
    position: absolute;
    z-index: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 50%;
    border-top: 0.6rem solid transparent;
    border-right: 13em solid var(--col-pink-300);
    border-bottom: 0.6rem solid transparent;
    filter: drop-shadow(0 0 0.4rem var(--col-pink-300));
    opacity: 0.6;
    transform: translateY(-0.9rem);
  }

  .halloween .input-container:after {
    border-right: 13em solid var(--col-halloween-300);
    filter: drop-shadow(0 0 0.4rem var(--col-halloween-300));
  }

  .yellow .input-container:after {
    border-right: 13em solid var(--col-yellow-100);
    filter: drop-shadow(0 0 0.4rem var(--col-yellow-100));
  }

  .purple .input-container:after {
    border-right: 13em solid var(--col-purple-250);
    filter: drop-shadow(0 0 0.4rem var(--col-purple-250));
  }

  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 4rem;
    bottom: 0.5rem;
    width: 1rem;
    border-radius: 0;
    background: var(--col-pink-300);
  }

  .halloween input[type='range']::-moz-range-thumb {
    background: var(--col-halloween-300);
  }
  .yellow input[type='range']::-moz-range-thumb {
    background: var(--col-yellow-100);
  }
  .purple input[type='range']::-moz-range-thumb {
    background: var(--col-purple-250);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 4rem;
    width: 1rem;
    border-radius: 0;
    background: var(--col-pink-300);
  }

  .halloween input[type='range']::-webkit-slider-thumb {
    background: var(--col-halloween-300);
  }
  .yellow input[type='range']::-webkit-slider-thumb {
    background: var(--col-yellow-100);
  }
  .purple input[type='range']::-webkit-slider-thumb {
    background: var(--col-purple-250);
  }

  .value {
    position: absolute;
    width: 3.3rem;
    right: calc(100% - 2.35em);
    text-align: center;
    color: var(--col-pink-300);
    line-height: 0;
    font-size: 2.3em;
    pointer-events: none;
    text-shadow: -0rem 0.2rem 0.1rem#000, -0rem -0.2rem 0.1rem#000, 0.2rem 0rem 0.1rem#000, -0.2rem 0rem 0.1rem#000;
  }

  .halloween .value {
    color: var(--col-halloween-300);
  }
  .yellow .value {
    color: var(--col-yellow-100);
  }
  .purple .value {
    color: var(--col-purple-250);
  }
  @media screen and (max-height: 900px) {
    .range-container {
      position: relative;
      width: fit-content;
      height: 11em;
      left: 1.3rem;
    }

    .input-container {
      -webkit-transform: rotate(-90deg) translate(-5em, -2em);
      position: relative;
      width: 11em;
      opacity: 0.5;
    }

    .input-container:hover {
      -webkit-transform: rotate(-90deg) translate(-5em, -2em);
      position: relative;
      width: 11em;
      opacity: 1;
    }

    input[type='range'] {
      -webkit-appearance: none;
      -moz-appearance: initial;
      background-color: transparent;
      padding: 0;
      width: 11em;
      position: relative;
      z-index: 1;
      cursor: url('/cursors/pointer.png'), pointer;
      opacity: 0.5;
    }
    input[type='range']:focus {
      outline: none;
    }
    input[type='range']:hover {
      opacity: 1;
    }
    .input-container:after {
      content: '';
      position: absolute;
      z-index: 0;
      width: 0;
      height: 0;
      left: 0;
      top: 50%;
      border-top: 0.4rem solid transparent;
      border-right: 11em solid var(--col-pink-300);
      border-bottom: 0.4rem solid transparent;
      filter: drop-shadow(0 0 0.4rem var(--col-pink-300));
      opacity: 0.6;
      transform: translateY(-0.9rem);
    }

    .halloween .input-container:after {
      border-right: 11em solid var(--col-halloween-300);
      filter: drop-shadow(0 0 0.4rem var(--col-halloween-300));
    }

    .yellow .input-container:after {
      border-right: 11em solid var(--col-halloween-300);
      filter: drop-shadow(0 0 0.4rem var(--col-yellow-100));
    }
    .purple .input-container:after {
      border-right: 11em solid var(--col-purple-250);
      filter: drop-shadow(0 0 0.4rem var(--col-purple-250));
    }

    input[type='range']::-moz-range-thumb {
      -webkit-appearance: none;
      border: none;
      height: 3rem;
      bottom: 0.5rem;
      width: 1rem;
      border-radius: 0;
      background: var(--col-pink-300);
    }

    .halloween input[type='range']::-moz-range-thumb {
      background: var(--col-halloween-300);
    }
    .yellow input[type='range']::-moz-range-thumb {
      background: var(--col-yellow-100);
    }
    .purple input[type='range']::-moz-range-thumb {
      background: var(--col-purple-250);
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 3rem;
      width: 1rem;
      border-radius: 0;
      background: var(--col-pink-300);
    }

    .halloween input[type='range']::-webkit-slider-thumb {
      background: var(--col-halloween-300);
    }
    .yellow input[type='range']::-webkit-slider-thumb {
      background: var(--col-yellow-100);
    }
    .purple input[type='range']::-webkit-slider-thumb {
      background: var(--col-purple-250);
    }

    .value {
      position: absolute;
      width: 4.3rem;
      right: calc(100% - 2.6em);
      text-align: center;
      color: var(--col-pink-300);
      line-height: 0;
      font-size: 1.8em;
      pointer-events: none;
      text-shadow: -0rem 0.2rem 0.1rem#000, -0rem -0.2rem 0.1rem#000, 0.2rem 0rem 0.1rem#000, -0.2rem 0rem 0.1rem#000;
    }

    .halloween .value {
      color: var(--col-halloween-300);
    }
    .yellow .value {
      color: var(--col-yellow-100);
    }
    .purple .value {
      color: var(--col-purple-250);
    }
  }
`;
