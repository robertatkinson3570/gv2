import css from 'styled-jsx/css';

export default css`
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate(-50%, calc(-50% - 13.2rem));
    }
    40% {
      opacity: 1;
      transform: translate(-50%, calc(-50% - 15rem));
    }
    100% {
      opacity: 0;
    }
  }

  .alert-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 15rem));
    color: var(--col-white);
    text-align: center;
    pointer-events: none;
    animation: fadeInDown 3000ms ease;
    opacity: 0;
  }
  .alert-container p {
    font-size: 4rem;
    margin-bottom: 0;
    line-height: 1;
  }
`;
