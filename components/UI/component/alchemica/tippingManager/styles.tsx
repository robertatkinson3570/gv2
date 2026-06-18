import css from 'styled-jsx/css';

export default css`
  .tipping-manager-component {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: white;
    height: 100%;
    gap: 0.4rem;
  }

  .token-wrapper {
    flex: 1;
    position: relative;
  }

  .token-wrapper.active::after {
    content: '';
    box-sizing: border-box;
    border: 2px solid var(--col-info-100);
    top: 0px;
    border-top: 4px solid var(--col-info-100);
    bottom: -1px;
    width: calc(100% + 4px);
    height: 8.2rem;
    left: -2px;
    right: -2px;
    bottom: -1px;
    z-index: 2;
    position: absolute;
    border-radius: 0 0 2px 2px;
  }

  .alchemica-token {
    box-sizing: border-box;
    padding: 0 1rem;
    min-width: 2rem;
    height: 100%;
  }

  .alchemica-token.open {
    border-top: 3px solid #8348ff;
    background: linear-gradient(180deg, rgba(131, 72, 255, 0.7) 0%, rgba(167, 112, 255, 0) 65.1%);
  }

  .token-wrapper.active {
    background: linear-gradient(180deg, rgba(0, 185, 225, 0.5) 0%, rgba(0, 185, 225, 0) 200%);
  }

  .token-wrapper.active .alchemica-token.open {
    background: none;
  }

  .value {
    margin: 0;
    margin-left: 1rem;
    font-size: 3rem;
  }

  .input-wrapper {
    position: absolute;
    width: 100%;
  }

  .alchemica-input {
    width: calc(100% + 0.4rem);
    height: 3.4rem;
    color: var(--col-info-400);
    padding: 0 1rem;
    text-align: center;
    border: 2px solid var(--col-info-400);
    background: var(--col-purple-900);
    margin: 0 -0.2rem;
    border-radius: 2px;
  }

  .token-wrapper.active .input-wrapper::before {
    content: '';
    position: absolute;
    border: 1px solid var(--col-info-100);
    width: 0.9rem;
    height: 0.9rem;
    border-left: none;
    border-bottom: none;
    left: 50%;
    top: -0.8rem;
    transform: translateX(-50%) rotate(144deg) skew(20deg);
    z-index: 1;
    background: #2a407a;
  }

  .token-wrapper.active .alchemica-input {
    border: 2px solid var(--col-info-100);
    border-top: 1px solid var(--col-info-100);
    position: relative;
    height: 3.8rem;
    font-size: 2.2rem;
    top: -0.4rem;
    display: block;
    background: linear-gradient(180deg, rgba(0, 185, 225, 1) -200%, #230e4f 80%);
  }

  .super-chat-input {
    position: absolute;
    bottom: -3.2rem;
    color: var(--col-info-400);
    transform: translateY(100%);
    width: calc(100% + 4px);
    border: 2px solid var(--col-info-400);
    background: #180d30;
    margin: 0 -0.2rem;
    border-radius: 2px;
    height: 3.4rem;
    color: var(--col-info-400);
    padding: 0 1rem;
    font-size: 1.8rem;
  }

  .super-chat-input::placeholder {
    color: var(--col-info-400);
    opacity: 0.4;
  }

  .alchemica-input:focus,
  .super-chat-input:focus {
    outline: none;
  }

  .cta-button {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(100%, 100%);
    background: #02a5c9;
    border: none;
    width: 15rem;
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    line-height: 0.8;
    padding: 0 2rem;
    height: 6.6rem;
    padding-top: 1rem;
    text-transform: uppercase;
    border-bottom: 6px solid #008dca;
  }
  .cta-button.disabled {
    background-color: var(--col-grey-400);
    border-color: var(--col-grey-500);
  }
`;
