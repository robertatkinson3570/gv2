import css from 'styled-jsx/css';

export default css`
  .leaderboard-wrapper {
    width: 100%;
    font-size: 1rem;
    transform: translateY(1.5rem);
  }
  .leaderboard-inner {
    padding-top: 1.5rem;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
  }
  .leaderboard-action {
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--col-yellow-100);
    text-align: center;
    padding: 2rem 0 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .trophy-icon {
    width: 1.8rem;
    height: 1.8rem;
    transform: translateY(-0.15rem);
  }
  a.leaderboard-action-link {
    color: inherit;
    text-decoration: none;
    font-family: 'Alien Encounters Solid';
    font-size: 1.8em;
    line-height: 1.4em;
  }
`;
