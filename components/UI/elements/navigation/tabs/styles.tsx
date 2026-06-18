import css from 'styled-jsx/css';

export default css`
  .tabs-container {
    width: 100%;
    display: flex;
    padding-inline-start: 0;
    margin-bottom: 0;
    position: relative;
    z-index: 1;
  }
  .tabs-container:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    height: 1.2rem;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .tab {
    flex-grow: 1;
    list-style: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2rem;
    color: var(--col-pink-400);
    border-bottom: .2rem solid rgba(200, 42, 194, 0.4);
    text-transform: uppercase;
    flex-basis: 0;
    padding-bottom: .4rem;
    position: relative;
  }

  .tab:not(.active) {
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .tabs-container.secondary .tab {
    color: var(--col-purple-400);
    border-bottom: .2rem solid rgba(131, 72, 255, 0.4);
  }

  .tabs-container.halloween .tab {
    color: var(--col-halloween-400);
    border-bottom: .2rem solid rgba(231, 94, 17, 0.4);
  }

  .tab:focus,
  .tab:hover,
  .tab.active {
    outline: none;
    background: linear-gradient(to top, rgba(200, 42, 194, 0.4), rgba(200, 42, 194, 0) 70%);
  }
  .tabs-container.secondary .tab.active,
  .tab.active {
    border-color: transparent;
  }

  .tab.active:after {
    content: '';
    position: absolute;
    bottom: -.2rem;
    left: 0;
    height: .3rem;
    width: 100%;
    background: linear-gradient(to right, rgba(200, 42, 194, 0.2), rgba(200, 42, 194, 1) 50%, rgba(200, 42, 194, 0.2) 100%);
  }
  .tabs-container.secondary .tab.active:after {
    background: linear-gradient(to right, rgba(131, 72, 255, 0.4), rgba(131, 72, 255, 1) 50%, rgba(131, 72, 255, 0.4) 100%);
  }
  .tabs-container.halloween .tab.active:after {
    background: linear-gradient(to right, rgba(231, 94, 17, 0.4), rgba(231, 94, 17, 1) 50%, rgba(231, 94, 17, 0.4) 100%);
  }

  .tabs-container.secondary .tab:focus,
  .tabs-container.secondary .tab:hover,
  .tabs-container.secondary .tab.active {
    background: linear-gradient(to top, rgba(131, 72, 255, 0.4), rgba(131, 72, 255, 0) 70%);
  }

  .tabs-container.halloween .tab:focus,
  .tabs-container.halloween .tab:hover,
  .tabs-container.halloween .tab.active {
    background: linear-gradient(to top, rgba(231, 94, 17, 0.4), rgba(231, 94, 17, 0) 70%);
  }

  .tab-icon {
    margin-right: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
  }

  .tab.active .tab-icon {
    filter: drop-shadow(0 0 .4rem var(--col-pink-400));
  }
  .secondary .tab.active .tab-icon {
    filter: drop-shadow(0 0 .4rem var(--col-purple-400));
  }
  .halloween .tab.active .tab-icon {
    filter: drop-shadow(0 0 .4rem var(--col-halloween-400));
  }
`;
