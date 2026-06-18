import css from 'styled-jsx/css';

export default css`
  .box-holder {
    position: relative;
    width: fit-content;
  }

  .title-panel {
    background-color: var(--col-black);
    border: 0.3rem solid var(--col-blue-border);
    box-shadow: 0 0 0.8rem 0.2rem var(--col-blue-border);
    border-radius: 0.6rem;
    padding: 1rem 0.8rem 1.4rem;
    position: absolute;
    z-index: 2;
    left: 50%;
    min-width: 66.6%;
    transform: translate(-50%, -50%);
  }

  .title-panel h2 {
    text-align: center;
    color: var(--col-white);
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
    font-size: 4.2rem;
  }

  .inner {
    width: fit-content;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    position: relative;
    z-index: 1;
    color: white;
    max-height: calc(100vh - 7.4rem);
    clip-path: polygon(
      0% 2.5em,
      3em 2.5em,
      3em 0%,
      calc(100% - 3em) 0%,
      calc(100% - 3em) 2.5em,
      100% 2.5em,
      100% calc(100% - 2.1em),
      calc(50% + 17rem) calc(100% - 2.1em),
      calc(50% + 17rem) 100%,
      calc(50% - 17rem) 100%,
      calc(50% - 17rem) calc(100% - 2.1em),
      0 calc(100% - 2.1em)
    );
  }

  .content {
    width: calc(100% + 1em);
    height: calc(100% + 1em);
    background-color: var(--col-info-400);
    clip-path: polygon(
      0% 2.5em,
      3em 2.5em,
      3em 0%,
      calc(100% - 3em) 0%,
      calc(100% - 3em) 2.5em,
      100% 2.5em,
      100% calc(100% - 2.1em),
      calc(50% + 17.4rem) calc(100% - 2.1em),
      calc(50% + 17.4rem) 100%,
      calc(50% - 17.4rem) 100%,
      calc(50% - 17.4rem) calc(100% - 2.1em),
      0 calc(100% - 2.1em)
    );
  }

  .shadow {
    filter: drop-shadow(0rem 0rem 0.8rem var(--col-blue-border));
  }

  .outer {
    height: 100%;
  }
`;
