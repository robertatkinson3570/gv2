import css from 'styled-jsx/css';

export default css`
  .row-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    line-height: 1.4em;
    gap: 0;
    background: rgba(38, 13, 92, 0.9);
    color: var(--col-grey-200);
    padding: 0.675rem 0 0.675rem 0;
    border-bottom: 0.3rem solid var(--col-purple-300);
    height: 6.1rem;
  }

  .row-item:first-child {
    border-top: 0.3rem solid var(--col-purple-300);
  }

  .row-item:first-child:before {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 0;
    width: 100%;
    height: 0.3rem;
    background: var(--col-purple-300);
    filter: drop-shadow(0 0 0 0.45em var(--col-purple-300));
  }

  .row-item.active {
    background: linear-gradient(0deg, rgba(53, 122, 255, 0.7), rgba(53, 122, 255, 0.7)), rgba(0, 0, 0, 0.8);
    border-color: var(--col-info-400);
  }

  .row-item.active,
  .row-item.active .meta .rank,
  .row-item.active .meta .name,
  .row-item.active .meta .time,
  .row-item.active .meta .icon {
    color: white;
    opacity: 1;
  }

  .row-item .rank {
    color: var(--col-info-200);
    font-family: 'Alien Encounters Solid';
    font-size: 1.3em;
    flex: 1 0 3rem;
    text-align: center;
  }
  .row-item .thumb {
    flex: 1 0 auto;
    height: 3.4rem;
  }
  .row-item .meta {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex: 1 0 65%;
    gap: 0.1em;
  }
  .row-item .meta .meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .row-item .meta .stats {
    min-width: 2rem;
  }

  .row-item .meta .stats,
  .row-item .meta .time {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.25rem;
  }
  .row-item .meta .time {
    padding-right: 0.75em;
  }
  .row-item .meta .stats span,
  .row-item .meta .time span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
  }

  .row-item .meta .name {
    color: var(--col-info-200);
    font-size: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row-item.active .meta .name {
    font-size: 1.75em;
    font-weight: bold;
  }
  .row-item .meta .stats {
    font-size: 1.1em;
  }
  .row-item .meta .time {
    padding-left: 0.75em;
    color: var(--col-grey-200);
    opacity: 0.7;
  }
  .row-item .meta .icon {
    margin-top: 0.1rem;
    opacity: 0.7;
  }
`;
