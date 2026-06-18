import css from 'styled-jsx/css';

export default css`
  @keyframes slideDown {
    0% {
      transform: translate(-50%, -100%);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }

  .notification-container {
    display: none;
  }
  .notification-container.visible {
    display: revert;
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, 0);
    animation: slideDown 300ms;
  }

  .inner {
    display: flex;
    align-items: center;
    padding: 0 1.2rem 0.8rem;
  }

  .content {
    margin-left: 2rem;
  }
  .content p {
    font-size: 2.4rem;
    margin: 0;
  }
`;
