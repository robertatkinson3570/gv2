import css from 'styled-jsx/css';

export default css`
  .button-wrapper {
    background: none;
    font-size: 2.8rem;
    border: none;
    width: 3em;
    height: 3em;
    padding: 0 0.25em;
    filter: drop-shadow(0 0 .4rem var(--col-info-400));
    margin: .4rem;
    position: relative;
    z-index: 0;
    opacity: 0.7;
    left: 0.5em;
  }
  .button-wrapper:hover{
    opacity: 1;
  }

  .button-wrapper.active {
    width: 3.5em;
    height: 3.5em;
    opacity: 1;
    left: 0em;
  }

  .outer {
    border-top: .2rem solid var(--col-info-400);
    border-bottom: .2rem solid var(--col-info-400);
    height: 100%;
    width: 100%;
    position: relative;
    z-index: -1;
  }
  .button-wrapper.active .outer {
    z-index: 1;
  }

  .cap {
    position: absolute;
    top: calc(0.25em - .2rem);
    height: calc(100% - 0.5em + .4rem);
    border-top: .2rem solid var(--col-info-400);
    border-bottom: .2rem solid var(--col-info-400);
    width: 0.25em;
  }
  .cap.left {
    border-left: .2rem solid var(--col-info-400);
    left: -0.25em;
  }

  .cap:before,
  .cap:after {
    content: '';
    position: absolute;
    width: .2rem;
    height: calc(0.25em + .2rem);
    background-color: var(--col-info-400);
  }

  .cap:before {
    bottom: calc(-0.25em - .2rem);
  }
  .cap:after {
    top: calc(-0.25em - .2rem);
  }

  .cap.left:after,
  .cap.left:before {
    right: -.2rem;
  }

  .inner {
    position: absolute;
    background-color: var(--col-info-400);
    clip-path: polygon(
      0% 0.25em,
      0.25em 0.25em,
      0.25em 0%,
      calc(100% - 1.05em) 0%,
      calc(100% - 1.05em) 100%,
      0.25em 100%,
      0.25em calc(100% - 0.25em),
      0% calc(100% - 0.25em)
    );
    width: calc(100% + 1em);
    height: calc(100% - 0.2em);
    top: 50%;
    left: -0.1em;
    transform: translate(0, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }
  .button-wrapper.active .inner {
    clip-path: polygon(
      0% 0.25em,
      0.25em 0.25em,
      0.25em 0%,
      calc(100% - 0.95em) 0%,
      calc(100% - 0.3em) 50%,
      calc(100% - 0.95em) 100%,
      0.25em 100%,
      0.25em calc(100% - 0.25em),
      0% calc(100% - 0.25em)
    );
  }
  .inner .img-container {
    width: calc(100% - 0.2em);
    height: calc(100% - 0.2em);
    clip-path: polygon(0% 0.25em, 0.25em 0.25em, 0.25em 0%, 100% 0%, 100% 100%, 0.25em 100%, 0.25em calc(100% - 0.25em), 0% calc(100% - 0.25em));
    background: linear-gradient(to bottom, rgba(0, 83, 106, 1), rgba(7, 13, 255, 1), rgba(89, 0, 213, 1));
    display: flex;
    align-items: center;
    padding-left: 0.0em;
  }
  .button-wrapper.active .inner .img-container {
    clip-path: polygon(
      0% 0.25em,
      0.25em 0.25em,
      0.25em 0%,
      calc(100% - 0.9em) 0%,
      calc(100% - 0.3em) 50%,
      calc(100% - 0.9em) 100%,
      0.25em 100%,
      0.25em calc(100% - 0.25em),
      0% calc(100% - 0.25em)
    );
    padding-left: 0.25em;
  }

  /* hover */
  .button-wrapper:hover {
    filter: drop-shadow(0 0 .4rem var(--col-info-300));
  }

  .button-wrapper:hover .outer,
  .button-wrapper:hover .cap {
    border-color: var(--col-info-300);
  }

  .button-wrapper:hover .cap:before,
  .button-wrapper:hover .cap:after {
    background-color: var(--col-info-300);
  }
`;
