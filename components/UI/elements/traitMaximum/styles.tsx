import css from 'styled-jsx/css';

export default css`
  .trait {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .name {
    font-size: 2.8rem;
    line-height: 3.2rem;
    color: var(--col-white);
  }
  .trait-data {
    display: flex;
    flex-direction: row;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), #1fc5ea;
    border: 0.1rem solid #016793;
  }
  .value-container {
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    justify-content: center;
    width: 12rem;

    background: linear-gradient(270deg, rgba(26, 52, 192, 0.384) 26.72%, rgba(21, 40, 70, 0) 111.84%),
      linear-gradient(90deg, rgba(21, 40, 70, 0) 0%, rgba(16, 36, 67, 0.87) 42.01%);
    opacity: 0.8;
  }
  .trait-value {
    color: #4adbfb;
    font-size: 3.2rem;
  }
`;
