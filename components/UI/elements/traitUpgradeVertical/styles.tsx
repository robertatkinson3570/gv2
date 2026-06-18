import css from 'styled-jsx/css';

export default css`
  .trait-container {
    margin-bottom: 1.8rem;
  }
  .name {
    color: var(--col-white);
    font-size: 3rem;
    line-height: 3.2rem;
  }
  .value {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    vertical-align: text-bottom;
    align-items: flex-end;
  }
  .old-label {
    color: var(--col-info-400);
    font-size: 2.6rem;
    line-height: 3rem;
  }
  .old-value {
    position: relative;
    color: var(--col-info-400);
    font-size: 30px;
    line-height: 32px;
    margin-right: 10px;
  }
  .old-value::after {
    position: absolute;
    content: '';
    top: 60%;
    left: -0.4rem;
    right: -0.4rem;
    height: 0.2rem;
    background: var(--col-info-400);
  }
  .new-label {
    color: var(--col-info-200);
    font-size: 20px;
    line-height: 30px;
    vertical-align: text-bottom;
  }
  .new-value {
    color: var(--col-white);
    font-size: 4rem;
    text-align: center;
    line-height: 0.8;
    margin-left: 1rem;
    vertical-align: text-bottom;
  }
`;
