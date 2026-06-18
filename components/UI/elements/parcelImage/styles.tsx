import css from 'styled-jsx/css';

export default css`
  @keyframes shimmer {
    0% {
      background-position: -7.6rem 0;
    }
    100% {
      background-position: 7.6rem 0;
    }
  }

  .loading-container {
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
    background: linear-gradient(to right, rgba(0, 185, 243, 0.2), rgba(0, 185, 243, 0.6) 30%, rgba(0, 185, 243, 0.2) 50%);
    position: relative;
  }
  .loading-container img {
    max-width: 100%;
  }
`;
