import css from 'styled-jsx/css';

export default css`
  .token-manager-component {
    width: 100%;
    padding: 1rem 6rem;
    color: white;
    line-height: 1.4;
    background: linear-gradient(to top, rgba(0, 133, 255, 1) -70%, #2a0f66 60%);
    border: 3px solid var(--col-info-300);
    border-radius: 0px 0px 0.5rem 0.5rem;
  }

  .token-manager-component.withdraw {
    background: linear-gradient(179.97deg, #2a0f66 34%, rgba(0, 102, 255, 1) 99.97%);
  }

  .title {
    font-size: 2.4rem;
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .transfer-info {
  }

  .transfer-info.reverse {
    flex-direction: row-reverse;
  }

  .transfer-info-container {
    width: 10rem;
    text-align: center;
    line-height: 0.9;
  }

  .transfer-animation {
    flex: 1;
  }

  .transfer-arrow {
    width: 180%;
    position: relative;
    margin-top: 2.3rem;
    left: -3.3rem;
  }

  .icon-wrapper {
    flex: 1;
    width: 9rem;
    background: linear-gradient(0deg, #26127e, #26127e), rgba(0, 185, 225, 0.1);
    padding: 0.3rem 1rem;
    border: 2px solid var(--col-info-300);
    border-radius: 1rem;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0.2rem 0.1rem var(--col-info-400);
    margin: 0.3rem 0;
  }

  .icon-container {
    position: relative;
    width: 5rem;
    height: 5rem;
  }
  .transfer-label {
    text-align: center;
    font-size: 1.8rem;
    margin: 0;
  }

  .transfer-icon {
    text-align: center;
  }

  .token-label {
    font-family: 'Alien Encounters Solid';
    font-size: 1.3rem;
    line-height: 1.1;
    text-align: center;
    color: var(--col-info-800);
  }

  .alchemica-type {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .transfer-details {
    margin-bottom: 2rem;
  }

  .alchemica-input-container {
    border-width: 1.5px;
    border-style: solid;
    border-color: var(--col-info-400);
    position: relative;
    max-width: 14rem;
    width: 100%;
  }
  .alchemica-input-container.zero {
    border-color: var(--col-info-400);
    opacity: 0.8;
  }
  .alchemica-input {
    background: none;
    border: none;
    width: 100%;
    padding: 0 1rem;
    color: var(--col-info-300);
    font-size: 2rem;
    position: relative;
  }
  .alchemica-input:focus-visible {
    outline: none;
  }
  .alchemica-input-container.zero .alchemica-input {
    color: rgba(0, 185, 225, 0.5);
  }
  .input-extra {
    position: absolute;
    padding: 0 0.4rem;
    right: 0;
    top: 0;
  }
  .alchemica-input-container:focus-within {
    border-color: var(--col-info-800);
    opacity: 1;
  }
  .alchemica-input-container:focus-within .alchemica-input {
    color: var(--col-info-400);
  }
  .cta-wrapper {
    text-align: center;
    margin: 0 auto;
  }
  .btn-transfer {
    width: 18.5rem;
    height: 5rem;
    margin: 0 auto;
  }
  .activity-button-wrapper {
    margin-top: 1rem;
    padding-bottom: 0.6rem;
  }

  .cta-button-label {
    text-transform: uppercase;
    line-height: 1.5;
    font-size: 2.2rem;
    text-shadow: 0.2px -0.1px 0 var(--col-white);
  }
  .activity-cta-label {
    color: var(--col-info-800);
    font-size: 2.4rem;
    line-height: 1;
    padding-bottom: 0.4rem;
    text-transform: uppercase;
    margin-left: 0.5rem;
  }

  .alchemica-type-balance {
    margin: 0;
    margin-left: 1rem;
    font-size: 2.8rem;
  }

  .max-button {
    color: var(--col-info-300);
    font-size: 2rem;
  }
`;
