import css from 'styled-jsx/css';

export default css`
  .toggle-container {
    position: relative;
    top: 0.6rem;
    margin-right: 2rem;
  }

  .time-left {
    color: var(--col-info-400);
    text-align: center;
    font-size: 1.6rem;
    position: absolute;
    width: 100%;
  }
  .time-left.warning {
    color: var(--col-warning-400);
  }
  .time-left.danger {
    color: var(--col-error-400);
  }

  .content-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
  }

  .section-header {
    border-bottom: 0.2rem solid var(--col-blue-border);
  }
  .section-header h2 {
    color: var(--col-blue-border);
    text-align: center;
    text-transform: uppercase;
  }

  .assets,
  .lending-details {
    padding: 2.4rem 1.2rem 0;
    height: calc(100% - 5rem);
  }

  .button-container {
    margin-top: 5.4rem;
    display: flex;
    justify-content: center;
  }
`;
