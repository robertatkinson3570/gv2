import css from 'styled-jsx/css';

export default css`
  .input {
    border: 1px solid var(--col-pink-350);
    border-radius: 1.5px;
    background: rgba(0, 0, 0, 0.1);
    // box-shadow: 0 0 0.4rem 0.2rem var(--col-pink-350);
    text-transform: capitalize;
    font-size: 2.4rem;
    height: 4.2rem;
    color: var(--col-pink-400);
  }

  .info .input {
    border: 1px solid var(--col-blue-border);
    box-shadow: 0px 0px 1.83577px 0.917885px var(--col-info-border);
    color: var(--col-info-400);
    background: rgba(0, 0, 0, 0.25);
  }

  .input[type='number'] {
    width: 5.4rem;
    text-align: center;
  }

  /* to adjust the width of the district input */
  div.parcel .input[type='number'] {
    width: 6.1rem;
    text-align: center;
    appearance: textfield;
  }

  div.parcel input[type='number']::-webkit-inner-spin-button,
  div.parcel input[type='number']::-webkit-outer-spin-button {
    height: 6rem;
    -webkit-appearance: button;
    opacity: 0;
  }

  div.parcel > span {
    position: relative;
  }

  /* for the custom arrows*/
  div.parcel > span::before,
  div.parcel > span::after {
    position: absolute;
    right: 0.2rem;
    width: 1.5em;
    font-size: 1.2rem;
    font-weight: bold;
    pointer-events: none;
    background: var(--col-pink-400);
    text-align: center;
    transform: rotate(-90deg);
    color: #000;
  }

  div.parcel.info > span::before,
  div.parcel.info > span::after {
    background: var(--col-info-400);
  }

  div.parcel > span::before {
    content: '<';
    margin-bottom: 0.2rem;
    bottom: -0.9em;
  }

  div.parcel > span::after {
    content: '>';
    margin-top: 0.2rem;
    bottom: 0.9em;
  }

  .input::placeholder {
    color: var(--col-pink-600);
  }
  .info .input::placeholder {
    color: var(--col-info-400);
    opacity: 0.6;
  }
  .input:focus {
    outline: none;
  }

  .label {
    font-size: 2.4rem;
    color: var(--col-pink-350);
  }

  .info .label {
    color: var(--col-info-400);
  }

  .parcel .label {
    font-size: 1.6rem;
    line-height: 1;
    width: 100%;
    text-align: center;
    color: var(--col-pink-350);
  }

  .info.parcel .label {
    color: var(--col-info-400);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .halloween .input {
    border: 1px solid var(--col-halloween-400);
    box-shadow: 0 0 4px 2px var(--col-halloween-400);
    color: var(--col-halloween-400);
  }

  div.parcel.halloween > span::before,
  div.parcel.halloween > span::after {
    background: var(--col-halloween-400);
  }

  .halloween .input::placeholder {
    color: var(--col-halloween-600);
  }

  .halloween .label {
    color: var(--col-halloween-400);
  }

  .parcel.halloween .label {
    color: var(--col-halloween-400);
  }
`;
