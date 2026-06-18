import css from 'styled-jsx/css';

export default css`
  .lobby-overlay {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: rgba(30, 7, 79, 0.75);
    z-index: 1000;
  }
  .guide-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
`;
