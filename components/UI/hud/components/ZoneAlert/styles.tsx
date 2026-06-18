import css from 'styled-jsx/css';

export default css`
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate(-50%, -2.0rem);
    }
    80% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 0);
    }
  }

  .alert-container {
    position: fixed;
    top: 11.2rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--col-white);
    text-align: center;
    pointer-events: none;
    animation: fadeInDown 3000ms;
    opacity: 0;
  }
  .alert-container p {
    font-size: 2.2rem;
    margin-bottom: 0;
    line-height: 1;
  }
  .alert-container h1 {
    font-size: 5.4rem;
  }
`;
