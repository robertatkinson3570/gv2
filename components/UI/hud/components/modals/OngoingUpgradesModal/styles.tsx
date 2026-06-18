import css from 'styled-jsx/css';

export default css`
  .content {
    padding: 3.2rem 1.8rem;
  }

  .upgrade-grid {
    display: grid;
    gap: 2.4rem;
  }

  .upgrade-card {
    width: 100%;
    padding: 0.4rem;
    display: flex;
    align-items: center;
  }

  .img-container {
    background-color: var(--col-dark-grey);
    border: 0.4rem solid var(--col-pink-400);
    border-radius: 0.4rem;
    min-height: 12rem;
    min-width: 12rem;
    height: 12rem;
    width: 12rem;
    box-shadow: 0 0 0.4rem 0.2rem var(--col-pink-400);
  }

  .upgrade-details {
    width: 100%;
    padding: 2.4rem;
  }

  .name-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  }
  .name-container p {
    margin: 0;
  }

  .name {
    text-transform: uppercase;
    font-size: 2.4rem;
    line-height: 1;
  }

  .prog-bar {
    width: 100%;
    background-color: #be9bb4;
    height: 0.4rem;
    position: relative;
  }
  .prog {
    position: absolute;
    height: 0.8rem;
    box-shadow: 0 0 0.4rem 0.2rem var(--col-pink-400);
    background-color: var(--col-pink-400);
    top: 50%;
    transform: translateY(-50%);
  }

  .details {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .details p {
    margin: 0;
    font-size: 1.8rem;
    text-transform: capitalize;
    color: var(--col-pink-200);
  }

  .time-left {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .time-left p {
    line-height: 1;
    color: var(--col-pink-200);
    margin: 0;
  }

  .progress-percent {
    font-size: 3.2rem;
    margin-top: 0.4rem;
  }

  .claim-container {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 1200px) {
    .content {
      padding: 5.4rem;
    }
    .upgrade-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
