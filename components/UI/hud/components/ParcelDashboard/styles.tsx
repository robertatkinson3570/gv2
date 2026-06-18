import css from 'styled-jsx/css';

export default css`
  .parcel-dashboard-content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.8rem 3.2rem 2.4rem 3.2rem;
    margin-top: -1rem;
    min-width: 90.2rem;
    min-height: 52.5rem;
  }
  .info-container {
    display: flex;
    gap: 5.6rem;
    align-items: flex-end;
    padding-top: 0.6rem;
  }

  .installation-container {
    margin-bottom: 0.6em;
    min-width: 27rem;
    display: flex;
    justify-content: center;
  }
  .stats-container {
    min-width: 27rem;
    display: flex;
    justify-content: center;
    margin-bottom: -0.6rem;
    padding: 0 1rem;
  }
  .reservoirs {
    display: flex;
    flex-direction: row;
    gap: 0.9rem;
  }
  .button-group {
    display: flex;
    margin-top: 4.8rem;
    gap: 5rem;
    justify-content: space-between;
    height: 12rem;
  }
  .survey-info {
    text-align: center;
  }
  .column {
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    flex-direction: column;
    gap: 0.8rem;
  }
  .comment {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    font-size: 2.4rem;
    line-height: 0.8;
    text-transform: uppercase;
    text-align: center;
    padding: 0 1rem;
  }

  .comment.info {
    color: var(--col-info-300);
  }
  .comment .disabled {
    color: white;
  }
  .comment .channel {
    color: var(--col-purple-300);
  }
  .comment .reservoir {
    color: var(--col-pink-300);
  }
  .toggle-access-rights {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    margin-left: 0.8rem;
    width: fit-content;
  }
  .access-rights-label {
    color: var(--col-pink-350);
    padding-top: 1rem;
    font-size: 2.3rem;
    line-height: 1.8rem;
    width: 7.7rem;
    text-transform: uppercase;
    user-select: none;
    text-shadow: 0 0 5px var(--col-pink-350);
    -webkit-text-stroke: thin;
  }
  .access-rights-button {
    position: relative;
    width: 4rem;
    height: 5rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .access-rights-button:active {
    transform: scale(1.2);
  }
  /************************************/
  /********* Halloween Style **********/
  /************************************/
  .comment .reservoir.halloween {
    color: var(--col-halloween-300);
  }
`;
