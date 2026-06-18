import css from 'styled-jsx/css';

export default css`
  .approval-container {
    padding: 1.8rem 7.2rem 5.2rem;
  }

  .contract-name {
    margin: 2.4rem auto 0.4rem;
    text-align: center;
    color: var(--col-grey-400);
  }
  .contract-name a {
    text-transform: capitalize;
    color: var(--col-info-400);
  }
  .contract-name a:hover {
    text-transform: capitalize;
  }

  .warning-message-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4.4rem;
    // width: 64rem;
  }
  .warning-message {
    font-size: 2.5rem;
    line-height: 1;
    margin: 0 0 0 1.8rem;
  }

  .mascot-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3.2rem;
  }

  .speach-bubble {
    position: relative;
    background: url("/images/bubble-bg.svg") no-repeat;
    background-size: 100% 100%;
    // background-color: rgba(200, 42, 194, 0.2);
    // border: 0.3rem solid var(--col-pink-border);
    // border-radius: 1.6rem;
    // margin-left: 3.2rem;
    padding: 0.8rem 1.6rem 1.2rem;
  }

  // .speach-bubble:after {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   top: 50%;
  //   right: 100%;
  //   z-index: 2;
  //   width: 0;
  //   height: 0;
  //   overflow: hidden;
  //   border: 1.5rem solid transparent;
  //   border-right: solid 2.4rem var(--col-pink-400);
  //   border-left: 0;
  //   transform: translateY(-50%);
  // }

  .speach-bubble p {
    font-size: 2.4rem;
    margin: 0 0 0 3.2rem;
  }

  .progress-container {
    width: 80rem;
    margin: 3.2rem auto 4.2rem;
    display: grid;
    gap: 0.8rem;
  }

  .token {
    display: flex;
    align-items: center;
  }
  .token p {
    margin: 0 0 0 0.8rem;
    text-transform: uppercase;
    font-size: 2.6rem;
    line-height: 1;
    color: var(--col-grey-400);
  }

  .token-status {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .progress-indicator {
    height: 0.8rem;
    width: 100%;
    margin-top: 0.8rem;
    background-color: var(--col-grey-400);
    border-radius: 1px;
  }

  .image-filter {
    filter: grayscale(100%);
    display: flex;
  }

  .next .image-filter,
  .approved .image-filter,
  .in-progress .image-filter {
    filter: none;
  }

  // .in-progress p,
  // .next p {
  //   color: var(--col-white);
  // }

  // .in-progress .progress-indicator,
  // .next .progress-indicator {
  //   background-color: var(--col-white);
  // }

  .button-container {
    display: flex;
    justify-content: center;
  }

  .approved .alpha {
    color: #18cdf8;
  }
  .approved .fomo {
    color: #ffcc05;
  }
  .approved .fud {
    color: #52bb34;
  }
  .approved .kek {
    color: #f934f3;
  }

  .approved .progress-indicator {
    background-color: var(--col-success-400);
  }
`;
