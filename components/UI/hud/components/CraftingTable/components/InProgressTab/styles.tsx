import css from 'styled-jsx/css';

export default css`
  .tab-inner {
    display: flex;
    align-items: center;
  }

  .in-progress {
    margin-left: 1.2rem;
  }
  .total,
  .label {
    font-size: 2.2rem;
    margin: 0;
    text-transform: uppercase;
    line-height: 1;
  }

  .label {
    color: var(--col-pink-400);
  }
  .total {
  }
`;
