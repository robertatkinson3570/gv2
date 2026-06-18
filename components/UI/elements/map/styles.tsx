import css from 'styled-jsx/css';

export default css`
  .map-container {
    width: 40rem;
    height: 20rem;
    background-color: var(--col-pink-border);
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0.8rem 0.2rem var(--col-pink-border);
    clip-path: polygon(0% 15%, 0 0, 15% 0%, 96% 0, 96% 10%, 100% 10%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  }

  .map-container img {
    opacity: 0.9;
    position: absolute;
    bottom: 0;
    width: calc(100% - 0.4rem);
    height: calc(100% - 0.4rem);
    clip-path: polygon(0% 15%, 0 0, 15% 0%, 96% 0, 96% 10%, 100% 10%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  }

  .marker-container {
    position: absolute;
    width: auto;
    transform: translate(-50%, -50%);
    width: 15rem;
    height: 15rem;
    transition: 100ms linear;
    opacity: 0.85;
  }
  .marker-container img {
    width: 100%;
    height: 100%;
  }
`;
