import css from 'styled-jsx/css';

export default css`
  .installation-card {
    width: fit-content;
  }
  .filter-wrapper {
    user-select: none;
    pointer-events: none;
    position: relative;
  }
  .filter-wrapper.info {
    filter: drop-shadow(0 0 1rem var(--col-info-400));
  }
  .filter-wrapper,
  .filter-wrapper.pink {
    filter: drop-shadow(0 0 1rem var(--col-pink-400));
  }
  .card-container {
    min-width: 26em;
    height: 27.4em;
    position: relative;
    pointer-events: none;
    outline: none;
    user-select: none;
  }
  .card-container.info {
    border-left: 3px solid var(--col-info-400);
    border-right: 3px solid var(--col-info-400);
  }
  .card-container,
  .card-container.pink {
    border-left: 3px solid var(--col-pink-400);
    border-right: 3px solid var(--col-pink-400);
  }
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top, rgba(0, 185, 225, 0.1), rgba(0, 185, 225, 0.4));
  }
  .content.info {
    background: var(--col-info-550);
  }
  .content,
  .content.pink {
    background: linear-gradient(to top, rgba(200, 42, 194, 0.1), rgba(200, 42, 194, 0.3)), rgba(0, 0, 0, 0.8);
  }

  .card-container.in-progress .content {
    filter: opacity(60%);
  }

  .progress-percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 7.2rem;
    color: #fff;
  }
  .progress-bottom-container {
    position: relative;
    border: 4px solid var(--col-pink-400);
    width: 100%;
    box-shadow: 0 0 10px var(--col-pink-400);
  }
  .progress-bottom-container .progress-value {
    width: 100%;
    font-size: 3.6rem;
    margin: -0.8rem 0 -0.4rem 0;
    text-align: center;
    text-transform: uppercase;
    color: var(--col-white);
    z-index: 100;
    filter: drop-shadow(-1px -1px 1px var(--col-black)) drop-shadow(-1px 1px 1px var(--col-black)) drop-shadow(1px -1px 1px var(--col-black))
      drop-shadow(1px 1px 1px var(--col-black));
  }
  .progress-bottom-container .progress-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 191, 88, 0.5);
  }

  .progress-bottom-container .progress-indicator.fud {
    background: rgba(0, 191, 88, 0.9);
  }

  .progress-bottom-container .progress-indicator.fomo {
    background: rgba(221, 44, 38, 0.9);
  }

  .progress-bottom-container .progress-indicator.alpha {
    background: rgba(0, 185, 243, 0.9);
  }

  .progress-bottom-container .progress-indicator.kek {
    background: rgba(200, 42, 194, 0.9);
  }

  .top-cap,
  .bottom-cap {
    position: absolute;
    left: 1.2em;
    right: 1.2em;
    height: 1.2em;
  }
  .top-cap,
  .top-cap.pink,
  .bottom-cap,
  .bottom-cap.pink {
    border-left: 3px solid var(--col-pink-400);
    border-right: 3px solid var(--col-pink-400);
  }
  .top-cap.info,
  .bottom-cap.info {
    border-left: 3px solid var(--col-info-400);
    border-right: 3px solid var(--col-info-400);
  }
  .top-cap,
  .top-cap.pink {
    top: -1.2em;
    border-top: 3px solid var(--col-pink-400);
    background: linear-gradient(to top, rgba(200, 42, 194, 0.3), rgba(200, 42, 194, 0.3)), rgba(0, 0, 0, 0.8);
  }
  .top-cap.info {
    top: -1.2em;
    border-top: 3px solid var(--col-info-400);
    background: var(--col-info-550);
  }
  .card-container.in-progress .top-cap,
  .card-container.pink.in-progress .top-cap {
    background: rgba(200, 42, 194, 0.1);
  }
  .card-container.info.in-progress .top-cap {
    background: var(--col-info-550);
    filter: opacity(60%);
  }
  .bottom-cap,
  .bottom-cap.pink {
    border-bottom: 3px solid var(--col-pink-400);
    bottom: -1.2em;
    background: linear-gradient(to top, rgba(200, 42, 194, 0.1), rgba(200, 42, 194, 0.1)), rgba(0, 0, 0, 0.8);
  }
  .bottom-cap.info {
    border-bottom: 3px solid var(--col-info-400);
    bottom: -1.2em;
    background: var(--col-info-550);
  }
  .card-container.info.in-progress .bottom-cap {
    background: var(--col-info-550);
    filter: opacity(60%);
  }
  .card-container.card.in-progress .bottom-cap {
    background: rgba(200, 42, 194, 0.025);
  }

  .top-cap:before,
  .top-cap:after,
  .bottom-cap:before,
  .bottom-cap:after {
    content: '';
    position: absolute;
    height: 3px;
    width: calc(1.2em + 3px);
  }
  .top-cap.info:before,
  .top-cap.info:after,
  .bottom-cap.info:before,
  .bottom-cap.info:after {
    background-color: var(--col-info-400);
  }
  .top-cap:before,
  .top-cap:after,
  .bottom-cap:before,
  .bottom-cap:after,
  .top-cap.pink:before,
  .top-cap.pink:after,
  .bottom-cap.pink:before,
  .bottom-cap.pink:after {
    background-color: var(--col-pink-400);
  }
  .top-cap:before {
    top: 100%;
    left: calc(-3px - 1.2em);
  }
  .top-cap:after {
    top: 100%;
    right: calc(-3px - 1.2em);
  }
  .bottom-cap:before {
    bottom: 100%;
    left: calc(-3px - 1.2em);
  }
  .bottom-cap:after {
    bottom: 100%;
    right: calc(-3px - 1.2em);
  }

  .card-title {
    font-size: 3rem;
    text-transform: uppercase;
    text-align: center;
    line-height: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
    width: calc(100% - 1rem);
  }

  .card-title.info {
    color: var(--col-info-400);
  }

  .card-title,
  .card-title.pink {
    color: var(--col-white);
  }

  .comment {
    position: absolute;
    top: 30.6rem;
    color: var(--col-pink-400);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .comment .text {
    font-size: 3.2rem;
    line-height: 3.2rem;
    padding-left: 0.4rem;
    color: var(--col-pink-300);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .filter-wrapper.halloween {
    filter: drop-shadow(0 0 1em var(--col-halloween-400));
  }
  .card-container.halloween {
    border-left: 3px solid var(--col-halloween-400);
    border-right: 3px solid var(--col-halloween-400);
  }
  .content.halloween {
    background: linear-gradient(to top, rgba(231, 94, 17, 0.1), rgba(231, 94, 17, 0.4));
  }
  .top-cap.halloween,
  .bottom-cap.halloween {
    border-left: 3px solid var(--col-halloween-400);
    border-right: 3px solid var(--col-halloween-400);
  }
  .top-cap.halloween {
    border-top: 3px solid var(--col-halloween-400);
    background-color: rgba(231, 94, 17, 0.4);
  }
  .card-container.halloween.in-progress .top-cap {
    background-color: rgba(231, 94, 17, 0.1);
  }
  .bottom-cap.halloween {
    border-bottom: 3px solid var(--col-halloween-400);
    background-color: rgba(231, 94, 17, 0.1);
  }
  .top-cap.halloween:before,
  .top-cap.halloween:after,
  .bottom-cap.halloween:before,
  .bottom-cap.halloween:after {
    background-color: var(--col-halloween-400);
  }
  .card-title.halloween {
    color: var(--col-halloween-400);
  }
  .progress-bottom-container.halloween {
    border: 3px solid var(--col-halloween-400);
  }

  .comment.halloween {
    color: var(--col-halloween-400);
  }

  .comment.halloween .text {
    color: var(--col-halloween-300);
  }
`;
