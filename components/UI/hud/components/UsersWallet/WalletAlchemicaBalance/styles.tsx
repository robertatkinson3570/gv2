import css from 'styled-jsx/css';

export default css`
  .status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6.4rem;
  }
  .error-state,
  .loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .error-state p,
  .loading-state p {
    font-size: 2.8rem;
  }

  .loading-state p {
    color: var(--col-purple-400);
    margin: 0 0 0 1.6rem;
  }

  .error-state p {
    color: var(--col-error-400);
    margin: 0 0 0 .8rem;
  }

  .token {
    display: flex;
    align-items: center;
    padding-bottom: .4rem;
  }
  .token p {
    margin: 0 0 0 1.2rem;
    text-transform: uppercase;
    font-size: 2.8rem;
  }
`;
