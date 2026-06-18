import css from 'styled-jsx/css';

export default css`
  .health-bar-container {
    display: flex;
    align-items: center;
  }
  .health-bar {
    position: relative;
    height: 1.4rem;
    flex-grow: 1;
    background-color: rgba(132, 132, 132, 0.5);
    margin-left: 0.8rem;
    overflow: hidden;
  }
  .health-bar.numeric {
    height: 2.2rem;
  }

  .current-health {
    position: relative;
    height: 100%;
    z-index: 1;
    transition: 200ms;
  }

  .increase {
    position: absolute;
    right: 1rem;
    top: 2px;
    text-align: right;
    font-size: 1.6rem;
    line-height: 0.9;
    z-index: 1;
  }

  .pink .increase {
    color: var(--col-pink-210);
  }
  .info .increase {
    color: var(--col-info-100);
  }
  .purple .increase {
    color: var(--col-purple-100);
  }
  .pink .current-health.high-health {
    background-color: #c048f7;
  }

  .info .current-health.high-health {
    background-color: #0ed0ff;
  }

  .purple .current-health.high-health {
    background-color: var(--col-purple-350);
  }

  .halloween .high-health {
    background-color: var(--col-halloween-400);
  }

  .low-health {
    background-color: red;
  }

  .current-health:after {
    content: '';
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 2px;
  }
  .pink .current-health:after {
    background-color: #8725bf;
  }
  .info .current-health:after {
    background-color: #0286ff;
  }
  .numeric-data {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 2px;
    color: var(--col-white);
    font-size: 1.8rem;
    line-height: 0.9;
    text-shadow: 0.2px 0.1px var(--col-white);
    z-index: 1;
  }
  .icon-container {
    width: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
