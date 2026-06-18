import css from 'styled-jsx/css';

export default css`
  .carried-alchemica-content {
    padding: 0 0.4rem 0.8rem 0;
    width: 14rem;
  }

  .alchemica {
    display: grid;
    gap: 0.4rem;
    grid-template-columns: auto 1fr;
  }
  .alchemica p {
    white-space: nowrap;
    text-align: left;
    margin: 0;
    font-size: 3.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .capacity {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    z-index: 1;
    padding: 0.8rem 0.8rem 0;
  }
  .capacity:after {
    content: '';
    position: absolute;
    top: 0;
    left: -1.6rem;
    width: calc(100% + 1.6rem);
    height: 0.3rem;
    background-color: var(--col-pink-border);
  }
  .yellow .capacity:after {
    background-color: var(--col-yellow-border);
  }
  .capacity p {
    font-size: 3.2rem;
    margin: 0;
    line-height: 1;
    text-align: right;
  }
  .capacity .total-capacity {
    max-width: 9rem;
    overflow: hidden;
    font-size: 4.2rem;
    text-overflow: ellipsis;
  }
  .capacity .max-capacity {
    font-size: 3.2rem;
    max-width: 7.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--col-pink-400);
  }

  /* Halloween Style */

  .halloween .capacity:after {
    background-color: var(--col-halloween-border);
  }

  .halloween .capacity .max-capacity {
    color: var(--col-halloween-400);
  }
  .yellow .capacity .max-capacity {
    color: var(--col-yellow-100);
  }
`;
