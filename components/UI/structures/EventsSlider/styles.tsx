import css from 'styled-jsx/css';

export default css`
  .events-slider {
    width: 100%;
    aspect-ratio: 2/1;
    border: 0.4rem solid var(--col-pink-350);
    position: relative;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .events-slider .arrow-left,
  .events-slider .arrow-right {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .events-slider .arrow-left {
    left: -4rem;
  }
  .events-slider .arrow-right {
    right: -4rem;
  }
`;
