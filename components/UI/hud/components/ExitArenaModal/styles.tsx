import css from 'styled-jsx/css';

export default css`
  .exit-aarena {
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 3rem;
    color: var(--col-white);
    text-transform: uppercase;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 8rem;
    text-align: center;
    min-width: 70rem;
  }
  .message-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  .success-text {
    max-width: 41rem;
    font-size: 3.2rem;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    color: var(--col-info-800);
    -webkit-text-stroke: 0.3px solid var(--col-info-800);
  }
  .message-container .warning-icon {
    width: 5rem;
    height: 5rem;
    position: relative;
  }
  .announcement {
    // background: linear-gradient(180deg, rgba(131, 72, 255, 0) -7.11%, rgba(131, 72, 255, 0.5) 9.1%, rgba(131, 72, 255, 0) 116.6%);
    border-radius: 0.5rem;
    max-width: 58rem;
    margin-top: 1rem;
    padding: 1.5rem 4rem;
  }
  .info-text-white {
    font-size: 3rem;
    line-height: 0.9;
    text-align: center;
  }
  .defeated {
    gap: 3rem;
  }
  .gotchi-mascot {
    position: relative;
    text-align: center;
    margin: 0 auto;

    width: 8rem;
    height: 12rem;
  }
  .warning-text {
    font-size: 3rem;
    line-height: 3.2rem;
    text-align: left;
    max-width: 50rem;
    color: var(--col-yellow-100);
  }
  .defeated .warning-text {
    text-align: center;
  }
  .info-text {
    font-size: 3.2rem;
    line-height: 3rem;
    text-transform: uppercase;
    color: var(--col-info-800);
  }
  .winning-conditions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .conditions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 2rem;
  }
  .condition {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2.8rem;
    line-height: 2.6rem;
    color: var(--col-grey-200);
    text-align: left;
  }
  .condition.met {
    color: var(--col-info-800);
  }
  .pink {
    color: var(--col-pink-200);
    margin: 0 0.5rem;
  }
  .play-again {
    align-items: center;
    font-size: 2.4rem;
    min-width: 25rem;
  }
  .play-again.center {
    justify-content: center;
    color: var(--col-pink-200);
  }
  .item-price-alchemica {
    margin-top: 0.3rem;
  }
  .cta-wrapper {
    white-space: nowrap;
    min-width: 90%;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .cost-wrapper {
    margin-left: 1rem;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
  }
  .item-price-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .icon-wrapper {
    line-height: 0;
    margin-top: 0.5rem;
  }

  .gotchis-in-queue {
    font-size: 2.8rem;
    line-height: 2.6rem;
    text-transform: uppercase;
    color: var(--col-white);
    margin-top: 2rem;
  }
  .gotchi-count {
    color: var(--col-yellow-100);
  }
  .buttons-container {
    display: flex;
    max-height: 8rem;
    max-width: 58rem;
    gap: 6rem;
    width: 100%;
    margin-top: 2rem;
  }
  .buttons-container .expandable {
    flex-grow: 1;
  }
`;
