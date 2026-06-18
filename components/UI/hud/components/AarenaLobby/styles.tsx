import css from 'styled-jsx/css';

export default css`
  .lobby-overlay {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: rgba(30, 7, 79, 0.75);
    z-index: 1000;
  }
  .loggy-overlay .guide {
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .aarena-lobby {
    width: 80rem;
    position: relative;
  }

  .aarena-queue {
    position: relative;
  }

  .aarena-lobby:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(
      0% 100%,
      0% 4.5rem,
      1.4rem 4.5rem,
      1.4rem 5rem,
      30% 5rem,
      calc(30% + 3rem) 0%,
      calc(70% - 3rem) 0%,
      70% 5rem,
      calc(100% - 1.4rem) 5rem,
      calc(100% - 1.4rem) 4.5rem,
      100% 4.5rem,
      100% 5rem,
      100% 100%
    );
    background: linear-gradient(0deg, rgba(0, 185, 225, 0.6) 6.96%, rgba(0, 185, 225, 0) 55.11%),
      linear-gradient(179.98deg, rgba(255, 214, 0, 0.5) 2.93%, rgba(255, 212, 0, 0) 34.21%), rgba(0, 0, 0, 0.25);
    z-index: -1;
  }
  .aarena-lobby {
    clip-path: polygon(
      0% 0%,
      0% calc(100% - 4.5rem),
      1.4rem calc(100% - 4.5rem),
      1.4rem calc(100% - 5rem),
      25% calc(100% - 5rem),
      calc(25% + 2rem) 100%,
      calc(75% - 2rem) 100%,
      75% calc(100% - 5rem),
      calc(100% - 1.4rem) calc(100% - 5rem),
      calc(100% - 1.4rem) calc(100% - 4.5rem),
      100% calc(100% - 4.5rem),
      100% 0%
    );
  }

  .aarena-queue-outline {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 5.5rem;
    background: var(--col-yellow-border);
    clip-path: polygon(
      0% calc(100% - 4px),
      30% calc(100% - 4px),
      calc(30% + 3rem) 0%,
      calc(70% - 3rem) 0%,
      70% calc(100% - 4px),
      100% calc(100% - 4px),
      100% 100%,
      calc(70% - 0.3rem) 100%,
      calc(70% - 3.3rem) 4px,
      calc(30% + 3.3rem) 4px,
      calc(30% + 0.3rem) 100%,
      0% 100%
    );
  }
  .aarena-queue:after,
  .aarena-queue:before {
    content: '';
    position: absolute;
    top: 4.6rem;
    width: 1.4rem;
    height: 1.4rem;
    background: var(--col-yellow-100);
  }
  .aarena-queue:before {
    left: 0;
  }
  .aarena-queue:after {
    right: 0;
  }
  .aarena-queue.empty {
    height: 21rem;
  }
  .aarena-queue.full {
  }
  .aarena-queue .content {
    padding-top: 3rem;
    align-items: center;
    height: 32rem;
    padding-bottom: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .welcome {
    max-width: 46rem;
    font-family: Alien Encounters;
    line-height: 1.2;
    text-align: center;
    color: var(--col-yellow-100);
  }
  .welcome .small {
    font-size: 4.2rem;
  }
  .welcome .big {
    font-size: 5.6rem;
  }
  .aarena-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .message {
    font-size: 3.2rem;
    line-height: 1;
    color: var(--col-white);
    margin-top: 3rem;
    margin-bottom: 2.5rem;
  }
  .gotchi-count-info {
    display: flex;
    gap: 2rem;
  }
  .gotchi-image {
    width: 5rem;
    height: 7rem;
  }
  .count-wrapper {
    color: var(--col-white);
    text-transform: uppercase;
    text-align: center;
  }
  .count-wrapper .gotchi-count {
    font-size: 4.2rem;
    line-height: 3.9rem;
  }
  .count-wrapper .gotchi-count .count {
    color: var(--col-yellow-100);
    text-shadow: -0.5px -0.5px 0 var(--col-white), 0.5px -0.5px 0 var(--col-white), -0.5px 0.5px 0 var(--col-white), 0.5px 0.5px 0 var(--col-white);
  }
  .count-wrapper .msg-join {
    font-size: 3rem;
    line-height: 4rem;
  }
  .aarena-rules {
    margin: -2rem auto 0 auto;
    position: relative;
    padding-top: 2rem;
  }
  .aarena-rules-outline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 5.5rem;
    background: var(--col-blue-border);
    clip-path: polygon(
      0% 0%,
      calc(25% + 0.4rem) 0%,
      calc(25% + 2.4rem) calc(100% - 4px),
      calc(75% - 2.4rem) calc(100% - 4px),
      calc(75% - 0.4rem) 0%,
      100% 0%,
      100% 4px,
      75% 4px,
      calc(75% - 2rem) 100%,
      calc(25% + 2rem) 100%,
      25% 4px,
      0% 4px
    );
  }
  .aarena-rules:after,
  .aarena-rules:before {
    content: '';
    position: absolute;
    bottom: 4.6rem;
    width: 1.4rem;
    height: 1.4rem;
    background: var(--col-blue-border);
  }
  .aarena-rules:after {
    right: 0;
  }
  .aarena-rules:before {
    left: 0;
  }
  .aarena-rules .content {
    transform: translateY(-3rem);
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .rules-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    font-family: Alien Encounters;
    font-size: 4.2rem;
    line-height: 4.6rem;
    color: var(--col-info-800);
  }
  .rules-header .line {
    width: 13rem;
    height: 0.4rem;
    background: var(--col-info-800);
  }

  .cta-container {
    filter: drop-shadow(0px 0px 20px rgba(17, 0, 38, 0.6));
  }
  .condition-header {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 3.2rem;
    line-height: 3rem;
    color: var(--col-info-800);
    text-align: center;
    text-transform: uppercase;
    text-shadow: -0.1px -0.1px 0 var(--col-info-800);
  }
  .condition-list {
    color: var(--col-white);
    font-size: 2.8rem;
    line-height: 2.6rem;
    list-style-type: square;
    width: fit-content;
  }
  .exit-warning {
    margin-top: 4rem;
    font-size: 2.8rem;
    line-height: 2.6rem;
    text-align: center;
    color: var(--col-yellow-100);
    text-shadow: 0.2px 0.2px 0 var(--col-yellow-border);
  }
  .aarena-lobby.empty .exit-warning {
    margin-bottom: 7rem;
  }
`;
