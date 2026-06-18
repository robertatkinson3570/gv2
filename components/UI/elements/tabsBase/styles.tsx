import css from 'styled-jsx/css';

export default css`
  .tabs-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    width: 100%;
  }

  .tabs-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
    height: 4rem;
  }

  .tabs-header li {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0.4rem 1.8rem;
    font-family: 'Kimberley Rg';
    font-size: 1.8rem;
    line-height: 1;
    color: var(--col-info-800);
    transition: all 0.1s ease-in-out;
    background: linear-gradient(0deg, #022cc1, #022cc1);
    border: 3px solid transparent;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    z-index: 1;
  }
  .tabs-header.multiple {
    justify-content: space-between;
  }
  .tabs-header.multiple li {
    width: 100%;
  }

  .tabs-header li:hover,
  .tabs-header li.active {
    color: var(--col-black);
    background: linear-gradient(180deg, rgba(255, 162, 77, 0.7) 0%, rgba(255, 230, 0, 0.7) 100%), linear-gradient(180deg, #ffbe5c 0%, #ffe600 100%);
    border: 3px solid rgba(255, 255, 255, 0.4);
  }

  .tabs-content {
    flex: 1;
    margin: 0;
    padding: 0;
    background-color: var(--col-info-950);
    border: 4px solid rgba(5, 198, 240, 0.6);
    padding-bottom: 4rem;
  }
`;
