import css from 'styled-jsx/css';

export default css`
  .trait {
    margin-bottom: 2.4rem;
  }

  .trait-label {
    background: linear-gradient(to left, rgba(1, 65, 160, 0.61), rgba(0, 102, 146, 1));
    padding: 0 1.2rem;
    position: relative;
    height: 4rem;
    width: calc(100% - 3.2rem);
  }
  .trait-label:after {
    content: '';
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    width: 0;
    height: 0;
    border-top: 2rem solid transparent;
    border-left: 3.2rem solid rgba(1, 65, 160, 0.61);
    border-bottom: 2rem solid transparent;
  }

  .trait-label p {
    font-size: 2.6rem;
    margin: 0;
  }

  .icon-container {
    background-color: #1fc5ea;
    height: 4.4rem;
    width: 4.4rem;
    border: 0.2rem solid #016793;
  }

  .upgrade-container {
    display: flex;
  }

  .upgrade-amount {
    height: 4.4rem;
    display: grid;
    width: 25rem;
    grid-template-columns: 1fr 1fr;
    padding: 0.4rem 1.2rem;
    position: relative;
    background-color: rgba(21, 40, 70, 0.7);
    box-shadow: inset 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 1);
  }
  .upgrade-amount:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
    left: 0;
    background: linear-gradient(to left, rgba(26, 52, 192, 0.6), rgba(21, 40, 70, 0));
  }

  .new-container p,
  .old-container p {
    margin: 0;
    font-size: 2.2rem;
    line-height: 1;
  }

  .new-container p span,
  .old-container p span {
    font-size: 3.2rem;
  }

  .old-container {
    color: var(--col-info-400);
  }
  .old-container p span {
    text-decoration: line-through;
  }
  .new-container p span {
    z-index: 1;
    position: relative;
  }

  .fade-container {
    background: linear-gradient(to top, rgba(0, 185, 225, 0.4), rgba(0, 185, 225, 0));
    border-bottom: 0.2rem solid var(--col-info-400);
  }
`;
