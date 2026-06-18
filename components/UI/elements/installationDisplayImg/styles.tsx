import css from 'styled-jsx/css';

export default css`
  .display-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    pointer-events: none;
  }

  .bg-img {
    width: 100%;
    height: 100%;
  }

  .item-img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    widht: 100%;
    height: 100%;
  }
  .sprite-img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    widht: 100%;
    height: 100%;
  }
`;
