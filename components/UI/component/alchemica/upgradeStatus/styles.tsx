import css from 'styled-jsx/css';

export default css`
  .container {
    display: flex;
    flex-direction: row;
    position: relative;

    border-radius: .1rem;
    width: 32rem;
    height: 7.4rem;
    padding-right: .4rem;
    border-width: .3rem;
    border-style: solid;
    margin-left: 2rem;
    margin-bottom: 2rem;
  }
  .container.complete {
    border-color: #f31ced;
  }
  .container.progress {
    border-color: #00b9e1;
  }
  .container.inactive {
    border-color: rgba(217, 217, 217, 0.6);
  }
  .no-container {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;

    font-size: 3.6rem;
    font-weight: 600;
    height: calc(100% - .8rem);

    padding: .8rem 1.6rem;
    opacity: 0.9;
  }
  .container.complete .no-container {
    background: linear-gradient(180deg, rgba(200, 42, 194, 0) 22.92%, rgba(200, 42, 194, 0.45) 100%);
    color: var(--col-pink-200);
  }
  .container.progress .no-container {
    background: linear-gradient(180deg, rgba(0, 185, 243, 0) 22.92%, rgba(0, 185, 243, 0.45) 100%);
    color: #00b9e1;
  }
  .container.inactive .no-container {
    background: linear-gradient(180deg, rgba(217, 217, 217, 0) 22.92%, rgba(217, 217, 217, 0.27) 100%);
    color: rgba(255, 255, 255, 0.6);
  }
  .main {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: .8rem;
  }
  .label-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding-left: 1.2rem;

    align-items: flex-start;
    justify-content: flex-start;

    font-size: 2.8rem;
    line-height: 2.4rem;
  }

  .container.complete .label-container {
    color: #ff7bfb;
  }
  .container.progress .label-container {
    color: var(--col-white);
  }
  .container.inactive .label-container {
    display: none;
  }

  .progress-counter {
    font-size: 2.4rem;
    line-height: 2rem;
    color: #4adbfb;
  }
  .container.complete .bottom {
    border-bottom: .8rem solid #00b9e1;
  }
  .container.progress .bottom {
    border-bottom: .8rem solid #00b9e1;
    opacity: 0.4;
  }
  .container.inactive .bottom {
    border-bottom: .8rem solid #d9d9d9;
    opacity: 0.3;
  }
  .container .bottom {
    position: absolute;
    bottom: 0rem;
    width: 100%;
  }
  .container.complete .progress-bar {
    position: absolute;
    border-bottom: .8rem solid #f31ced;
    bottom: 0rem;
    width: 100%;
  }
  .container.progress .progress-bar {
    position: absolute;
    border-bottom: .8rem solid #00b9e1;
    bottom: 0rem;
  }
  .container.inactive .progress-bar {
    display: none;
  }
  .container .bot-icon {
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    bottom: -1.6rem;
  }

  .container.inactive .bot-icon {
    display: none;
  }
`;
