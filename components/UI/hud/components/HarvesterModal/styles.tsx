import css from 'styled-jsx/css';

export default css`
  .inner {
    padding: 4rem 1.6rem;
  }
  .main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 4.8rem;
  }
  .harvest-info {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  .card-container {
    margin-top: 1.6rem;
  }
  .button-container {
    width: 24rem;
    margin: 1.6rem auto;
  }
  .col {
    min-width: 24rem;
    display: flex;
    justify-content: center;
  }
`;
