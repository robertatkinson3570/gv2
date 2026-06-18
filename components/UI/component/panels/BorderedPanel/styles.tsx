import css from 'styled-jsx/css';

export default css`
  /* outer-box */
  .outer-box {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
    z-index: 1;
    color: white;
    border-top: 0.4rem solid var(--col-pink-border);
    border-bottom: 0.4rem solid var(--col-pink-border);
    padding: 0.8rem 1.2rem;
    box-shadow: 0 0 0.8rem 0.1rem var(--col-pink-border);
  }
  .halloween.outer-box {
    border-top: 0.4rem solid var(--col-halloween-border);
    border-bottom: 0.4rem solid var(--col-halloween-border);
    box-shadow: 0 0 0.8rem 0.1rem var(--col-halloween-border);
  }
  .outer-box .outer-cap {
    background-color: transparent;
    position: absolute;
    height: calc(100% - 1.6rem);
    top: 0.8rem;
    border-top: 0.4rem solid var(--col-pink-border);
    background-position-y: 0.4rem;
    border-bottom: 0.4rem solid var(--col-pink-border);
    width: 1.6rem;
  }
  .halloween.outer-box .outer-cap {
    border-top: 0.4rem solid var(--col-halloween-border);
    border-bottom: 0.4rem solid var(--col-halloween-border);
  }
  .outer-box .outer-left-cap {
    border-left: 0.4rem solid var(--col-pink-border);
    box-shadow: -0.4rem 0 0.8rem 0.1rem var(--col-pink-border);
    right: 100%;
  }
  .halloween.outer-box .outer-left-cap {
    border-left: 0.4rem solid var(--col-halloween-border);
    box-shadow: -0.4rem 0 0.8rem 0.1rem var(--col-halloween-border);
  }
  .outer-box .outer-right-cap {
    border-right: 0.4rem solid var(--col-pink-border);
    box-shadow: 0.4rem 0 0.8rem 0.1rem var(--col-pink-border);
    left: 100%;
  }
  .halloween.outer-box .outer-right-cap {
    border-right: 0.4rem solid var(--col-halloween-border);
    box-shadow: 0.4rem 0 0.8rem 0.1rem var(--col-halloween-border);
  }
  .outer-box .outer-left-cap:after,
  .outer-box .outer-left-cap:before,
  .outer-box .outer-right-cap:after,
  .outer-box .outer-right-cap:before {
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 1.2rem;
    background-color: var(--col-pink-border);
  }
  .halloween.outer-box .outer-left-cap:after,
  .halloween.outer-box .outer-left-cap:before,
  .halloween.outer-box .outer-right-cap:after,
  .halloween.outer-box .outer-right-cap:before {
    background-color: var(--col-halloween-border);
  }

  .outer-left-cap:after,
  .outer-left-cap:before {
    right: 0;
  }

  .outer-right-cap:after,
  .outer-right-cap:before {
    left: 0;
  }

  .outer-left-cap:after,
  .outer-right-cap:after {
    top: calc(100% + 0.4rem);
  }
  .outer-left-cap:before,
  .outer-right-cap:before {
    bottom: calc(100% + 0.4rem);
  }

  /* inner box */
  .box-holder {
    position: relative;
    box-shadow: 0 0 0.8rem 0.2rem var(--col-pink-border);
    width: 100%;
    height: 100%;
  }

  .halloween .box-holder {
    box-shadow: 0 0 0.8rem 0.2rem var(--col-halloween-border);
  }

  .title-panel {
    background-color: var(--col-black);
    border: 0.3rem solid var(--col-pink-border);
    box-shadow: 0 0 0.8rem 0.2rem var(--col-pink-border);
    border-radius: 0.6rem;
    padding: 1rem 0.8rem 1.4rem;
    position: absolute;
    z-index: 2;
    left: 50%;
    max-width: 90%;
    width: 56rem;
    transform: translate(-50%, calc(-50% - 0.4rem));
  }
  .halloween .title-panel {
    border: 0.3rem solid var(--col-halloween-border);
    box-shadow: 0 0 0.8rem 0.2rem var(--col-halloween-border);
  }
  .box-holder.secondary .title-panel {
    border: 0.3rem solid var(--col-purple-border);
    box-shadow: 0 0 0.8rem 0.2rem var(--col-purple-border);
  }

  .title-panel h2 {
    text-align: center;
    color: var(--col-white);
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
    font-size: 4.2rem;
  }

  .box-holder .content {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7)),
      linear-gradient(to right, rgba(200, 42, 194, 1), rgba(0, 0, 0, 1) 50%, rgba(200, 42, 194, 1));
    background-size: 100% 0.8rem;
    position: relative;
    z-index: 1;
    color: white;
    border-top: 0.4rem solid var(--col-pink-border);
    border-bottom: 0.4rem solid var(--col-pink-border);
  }

  .halloween .box-holder .content {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7)),
      linear-gradient(to right, rgba(183, 66, 0, 1), rgba(0, 0, 0, 1) 50%, rgba(183, 66, 0, 1));
    background-size: 100% 0.8rem;

    border-top: 0.4rem solid var(--col-halloween-border);
    border-bottom: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder .cap {
    box-shadow: 0 0 0.8rem 0.2rem var(--col-pink-border);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7)),
      linear-gradient(to right, rgba(200, 42, 194, 1), rgba(200, 42, 194, 1));
    background-size: 100% 0.8rem;
    position: absolute;
    height: calc(100% - 2.4rem);
    top: 1.2rem;
    border-top: 0.4rem solid var(--col-pink-border);
    background-position-y: 0.4rem;
    border-bottom: 0.4rem solid var(--col-pink-border);
    width: 1.6rem;
  }
  .halloween .box-holder .cap {
    box-shadow: 0 0 0.8rem 0.2rem var(--col-halloween-border);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7)),
      linear-gradient(to right, rgba(183, 66, 0, 1), rgba(183, 66, 0, 1));
    background-size: 100% 0.8rem;
    border-top: 0.4rem solid var(--col-halloween-border);
    background-position-y: 0.4rem;
    border-bottom: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder .left-cap {
    border-left: 0.4rem solid var(--col-pink-border);
    right: 100%;
  }
  .halloween .box-holder .left-cap {
    border-left: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder .right-cap {
    border-right: 0.4rem solid var(--col-pink-border);
    left: 100%;
  }
  .halloween .box-holder .right-cap {
    border-right: 0.4rem solid var(--col-halloween-border);
  }
  /* corners */

  .box-holder .left-cap:after,
  .box-holder .left-cap:before,
  .box-holder .right-cap:after,
  .box-holder .right-cap:before {
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 1.2rem;
    background-color: var(--col-pink-border);
  }

  .halloween .box-holder .left-cap:after,
  .halloween .box-holder .left-cap:before,
  .halloween .box-holder .right-cap:after,
  .halloween .box-holder .right-cap:before {
    background-color: var(--col-halloween-border);
  }

  .left-cap:after,
  .left-cap:before {
    right: 0;
  }

  .right-cap:after,
  .right-cap:before {
    left: 0;
  }

  .left-cap:after,
  .right-cap:after {
    top: calc(100% + 0.4rem);
  }
  .left-cap:before,
  .right-cap:before {
    bottom: calc(100% + 0.4rem);
  }
  .pumpkin-bottom {
    position: absolute;
    bottom: -4rem;
    z-index: 2;
  }
  .pumpkin-bottom.left {
    left: -6rem;
    width: 10.6rem;
    height: 14.4rem;
  }
  .pumpkin-bottom.right {
    right: -7rem;
    width: 11rem;
    height: 15rem;
  }
  .candle-bottom {
    position: absolute;
    bottom: 0rem;
  }
  .candle-bottom.left {
    left: 3.5rem;
    width: 5.5rem;
    height: 5.1rem;
  }
  .candle-bottom.right {
    right: 3rem;
    width: 3.6rem;
    height: 5rem;
  }
  .title-panel-contents {
    position: relative;
  }
  .candle-top {
    position: absolute;
    bottom: 2.7rem;
    width: 7rem;
    height: 8.7rem;
    z-index: 0;
  }
  .candle-top.left {
    left: -8rem;
  }
  .candle-top.right {
    right: -8rem;
  }
  .candle-top.center {
    top: -9.6rem;
    width: 14rem;
    height: 8.3rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;
