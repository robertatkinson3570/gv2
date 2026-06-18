import css from 'styled-jsx/css';

export default css`
  .loading-scene {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 100;
  }
  .background-wrapper {
    width: 100vw;
    height: calc(100vh + 20px);
    position: relative;
  }
  .loading-scene.aarena .background-wrapper {
    -webkit-animation: mover 1s infinite alternate;
    animation: mover 1s infinite alternate;
  }
  @-webkit-keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }

  .content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content .tip-container {
    display: flex;
    align-items: center;
    margin-top: 5rem;
    gap: 2rem;
  }
  .tip-icon-container {
    position: relative;
    width: 7.6rem;
    height: 7.6rem;
  }
  .loading-scene.aarena .tip-icon-container {
    width: 9.5rem;
    height: 15.5rem;
  }
  .tip {
    font-size: 4.4rem;
    line-height: 4.1rem;
    color: var(--col-white);
    width: 60rem;
  }
`;
