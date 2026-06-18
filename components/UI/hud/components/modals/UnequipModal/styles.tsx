import css from 'styled-jsx/css';

export default css`
  .inner {
    padding: 3.2rem 2.4rem;
    display: flex;
    width: 84rem;
    min-height: 36.5rem;
  }
  .inner p {
    font-size: 3.2rem;
    margin: 0;
    line-height: 1;
  }

  .right-col {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 3.2rem;
  }
  .left-col p {
    color: var(--col-pink-400);
    font-size: 3.2rem;
  }
  .installation-name {
    text-align: center;
  }

  .warning {
    text-transform: uppercase;
  }

  .installation-img {
    position: relative;
    background-color: var(--col-dark-grey);
    border: 0.2rem solid var(--col-pink-400);
    border-radius: 0.4rem;
    height: 17.5rem;
    width: 17.5rem;
    overflow: hidden;
    pointer-events: none;
  }

  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .returns-container {
    margin: 2.4rem 0 5.4rem;
  }
  .alchemica-back {
    background: linear-gradient(to top, rgba(200, 42, 194, 0.4), rgba(200, 42, 194, 0));
    padding: 1.6rem 2.4rem 0.8rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .alchemica {
    display: flex;
    align-items: center;
  }
  .alchemica p {
    margin-left: 0.8rem;
  }

  .button-container {
    margin-right: 1.8rem;
  }

  .upgrade-link {
    color: var(--col-info-400) !important;
    font-size: 2.8rem;
    margin: 1.2rem 0 3.2rem;
    display: block;
  }

  /*****************************************/
  /************ Halloween Style ************/
  /*****************************************/

  .halloween .left-col p {
    color: var(--col-halloween-400);
  }

  .halloween .installation-img {
    border: 0.2rem solid var(--col-halloween-400);
  }

  .halloween .alchemica-back {
    background: linear-gradient(to top, rgba(231, 94, 17, 0.4), rgba(231, 94, 17, 0));
  }

`;
