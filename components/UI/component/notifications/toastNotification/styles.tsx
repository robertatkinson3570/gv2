import css from 'styled-jsx/css';

export default css`
  .toast-container {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    border: 0.2rem solid var(--col-purple-border);
    border-left: none;
    border-bottom: 0.8rem solid var(--col-purple-border);
    width: fit-content;
    max-width: 40rem;
  }
  .toast-inner {
    padding: 1.2rem 2.4rem 1.2rem 1.2rem;
    display: flex;
    align-items: center;
    height: 100%;
    background: linear-gradient(to bottom, rgba(131, 72, 255, 0.7), rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 75%, rgba(131, 72, 255, 0.7));
  }

  .content-container {
    margin-left: 1.8rem;
    max-width: 31rem;
    word-wrap: break-word;
  }
  .content-container p {
    margin: 0;
    line-height: 1.2;
  }
  .message {
    font-size: 2.6rem;
    color: var(--col-purple-400);
    text-transform: capitalize;
  }
  .title {
    font-size: 2rem;
  }

  .toast-container.success .title {
    color: var(--col-success-400);
  }
  .toast-container.pending .title {
    color: var(--col-info-400);
  }
  .toast-container.error .title {
    color: var(--col-error-400);
  }
  .toast-container.info .title {
    color: var(--col-info-400);
  }
  .toast-container.warning .title {
    color: var(--col-warning-400);
  }

  .toast-container.build {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    border: 0.2rem solid var(--col-info-400);
    width: fit-content;
    max-width: 40rem;
  }
  .toast-container.build .toast-inner {
    padding: 1.2rem 2.4rem 1.2rem 1.2rem;
    display: flex;
    align-items: center;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 185, 243, 0.5), rgba(0, 185, 243, 0) 30%, rgba(0, 185, 243, 0) 70%, rgba(0, 185, 243, 0.5));
  }
  .toast-container.build .toast-inner .content-container .message {
    font-size: 2.6rem;
    color: var(--col-info-400);
    text-transform: capitalize;
  }
  .toast-container.build .title {
    color: #fff;
  }
`;
