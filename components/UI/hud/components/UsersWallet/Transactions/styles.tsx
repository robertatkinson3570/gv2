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
    margin: 0 0 0 0.8rem;
  }

  .transactions-content {
    position: relative;
  }

  .transactions-content:after {
    content: '';
    position: absolute;
    height: 4.2rem;
    left: 0;
    right: 0.8rem;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  }

  .transactions-content .secondary {
    max-height: 29rem;
  }

  .transactions-grid {
    margin-bottom: 2rem;
    height: 100%;
  }

  .transactions-grid a:hover {
    text-decoration: none;
  }

  .transaction-info-container {
    font-size: 2.1rem;
    color: var(--col-warning-400);
    padding-left: 0.4rem;
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
  }

  .transaction-info-container p {
    line-height: 1.2;
    margin-bottom: 0;
  }

  .info-details {
    margin-left: 1rem;
  }

  .borrow-info {
    text-weight: bold;
    color: var(--col-info-300);
  }

  .transaction-pending {
    text-transform: uppercase;
    font-weight: bold;
  }

  .link-wrapper {
    display: block;
  }

  .tooltip-wrapper {
    position: absolute;
    left: 100%;
    transform: translate(-2rem, -150%);
    z-index: 1;
    min-width: stretch;
  }

  .transaction-row {
    display: grid;
    grid-template-columns: 3rem 1fr 1fr 1fr 1fr 1fr 1.5fr;
    width: 100%;
    color: var(--col-purple-300);
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
    gap: 0.2rem;
  }

  .transaction-row:hover {
    color: var(--col-purple-200);
  }

  .transaction-row > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status img {
    height: 2.6rem;
  }
`;
