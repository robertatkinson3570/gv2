import css from 'styled-jsx/css';

export default css`
  .card-container {
    border: 2px solid var(--col-info-400);
    position: relative;

    padding: 0;
    width: 15rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .img-container {
    position: relative;
    width: 7.4rem;
    height: 100%;
  }

  .collection-name {
    color: var(--col-info-400);
    font-size: 2.2rem;
    line-height: 0.75;
    text-align: center;
    width: 100%;
    font-weight: bold;
    margin: 0 2px 4px 2px;
  }
`;
