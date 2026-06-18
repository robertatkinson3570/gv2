import css from 'styled-jsx/css';

export const styles = css`
  .caption-inner {
    background-color: var(--theme-game-border);
    border-bottom: 0.8rem solid var(--theme-page-title-border);
    position: relative;
    padding: 0.8rem 1.2rem;
  }

  .caption-inner h2 {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    color: var(--col-text);
    padding: 0;
  }

  .close-icon {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .content {
    padding: 0.6rem 1.8rem 1.2rem;
    max-height: calc(100vh - 6.5rem);
    overflow-y: auto;
    position: relative;
  }

  h2 {
    padding: 6rem 1.8rem 1.8rem;
    font-size: 3.8rem;
    line-height: 2.7rem;
    color: var(--col-purple-300);
    text-align: center;
  }
  .halloween h2 {
    color: var(--col-halloween-400);
  }
  .wallet-connect-button {
    display: flex;
    justify-content: center;
    width: 100%;
    top: -4.4rem;
    position: absolute;
  }
`;

export default styles;
