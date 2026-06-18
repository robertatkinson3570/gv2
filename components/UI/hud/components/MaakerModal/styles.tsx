import css from 'styled-jsx/css';

export default css`
  .inner {
    padding: 3.2rem 4.8rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
  .content {
    display: flex;
    flex-direction: row;
    gap: 6.4rem;
  }
  .upgrade-status {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .status-text {
    font-size: 3.6rem;
    line-height: 3.2rem;

    text-align: center;
    text-transform: uppercase;

    color: #00b9e1;
  }
  .status-list {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: start;
    min-width: 64rem;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    margin-top: 3.6rem;
    width: 20rem;
  }
  .upgrade-info-container {
    background: linear-gradient(0deg, rgba(200, 42, 194, 0) 22.92%, rgba(200, 42, 194, 0.45) 100%);
    opacity: 0.9;
  }
  .halloween .upgrade-info-container {
    background: linear-gradient(0deg, rgba(231, 94, 17, 0) 22.92%, rgba(231, 94, 17, 0.45) 100%);
  }

  .upgrade-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 1.2rem 0rem;
  }
  .upgrade-info .label {
    font-size: 3rem;
    line-height: 2.8rem;
    text-align: right;
    word-break: break-word;
    color: var(--col-white);
  }
  .upgrade-info .counter {
    font-size: 4rem;
    line-height: 3.6rem;
    margin: 0 1rem;
    color: #4adbfb;
  }
  .button-container {
    width: 32rem;
    height: 8rem;
    margin: 0rem auto;
  }
`;
