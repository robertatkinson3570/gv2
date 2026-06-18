import css from 'styled-jsx/css';

export default css`
  .wallet-toggle-container {
    border: none;
    padding: 0;
    background: none;
    height: 100%;
    margin: 0 1rem;
  }
  .inner {
    display: flex;
    align-items: center;
    padding: 1rem 1.2rem 0.5rem 0.6rem;
  }

  .jazzicon {
    border: 2px solid var(--col-purple-300);
    border-radius: 50%;
    overflow: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-details {
    margin-left: 1.2rem;
  }

  .user-details p {
    margin: 0;
    line-height: 1;
    text-align: left;
  }

  .user-details .address {
    font-size: 2rem;
    line-height: 0.8;
  }
  .user-details .network {
    color: var(--col-purple-300);
    font-size: 2rem;
    text-transform: capitalize;
  }
`;
