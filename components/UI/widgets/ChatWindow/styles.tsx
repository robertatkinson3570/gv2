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

  .scrollable {
    height: 24rem;
    margin-bottom: 0.4rem;
    animation: fadein 300ms;
  }

  .chat-input-container {
    display: grid;
    grid-template-columns: 1fr 6rem;
    margin-bottom: -1.6rem;
    position: relative;
  }
  .chat-input-container:focus-within:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 6rem);
    height: 0.2rem;
    background-color: var(--col-pink-400);
  }
  .halloween .chat-input-container:focus-within:after {
    background-color: var(--col-halloween-400);
  }

  .chat-input-container textarea {
    resize: none;
    background: linear-gradient(to top, rgba(200, 42, 194, 0.4), rgba(200, 42, 194, 0) 50%, rgba(200, 42, 194, 0.4) 100%);
    border: none;
    border-top: 0.1rem solid var(--col-pink-400);
    padding: 0.4rem 1.2rem;
    color: white;
    font-size: 2.2rem;
    height: 4.4rem;
    position: relative;
  }
  .halloween .chat-input-container textarea {
    background: linear-gradient(to top, rgba(231, 94, 17, 0.4), rgba(231, 94, 17, 0) 50%, rgba(231, 94, 17, 0.4) 100%);
    border-top: 0.1rem solid var(--col-halloween-400);
  }
  .chat-input-container textarea:focus {
    outline: none;
  }

  .chat-input-container button {
    background: var(--col-pink-400);
    border: none;
    position: relative;
  }
  .halloween .chat-input-container button {
    background: var(--col-halloween-400);
  }
  .chat-input-container button:before {
    content: '';
    position: absolute;
    left: 100%;
    top: 0.8rem;
    width: 1.2rem;
    height: calc(100% - 0.8rem);
    background-color: var(--col-pink-400);
  }
  .halloween .chat-input-container button:before {
    background-color: var(--col-halloween-400);
  }
  .chat-input-container button:after {
    content: '';
    position: absolute;
    left: 0.1rem;
    bottom: 0;
    width: calc(100% + 1.4rem);
    height: 0.8rem;
    background-color: var(--col-pink-500);
  }
  .halloween .chat-input-container button:after {
    background-color: var(--col-halloween-500);
  }
  // .halloween .scrollable::-webkit-scrollbar-thumb {
  //   background: var(--col-halloween-400);
  //   box-shadow: 0 0 0.8rem 0.1rem var(--col-halloween-border);
  // }
`;
