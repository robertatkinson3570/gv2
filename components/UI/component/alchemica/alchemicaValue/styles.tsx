import css from 'styled-jsx/css';

export default css`
  .alchemica-single-container {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(200, 42, 194, 0) 22.92%, rgba(200, 42, 194, 0.45) 100%);
    border-bottom: .2rem solid;
    border-image: radial-gradient(50% 2354449.91% at 50% 99.92%, var(--col-pink-400) 0%, rgba(200, 42, 194, 0.4) 100%) 1;
    padding: 0rem 1.6rem 0rem 1.6rem;
  }
  .alchemica-single-container .label {
    font-size: 3.2rem;
    line-height: 3.6rem;
    text-transform: uppercase;
    color: var(--col-pink-200);
  }
  .alchemica {
    display: flex;
    flex-direction: row;
    gap: .8rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.4rem;
  }
  .alchemica .amount {
    font-size: 3.2rem;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: 0em;
  }

  /***********************************/
  /********  Halloween Style  ********/
  /***********************************/

  .halloween.alchemica-single-container {
    background: linear-gradient(180deg, rgba(231, 94, 17, 0) 22.92%, rgba(231, 94, 17, 0.45) 100%);
    border-image: radial-gradient(50% 2354449.91% at 50% 99.92%, var(--col-halloween-400) 0%, rgba(231, 94, 17, 0.4) 100%) 1;
  }
  
  .halloween.alchemica-single-container .label {
    color: var(--col-halloween-200);
  }

`;
