import css from 'styled-jsx/css';

export default css`
  .toast-container {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    border: 0.2rem solid var(--col-purple-border);
    width: fit-content;
  }
  .toast-container.info {
    background: linear-gradient(to bottom, rgba(40, 4, 117, 0.8) 0.77%, rgba(0, 88, 169, 0.8) 99.23%), rgba(0, 0, 0, 0.15);
    border: 0.2rem solid var(--col-info-border);
    box-shadow: 0px 0px 6px var(--col-info-800);
    border-radius: 3px;
  }

  .toast-inner {
    padding: 1.2rem;
    display: flex;
    align-items: center;
    height: 100%;
    background: linear-gradient(to bottom, rgba(131, 72, 255, 0.7), rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0) 85%, rgba(131, 72, 255, 0.7));
  }
  .toast-container.info .toast-inner {
    padding: 0 1rem 0.7rem 1rem;
  }
  .toast-container.info .toast-inner {
    background: linear-gradient(to bottom, rgba(40, 4, 117, 0.8) 0.77%, rgba(0, 88, 169, 0.8) 99.23%), rgba(0, 0, 0, 0.15);
  }

  .content-container p {
    margin: 0;
    line-height: 1.2;
  }
  .message {
    font-size: 1.6rem;
    color: var(--col-white);
  }
  .title {
    font-size: 2rem;
    line-height: 0.9;
    color: var(--col-purple-200);
  }
  .action-container {
    display: flex;
  }

  .icon-button {
    background: none;
    border: 0;
    line-height: 0;
    width: 2.4rem;
    margin-left: 1rem;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    font-size: 2.2rem;
    color: var(--col-purple-300);
  }
  .action-info {
    color: var(--col-purple-300);
  }
  .toast-container.info .title {
    color: var(--col-info-400);
  }
  .toast-container.info .subtitle {
    font-size: 1.8rem;
    line-height: 1.2;
    color: var(--col-info-400);
    padding-right: 0.4rem;
  }
  .toast-container.info .action-info {
    color: var(--col-info-800);
  }
`;
