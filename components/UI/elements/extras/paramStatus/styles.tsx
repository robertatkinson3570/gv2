import css from 'styled-jsx/css';

export default css`
  .container {
    display: flex;
    flex-direction: column;
  }
  .container .label {
    color: var(--col-pink-200);
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
  .container .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .content .iconWrapper {
    display: flex;
    border: 0.1rem solid #c82ac2;
    background: linear-gradient(0deg, var(--col-pink-400), var(--col-pink-400)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(0deg, var(--col-pink-500), var(--col-pink-500));
  }
  .content .value {
    background: linear-gradient(180deg, rgba(200, 42, 194, 0) 22.92%, rgba(200, 42, 194, 0.45) 100%);
    opacity: 0.9;
    color: var(--col-white);
    font-size: 3rem;
    line-height: 3.2rem;
    padding: 0.6rem 1.4rem 0.3rem 0.9rem;
    text-transform: uppercase;
    width: 100%;
  }

  /********************************/
  /******  Halloween Style  *******/
  /********************************/

  .halloween.container .label {
    color: var(--col-halloween-200);
  }

  .halloween .content .iconWrapper {
    border: 0.1rem solid var(--col-halloween-400);
    background: linear-gradient(0deg, var(--col-halloween-400), var(--col-halloween-400)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(0deg, var(--col-halloween-500), var(--col-halloween-500));
  }

  .halloween .content .value {
    background: linear-gradient(180deg, rgba(231, 94, 17, 0) 22.92%, rgba(231, 94, 17, 0.45) 100%);
  }
`;
