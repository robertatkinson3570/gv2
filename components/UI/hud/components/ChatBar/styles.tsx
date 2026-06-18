import css from 'styled-jsx/css';

export default css`
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .icon {
    position: absolute;
    bottom: 0.5rem;
    margin-top: 2rem;
    left: -1.6rem;
    width: 8rem;
    height: 9rem;
  }

  .toggle-wrapper {
    height: 4.4rem;
    background: linear-gradient(180deg, rgba(178, 36, 201, 0.65) 0%, rgba(0, 0, 0, 0.325) 52.6%, rgba(178, 36, 201, 0.65) 100%);
    display: flex;
  }

  .halloween .toggle-wrapper {
    background: linear-gradient(to top, rgba(231, 94, 17, 0.4), rgba(231, 94, 17, 0) 50%, rgba(231, 94, 17, 0.4) 100%);
  }

  .toggle-wrapper.hide,
  .halloween .toggle-wrapper.hide {
    display: none;
  }

  .filler {
    border-top: 0.1rem solid var(--col-pink-400);
  }

  .halloween .filler {
    border-top: 0.1rem solid var(--col-halloween-400);
  }

  .input-container {
    position: relative;
    width: 33rem;
    left: 5.1rem;
    height: 4rem;
    bottom: 4rem;
  }

  .input-container .input-text {
    resize: none;
    background: none;
    border: none;
    // border-top: .1rem solid var(--col-pink-400);
    padding: 0.4rem 1.2rem 0.4rem 2rem;
    color: white;
    font-size: 1.5rem;
    line-height: 2;
    height: 100%;
    width: 100%;
    text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black;
  }

  .input-container .input-text:focus {
    outline: none;
  }

  .remaining-chars-container {
    background: none;
    font-size: 2.5rem;
    color: var(--col-pink-350);
    line-height: 1.5;
    text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black;
  }

  .halloween .remaining-chars-container {
    // border-top: .1rem solid var(--col-halloween-400);
    color: var(--col-halloween-400);
  }

  .input-container .chat-action {
    background: none;
    border: none;
    // border-top: .1rem solid var(--col-pink-400);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
  }
`;
