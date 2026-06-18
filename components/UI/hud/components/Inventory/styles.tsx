import css from 'styled-jsx/css';

export default css`
  .loading-state {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 0.4rem;
    height: 2.4rem;
  }
  .loading-state p {
    margin: 0 0.4rem;
    color: var(--col-info-400);
  }

  .divider {
    height: 1rem;
  }

  .content {
    height: calc(100% - 6.4rem);
    overflow: hidden;
  }

  .scroll-wrapper {
    position: relative;
    width: 100%;
    height: calc(100% - 6.4rem);
  }

  .scroll-wrapper:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.4rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .scroll-cantainer-wrapper {
    max-height: 100%;
    height: fit-content;
    padding-right: 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-between;
  }

  .installation-wrapper {
    cursor: url('/cursors/pointer.png'), pointer;
    margin-bottom: 0.8rem;
    // margin-right: 0.8rem;
    margin-left: 0rem;
    user-select: none;
    width: 16rem;
    height: 18rem;
  }
  .shadow {
    margin-right: 1rem;
  }
  .shadow.active {
    filter: drop-shadow(0rem 0.1rem 0.1rem var(--col-blue-border)) drop-shadow(0rem -0.1rem 0.1rem var(--col-blue-border))
      drop-shadow(0.1rem 0rem 0.1rem var(--col-blue-border)) drop-shadow(-0.1rem 0rem 0.1rem var(--col-blue-border))
      drop-shadow(0rem 0rem 0.4rem var(--col-blue-border));
  }

  .installation-wrapper.active {
    background: var(--col-blue-border);

    clip-path: polygon(
      0.4rem 0.4rem,
      3.9rem 0.4rem,
      3.9rem 2.2rem,
      calc(100% - 0.7rem) 2.2rem,
      calc(100% - 0.7rem) calc(100% - 0.9rem),
      2.1rem calc(100% - 0.9rem),
      2.1rem 3.9rem,
      0.4rem 3.9rem
    );
    border-radius: 0.4rem;
  }

  // Ani
  .pointer {
    position: absolute;
    top: 5.4rem;
    left: -1.2rem;
    z-index: 1;
    transform: rotate(180deg);
    animation: drag 3000ms;
    animation-delay: 1000ms;
    opacity: 0;
    pointer-events: none;
  }

  @keyframes drag {
    0% {
      transform: rotate(180deg) translateX(0);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg) translateX(3.2rem);
      opacity: 1;
    }
    51% {
      transform: rotate(180deg) translateX(0);
      opacity: 1;
    }
    100% {
      transform: rotate(180deg) translateX(3.2rem);
      opacity: 1;
    }
  }

  .scroll-button-div {
    margin: 1.2rem auto 0;
    display: block;
    position: absolute;
    height: 1.6rem;
    width: 100%;
    border: none;
    background-color: transparent;
    transform: translateX(50%) translateX(-2.7rem);
  }

  .scroll-button-div:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-top: 1.5rem solid var(--col-info-500);
  }

  .exit-button {
    margin: 1.2rem 2rem 0;
  }

  // .scrollable::-webkit-scrollbar-thumb {
  //   background: var(--col-info-400);
  //   box-shadow: 0 0 0.8rem 0.1rem var(--col-blue-border);
  // }

  .scroll-button {
    margin: 1.2rem auto 0;
    display: block;
    position: relative;
    height: 1.2rem;
    width: 3.2rem;
    border: none;
    background-color: transparent;
  }

  .scroll-button:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 1.6rem solid transparent;
    border-right: 1.6rem solid transparent;
    border-top: 1.2rem solid var(--col-info-400);
  }
`;
