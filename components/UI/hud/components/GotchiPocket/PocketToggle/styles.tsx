import css from 'styled-jsx/css';

export default css`
  .toggle-container {
    width: 7rem;
    height: 6rem;
    background-color: var(--col-purple-300);
    overflow: hidden;
    position: relative;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 1rem),
      calc(100% - 1rem) calc(100% - 1rem),
      calc(100% - 1rem) 100%,
      1rem 100%,
      1rem calc(100% - 1rem),
      0 calc(100% - 1rem)
    );
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .toggle-container .image-wrapper {
    position: absolute;
    left: 0.2rem;
    top: 0;
    width: calc(100% - 0.4rem);
    height: calc(100% - 0.2rem);
    opacity: 0.9;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 1rem),
      calc(100% - 1rem) calc(100% - 1rem),
      calc(100% - 1rem) 100%,
      1rem 100%,
      1rem calc(100% - 1rem),
      0 calc(100% - 1rem)
    );
  }
`;
