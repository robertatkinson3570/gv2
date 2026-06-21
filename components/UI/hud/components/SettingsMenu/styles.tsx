import css from 'styled-jsx/css';

export default css`
  .settings-option {
    position: relative;
    margin: 0.5rem 0.8rem 0;
    opacity: 0.8;
    cursor: url('/cursors/pointer.png'), pointer;
    width: 3rem;
    height: 3rem;
  }

  .settings-option.off {
    opacity: 0.7;
  }
  .settings-option:hover {
    opacity: 1;
  }
`;
