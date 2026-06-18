import css from 'styled-jsx/css';

export default css`
  .wallet-activity-component {
    width: 100%;
    position: relative;
    padding: 1rem 0 2rem 0;
    color: white;
    line-height: 1.4;

    background: linear-gradient(to bottom, rgba(0, 133, 255, 0.46) -54.06%, #2a0f66 68.71%), #241050;
    border: 3px solid var(--col-info-300);
    border-radius: 0 0 0.5rem 0.5rem;
    filter: drop-shadow(0px 3px 24px rgba(24, 0, 75, 0.5));
  }

  .activity-header {
    background: linear-gradient(180deg, rgba(0, 133, 255, 0.037037) 3.65%, rgba(0, 133, 255, 0.6) 100%);
  }

  .title {
    font-size: 2.4rem;
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .table-header {
    color: var(--col-info-800);
    font-size: 1.8rem;
    line-height: 1;
    padding: 0.4rem 2rem 0.5rem 2rem;
    text-shadow: -0.2px -0.2px 0 var(--col-info-800), 0.2px -0.2px 0 var(--col-info-800), -0.2px 0.2px 0 var(--col-info-800),
      0.2px 0.2px 0 var(--col-info-800);
  }

  .activity-list {
    height: 35rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .activity-list::-webkit-scrollbar {
    display: none;
  }

  .cta-wrapper {
    padding-top: 2.5rem;
    width: 18.5rem;
    text-align: center;
    max-width: 80%;
    margin: 0 auto;
  }

  .cta-button-label {
    text-transform: uppercase;
    font-size: 2.2rem;
    line-height: 1.5;
    text-shadow: 0.2px -0.1px 0 var(--col-white);
  }
  .activity-cta-label {
    color: var(--col-info-300);
    font-size: 2rem;
    text-transform: uppercase;
    margin-left: 1rem;
  }

  .status-fetching {
    font-size: 2rem;
    line-height: 1;
    margin: 0;
  }
  .tx-row {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0.5rem 1.5rem;
  }
  .tx-row:hover {
    background: rgba(8, 0, 99, 0.6);
  }
  .tx-row.error .dest-icon,
  .tx-row.error .tx-amount {
    opacity: 0.6;
  }
  .dest-icon {
    position: relative;
    width: 2.6rem;
    height: 2.6rem;
  }
  .polyscan-container {
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .polyscan-container:active {
    transform: scale(1.2);
  }
  .tx-amount {
    display: flex;
    flex-grow: 1;
    margin-left: 1rem;
  }
  .alchemica-tx-info {
    display: flex;
    gap: 0.4rem;
    width: 25%;
  }
  .alchemica-icon {
    width: 1.6rem;
    height: 1.6rem;
  }

  .alchemica-amount {
    font-size: 1.6rem;
    line-height: 1;
    color: var(--col-info-400);
  }
  .tx-row:hover .alchemica-amount {
    color: var(--col-info-200);
  }
  .status-icon {
    position: relative;
    width: 1.7rem;
    height: 1.5rem;
    margin-right: 1.5rem;
  }
  .tooltip-wrapper {
    position: absolute;
    left: 100%;
    transform: translate(-2rem, -80%);
    z-index: 1;
    width: max-content;
  }
`;
