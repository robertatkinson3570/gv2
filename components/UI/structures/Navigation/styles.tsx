import css from 'styled-jsx/css';

export default css`
  .navigation-container {
    display: flex;
    width: 100%;
    min-height: 10rem;
    padding: 0 2rem;
    align-items: center;
    justify-content: space-between;
    background: var(--col-info-500);
    position: fixed;
    top: 0;
    z-index: 90;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }
  .link-container {
    display: flex;
    margin-left: 4rem;
    align-items: center;
    gap: 4rem;
  }
  .text-link {
    font-size: 3.6rem;
    line-height: 1;
    color: var(--col-white);
  }
  .text-link:hover {
    text-decoration: none;
    transform: scale(1.1);
  }
  .logo-wrapper {
    position: relative;
    width: 9.6rem;
    height: 9.6rem;
    margin-right: 2rem;
  }
  .settings-container {
    display: flex;
    padding-right: 3rem;
    gap: 1.5rem;
    align-items: center;
  }
  .setting-button-container {
    width: 5.4rem;
    height: 5.4rem;
    position: relative;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .setting-button-container:active {
    transform: scale(1.2);
  }
  .verify-icon {
    position: absolute;
    top: 0;
    right: 0;
    filter: drop-shadow(0 0 0.2rem black);
  }

  @media screen and (max-width: 1200px) {
    .text-link {
      font-size: 4rem;
    }
  }
`;
