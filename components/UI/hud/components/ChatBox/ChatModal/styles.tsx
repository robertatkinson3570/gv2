import css from 'styled-jsx/css';

export default css`
  .modal-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: none;
  }
  .modal-wrapper.open {
    display: revert;
  }

  .modal-container {
    position: relative;
    width: fit-content;
  }

  .inner-content {
    width: 70rem;
    margin-top: -0.8rem;
  }

  .close-container {
    position: absolute;
    top: 0;
    left: calc(100% + 1.2rem);
  }
`;
