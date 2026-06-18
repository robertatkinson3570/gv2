import css from 'styled-jsx/css';

export default css`
  .button-container {
    padding: 0;
    border: 0;
    background: none;
  }

  .inner {
    display: flex;
    height: 4rem;
  }

  .loader-container {
    position: absolute;
    top: -0.4rem;
    left: -1.6rem;
  }
  .loader-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.4rem;
    height: 4rem;
  }

  .message-container {
    margin: -0.4rem 0.4rem -0.4rem 8.4rem;
  }
  .message-container p {
    font-size: 2.4rem;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    text-align: left;
  }
  .message-container p:first-of-type {
    color: var(--col-pink-400);
  }
`;
