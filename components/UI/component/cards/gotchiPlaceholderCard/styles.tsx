import css from 'styled-jsx/css';

export default css`
  .gotchi-panel {
    border-radius: 0.4rem;
    overflow: hidden;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .gotchi-panel:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--col-gotchi-disabled-500);
    border: 2px solid var(--col-gotchi-disabled-400);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 14px 3px #5e1fe4;
    border-radius: 5px;
    z-index: 0;
    opacity: 0.45;
  }

  .gotchi-img-container {
    width: 9rem;
    height: 9rem;
  }
`;
