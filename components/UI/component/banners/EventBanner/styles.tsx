import css from 'styled-jsx/css';

export default css`
  .box-holder {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 34rem;
    // width: 57.7rem;
    margin-bottom: 5rem;
  }

  .event-button {
    position: absolute;
    // background: none;
    padding: none;
    top: 98%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: -.6rem 0 0 0 #a065ff, .6rem 0 0 0 #a065ff, 0 -.6rem 0 0 #a065ff, 0 .6rem 0 0 #a065ff;
    background-color: #a065ff;
  }

  .box-holder .content {
    position: absolute;
    width: fit-content;
    clip-path: polygon(
      0% 1.6rem,
      1.6rem 1.6rem,
      1.6rem 0%,
      calc(100% - 1.6rem) 0%,
      calc(100% - 1.6rem) 1.6rem,
      100% 1.6rem,
      100% calc(100% - 1.6rem),
      calc(100% - 1.6rem) calc(100% - 1.6rem),
      calc(100% - 1.6rem) 100%,
      1.6rem 100%,
      1.6rem calc(100% - 1.6rem),
      0% calc(100% - 1.6rem)
    );
    background-color: #a065ff;
    width: calc(100% + 0.2em);
    height: calc(100% - 0.2em);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-holder .content .img-container {
    width: calc(100% - 1.2rem);
    height: calc(100% - 1.2rem);
    clip-path: polygon(
      0% 1.6rem,
      1.6rem 1.6rem,
      1.6rem 0%,
      calc(100% - 1.6rem) 0%,
      calc(100% - 1.6rem) 1.6rem,
      100% 1.6rem,
      100% calc(100% - 1.6rem),
      calc(100% - 1.6rem) calc(100% - 1.6rem),
      calc(100% - 1.6rem) 100%,
      1.6rem 100%,
      1.6rem calc(100% - 1.6rem),
      0% calc(100% - 1.6rem)
    );
  }
`;
