import css from 'styled-jsx/css';

export default css`
  .token-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    padding: 0 0.8rem 0.2rem;
    position: relative;
  }
  .token-container.shared {
    background-color: rgba(0, 69, 108, 0.4);
  }
  .token-container:not(.shared) .claimable,
  .token-container:not(.shared) .borrowed-icon {
    display: none;
  }

  .borrowed-icon {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 3.2rem;
  }

  .token-container .alchemica-icon {
    width: 4rem;
  }

  .balance-container {
    margin-left: 1.8rem;
  }
  .balance-container p {
    margin: 0;
    text-transform: uppercase;
    line-height: 1;
  }

  .claimable {
    color: var(--col-blue-border);
    font-size: 3.2rem;
  }
  .claimable.invalid {
    opacity: 0.3;
  }

  .balance {
    color: var(--col-white);
    font-size: 2.2rem;
  }
`;
