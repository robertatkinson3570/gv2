import css from 'styled-jsx/css';

export default css`
  .notification-container {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% .8rem;
    border-left: .2rem solid var(--col-purple-border);
    border-right: .2rem solid var(--col-purple-border);
    border-bottom: .6rem solid var(--col-purple-border);
    padding: .4rem .8rem;
    color: var(--col-purple-border);
    box-shadow: 0 0 .8rem .2rem var(--col-purple-border);
  }
`;
