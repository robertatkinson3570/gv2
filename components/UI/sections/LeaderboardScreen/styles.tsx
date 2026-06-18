import css from 'styled-jsx/css';

export default css`
  .leaderboard-screen {
    padding: 0 5rem;
    min-height: 100vh;
    max-width: 160rem;
    width: 100%;
    margin: 0 auto;
  }

  .bg {
    height: 100vh;
    width: 100%;
    background: linear-gradient(180deg, #004dbd 0%, rgba(0, 163, 255, 0.72) 50.64%),
      linear-gradient(180deg, #1a3ffe 14.26%, #0070d8 58.16%, #7cc8f8 97.99%);
    box-shadow: 0px 4px 9px #61d9ff;
    z-index: -1;
  }
  .bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(9, 7, 118, 0.2), rgba(9, 7, 118, 0.2)),
      linear-gradient(
        180deg,
        rgba(0, 114, 220, 0) 13.85%,
        rgba(0, 178, 234, 0) 27.25%,
        rgba(171, 66, 221, 0.7) 60.76%,
        rgba(223, 30, 192, 0.7) 92.85%
      );
    box-shadow: 0px 4px 9px #61d9ff;
    z-index: -1;
  }

  .title-crown {
    line-height: 1;
    max-width: 5rem;
    margin-left: 6rem;
    margin-bottom: -2rem;
  }

  header {
    padding: 2rem 0;
  }

  .logo-container {
    max-width: 38rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .title {
    font-family: Alien Encounters Solid;
    font-size: 9rem;
    color: white;
  }

  .subtitle {
    font-family: Alien Encounters Solid;
    font-size: 3.2rem;
    position: relative;
    color: var(--col-pink-200);
    padding: 0.3em;
    padding-left: 0;
    border-top: 0.15em solid var(--col-pink-200);
  }

  .subtitle::after {
    content: '';
    width: 0.5em;
    height: 0.5em;
    background: var(--col-pink-200);
    position: absolute;
    top: -0.3em;
    right: 0;
  }

  .search-label {
    color: white;
    font-size: 2.2rem;
    line-height: 1;
  }

  .search-input {
    display: block;
    color: white;
    background: var(--col-blue-500);
    min-width: 30rem;
    border: 2px solid var(--col-info-400);
    border-radius: 1px;
    padding: 0 1rem;
    font-size: 2rem;
  }

  .leaderboard-table {
    margin-top: 2rem;
    border: 1px solid #0965f0;
    background: #0965f0;
    box-shadow: 0px 0px 8.80054px rgba(0, 0, 0, 0.6);
    border-radius: 2px;
  }

  .sort-container {
    display: inline-block;
    margin-left: 0.4rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .row {
    display: flex;
    white-space: nowrap;
    background: white;
    line-height: 1.6;
  }
  .row:last-child {
    border-bottom: 1px solid #0965f0;
  }
  .users-content > .row:nth-child(2n) {
    background: var(--col-info-150);
  }
  .row.label-container {
    color: white;
    background: #0965f0;
    border-bottom: 2px solid #0965f0;
    white-space: nowrap;
  }
  .row.label-container .totals,
  .row.label-container .enemies,
  .row.label-container .superchat {
    position: relative;
  }
  .row.label-container .totals,
  .row.label-container .enemies {
    background: inherit;
  }
  .row.label-container .totals::before,
  .row.label-container .enemies::before,
  .row.label-container .superchat::before {
    content: '';
    width: 100%;
    text-align: center;
    height: 100%;
    background: var(--col-pink-300);
    position: absolute;
    top: -100%;
    font-size: 1.2em;
    font-weight: bold;
  }

  .row.label-container .totals::before {
    content: 'TOTALS';
  }
  .row.label-container .enemies::before {
    content: 'ENEMIES';
  }
  .row.label-container .superchat::before {
    content: 'SUPERCHAT';
    background: #06aace;
  }

  .label-container .cell {
    text-align: center;
    text-transform: uppercase;
  }

  .category {
    display: flex;
    flex: 1;
    border: 1px solid #0965f0;
    border-top: none;
    border-bottom: none;
  }
  .category.rank {
    max-width: 6rem;
  }
  .category.user {
    max-width: 100%;
  }
  .category.score {
    max-width: 12%;
  }
  .category.report {
    max-width: 20%;
  }
  .category.totals,
  .category.enemies {
    max-width: 12%;
  }
  .category.superchat {
    max-width: 18%;
  }

  .cell {
    flex: 1;
    font-size: 2rem;
    // border: 1px dotted black;
    text-align: center;
    overflow: hidden;
  }

  .cell.id,
  .cell.tipsAverage {
    max-width: 5rem;
  }
  .cell.tipsAverage {
    max-width: 2rem;
  }
  .cell.sessionTime {
    min-width: 10rem;
  }

  .label-container .category.totals,
  .label-container .category.enemies,
  .label-container .category.superchat {
    background: linear-gradient(0deg, #5c6dff, #5c6dff), #0965f0;
  }

  .page-button {
    border: none;
    background: #7bc6f2;
    border-radius: 2px;
  }

  .page-button.back {
    background: #0851c7;
  }

  .page-button:hover,
  .page-button.active {
    font-size: 2rem;
    background: #bbe6ff;
  }

  .page-button:hover,
  .page-button.active {
    font-size: 2rem;
    background: #bbe6ff;
  }

  .copy-container {
    display: inline-block;
    margin: 0 0.4rem;
  }

  .buttons-wrapper {
    display: flex;
    min-height: 3.4rem;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .page-buttons-container {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .token-spent.fud {
    color: var(--col-text-fud-bold);
  }
  .token-spent.fomo {
    color: var(--col-text-fomo-bold);
  }
  .token-spent.alpha {
    color: var(--col-text-alpha-bold);
  }
  .token-spent.kek {
    color: var(--col-text-kek-bold);
  }

  .token-spent {
    text-align: center;
    font-size: 1.8rem;
    min-width: 1rem;
  }

  @media (max-width: 1024px) {
    .leaderboard-screen {
      padding: 0 1rem;
    }
  }

  @media (max-width: 922px) {
    .leaderboard-screen {
      padding: 0 1rem;
      min-height: 100vh;
      max-width: 100%;
      width: 100%;
      margin: 0 auto;
    }
    .row.label-container .totals::before,
    .row.label-container .enemies::before,
    .row.label-container .superchat::before {
      font-size: 0.8em;
    }

    .cell,
    .token-spent {
      font-size: 1.4rem;
    }
  }
`;
