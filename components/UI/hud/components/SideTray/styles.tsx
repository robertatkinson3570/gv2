import css from 'styled-jsx/css';

export default css`
  .panel-wrapper {
    position: relative;
  }

  .chevron {
    position: absolute;
    top: 0.8rem;
    right: calc(100% + 2.4rem);
    padding: 0;
    border: none;
    background: none;
  }

  .sidetray-content {
    width: 40rem;
    height: 100%;
    padding: 0 1.2rem 1.2rem 2rem;
  }

  .sidetray-content.upgrades {
    padding: 0 1.2rem 1.2rem 1rem;
  }

  .tab-container {
    position: absolute;
    bottom: -0.6rem;
    right: calc(100% - 1.5rem);
    z-index: 3;
  }
`;
