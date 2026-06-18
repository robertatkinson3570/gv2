import css from 'styled-jsx/css';

export default css`
  .build-border {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: 0.2rem solid var(--col-info-400);
    box-shadow: inset 0rem 0rem 2.4rem rgba(0, 185, 243, 1);
  }

  .right-container {
    position: absolute;
    right: 0;
    top: 3.2rem;
    bottom: 1.2rem;
    display: flex;
  }

  .pending-toggle {
    top: 0;
    position: absolute;
    right: 19rem;
  }

  .build-toggle {
    position: absolute;
    bottom: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .build-toggle .batch-msg {
    padding-bottom: 1.5rem;
    width: 30rem;
    height: fit-content;
    color: #fff;
    font-size: 2.6rem;
    text-align: center;
    line-height: 0.8;
  }

  .warning-container {
    position: absolute;
    bottom: 11rem;
    left: 50%;
    transform: translateX(-50%);
  }

  // Opacity overrides for HUD elements
  .right-container,
  .build-toggle {
    opacity: 0.85;
    transition: opacity 0.2s ease-in-out;
  }
  .right-container:hover,
  .build-toggle:hover {
    opacity: 1;
  }
`;
