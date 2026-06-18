import css from 'styled-jsx/css';

export default css`
  .radio {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input[type='radio'] {
    appearance: none;
    background-color: transparent;
    margin: 0;
    font: inherit;
    color: var(--color);
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid var(--color);
    border-radius: 50%;
    display: grid;
    place-content: center;
    box-shadow: 0px 0px 2px 2px rgba(131, 72, 255, 0.8);
  }
  input[type='radio']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--color);
  }
  input[type='radio']:checked::before {
    transform: scale(1);
  }
  input[type='radio']:focus {
    // outline: max(2px, 0.15em) solid var(--color);
    // outline-offset: max(2px, 0.15em);
  }
`;
