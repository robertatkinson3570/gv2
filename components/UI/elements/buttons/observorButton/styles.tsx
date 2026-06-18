import css from 'styled-jsx/css';

export default css`
  .container {
    display: flex;
    flex-direction: row;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .icon {
    width: 2.6em;
    height: auto;
    z-index: 10;
  }

  .btn-panel {
    margin-left: -1.6rem;
  }
  .label {
    padding-left: 2.4rem;
    padding-right: 1.6rem;
    font-size: 2.625rem;
    line-height: 2.625rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }

  @media (max-width: 1199px) {
    .name,
    .label {
      font-size: 1.8rem;
    }
  }
`;
