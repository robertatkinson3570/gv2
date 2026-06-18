import css from 'styled-jsx/css';

export default css`
  .item-shop-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: -0.8rem;
    max-width: 40.5rem;
    max-height: 100%;
  }
  .items-container {
    flex: 0 1 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    padding: 0 2rem 0 2rem;
    margin: 4.4rem auto 2rem auto;
  }
  .spacer {
    flex: 1 0 auto;
  }
  .cart-container {
    display: flex;
    gap: 2rem;
    align-items: center;
    background: var(--col-blue-550);
    border-top: 3px solid var(--col-info-800);
    height: 7.6rem;
    padding-left: 2rem;
  }
  .status-container {
    display: flex;
    align-items: center;
    height: 5.4rem;
    background: linear-gradient(0deg, var(--col-blue-330), var(--col-blue-330)), var(--col-blue-440);
  }
  .status-container .purchase-state {
    width: 100%;
    text-align: center;
    font-size: 2.8rem;
    line-height: 3.1rem;
    font-family: 'Alien Encounters Solid';
    text-transform: uppercase;
  }
  .purchase-state.success {
    color: var(--col-yellow-100);
    text-shadow: -2px -2px 0 var(--col-purple-850), -2px 2px 0 var(--col-purple-850), 2px -2px 0 var(--col-purple-850),
      2px 2px 0 var(--col-purple-850);
  }
  .purchase-state.error {
    color: var(--col-info-200);
    text-shadow: -2px -2px 0 var(--col-purple-850), -2px 2px 0 var(--col-purple-850), 2px -2px 0 var(--col-purple-850),
      2px 2px 0 var(--col-purple-850);
  }
  .status-container .cost-container {
    width: 100%;
    height: 100%;
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    font-family: 'Alien Encounters Solid';
    font-size: 2rem;
    line-height: 1;
    color: var(--col-white);
  }
  .cost-item .cost-icon {
    width: 2rem;
    height: 2rem;
    position: relative;
  }
  .cost-item .cost {
    font-size: 1.8rem;
    line-height: 1.8;
    padding-top: 0.2rem;
  }
  .cost-item.kek .cost {
    color: var(--col-pink-250);
  }
  .cost-item.alpha .cost {
    color: var(--col-info-250);
  }
  .cta-container {
    display: flex;
    height: 15.6rem;
    flex-direction: column;
    aling-items: center;
    justify-content: center;
    background: var(--col-info-850);
    border-radius: 1px;
    padding-left: 2.2rem;
    padding-right: 1.4rem;
  }
  .btn-close {
    font-size: 2.6rem;
    line-height: 0.9;
    color: var(--col-white);
    background: transparent;
    border: none;
    margin-top: 1rem;
  }
`;
