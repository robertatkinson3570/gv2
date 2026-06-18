import css from 'styled-jsx/css';

export default css`
  .lending-details-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .session-time p {
    margin: 0;
    line-height: 1.1;
  }
  .session-time .label {
    color: var(--col-white);
    text-transform: uppercase;
    font-size: 2.2rem;
  }
  .session-time .time-left {
    color: var(--col-blue-border);
    font-size: 3.2rem;
  }

  .indicator {
    width: 2.2rem;
    height: 2.2rem;
    border: 0.2rem solid;
  }

  .key {
    display: flex;
    align-items: center;
  }
  .key p {
    font-size: 2.6rem;
    margin: 0 0 0 1.2rem;
    text-transform: capitalize;
  }

  .key.borrower .indicator {
    border-color: var(--col-blue-border);
    box-shadow: 0 0 0.4rem 0.4rem rgba(0, 185, 225, 0.4);
    background-color: rgba(0, 185, 225, 0.3);
  }
  .key.borrower p {
    color: var(--col-blue-border);
  }

  .key.owner .indicator {
    border-color: var(--col-pink-border);
    box-shadow: 0 0 0.4rem 0.4rem rgba(200, 42, 194, 0.4);
    background-color: rgba(200, 42, 194, 0.3);
  }
  .key.owner p {
    color: var(--col-pink-border);
  }

  .key.other .indicator {
    border-color: var(--col-purple-border);
    box-shadow: 0 0 0.4rem 0.4rem rgba(131, 72, 255, 0.4);
    background-color: rgba(131, 72, 255, 0.3);
  }
  .key.other p {
    color: var(--col-purple-border);
  }

  .graph-container {
    height: 100%;
    width: 7.2rem;
    display: flex;
    flex-direction: column;
  }

  .slice {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slice p {
    margin: 0;
    font-size: 2rem;
  }

  .slice.borrower {
    border-top: 0.2rem solid var(--col-blue-border);
    border-left: 0.2rem solid var(--col-blue-border);
    border-right: 0.2rem solid var(--col-blue-border);
    box-shadow: 0 0 0.4rem 0.4rem rgba(0, 185, 225, 0.4);
    background-color: rgba(0, 185, 225, 0.3);
  }
  .slice.borrower p {
    color: var(--col-blue-border);
  }

  .slice.owner {
    box-shadow: 0 0 0.4rem 0.4rem rgba(200, 42, 194, 0.4);
    background-color: rgba(200, 42, 194, 0.3);
    border-left: 0.2rem solid var(--col-pink-border);
    border-right: 0.2rem solid var(--col-pink-border);
  }
  .slice.owner p {
    color: var(--col-pink-border);
  }

  .slice.other {
    border-bottom: 0.2rem solid var(--col-purple-border);
    border-left: 0.2rem solid var(--col-purple-border);
    border-right: 0.2rem solid var(--col-purple-border);
    border-color: var(--col-purple-border);
    box-shadow: 0 0 0.4rem 0.4rem rgba(131, 72, 255, 0.4);
    background-color: rgba(131, 72, 255, 0.3);
  }
  .slice.other p {
    color: var(--col-purple-border);
  }
`;
