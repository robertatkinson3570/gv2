import css from 'styled-jsx/css';

export default css`
  .leaderboard-wrapper {
    position: fixed;
    font-size: 1.1rem;
    width: 28em;
    margin: 0;
    padding: 0;
    transition: all 0.3s ease;
    right: -28.2em;
    top: 24rem;
  }
  .leaderboard-wrapper.open {
    right: 0;
  }
  .leaderboard-action {
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--col-purple-250);
    background: rgba(38, 13, 92, 0.9);
    border-bottom: 2px solid var(--col-purple-300);
    text-align: center;
    padding: 0.25rem 0 0 0;
  }
  .leaderboard-toggle {
    position: absolute;
    z-index: 1;
    top: -0.5rem;
    left: -5.6rem;
  }
  a.leaderboard-action-link {
    color: inherit;
    text-decoration: none;
    font-family: 'Alien Encounters Solid';
    font-size: 1.2em;
    line-height: 2em;
  }
`;
