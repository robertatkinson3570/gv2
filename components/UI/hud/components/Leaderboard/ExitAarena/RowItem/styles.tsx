import css from 'styled-jsx/css';

export default css`
  .row-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    font-size: 1rem;
    line-height: 1.4rem;
    background: transparent;
    color: var(--col-grey-200);
    border-bottom: 0.4rem solid var(--col-info-400);
    padding: 1.7rem 0 1rem 0;
  }

  .row-item .rank {
    color: var(--col-info-800);
    font-family: 'Alien Encounters Solid';
    font-size: 2em;
    flex: 0 1 2em;
    text-align: center;
    margin-right: 0.1em;
  }

  .row-item .thumb {
    flex: 0 1 auto;
    min-width: 4em;
    min-height: 4em;
    margin-right: 1em;
  }

  .row-item .meta {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex: 1 0 65%;
    gap: 0.6em;
  }

  .row-item .meta .name {
    color: var(--col-white);
    font-family: 'Alien Encounters Solid';
    font-size: 1.6em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 0.2em;
  }

  .row-item .meta .stats {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1em;
  }

  .row-item .meta .alchemica {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
  }
  .row-item .meta .alchemica > span {
    font-size: 1.2em;
    font-family: 'Alien Encounters Solid';
    min-width: 2em;
  }

  .row-item .meta .value {
    flex: 1 0 auto;
    font-size: 1.8em;
    text-transform: uppercase;
    text-align: right;
    color: var(--col-white);
  }
`;
