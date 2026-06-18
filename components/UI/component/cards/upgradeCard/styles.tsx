import css from 'styled-jsx/css';

export default css`
  .card-container {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    position: relative;
    padding: 1.3rem;
    width: 11em;
  }

  .level-container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--col-info-600);
    color: white;
    z-index: 1;
    width: 3.4rem;
    height: 3.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.3rem solid var(--col-info-400);
    border-radius: 0.4rem;
  }
  .level-container p,
  .level-container small {
    margin: 0;
    line-height: 1;
    text-align: center;
  }
  .level-container p {
    font-size: 2rem;
    font-weight: bold;
    line-height: 0.75;
  }

  .img-container {
    position: relative;
    background-color: var(--col-dark-grey);
    border: 0.3rem solid var(--col-info-400);
    border-radius: 0.4rem;
    height: 12rem;
    overflow: hidden;
    pointer-events: none;
  }
  .img-container:focus {
    outline: none;
  }
  .img-container .quantity {
    position: absolute;
    display: block;
    text-align: right;
    padding: 0 1.2rem 0 3.2rem;
    font-size: 2.4rem;
    pointer-events: none;
    top: 0;
    right: 0;
    z-index: 5;
    color: var(--col-white);
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  }
  .img-container img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .progress-overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
    text-shadow: 0.2rem 0.2rem 0rem #000, 0.2rem -0.2rem 0rem #000, -0.2rem 0.2rem 0rem #000, -0.2rem -0.2rem 0rem #000;
  }

  .name-container {
    position: relative;
    top: -0.3rem;
    background-color: rgba(15, 15, 15, 1);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0.4rem 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    border: 0.3rem solid var(--col-info-400);
    border-top: none;
  }
  .name-container p {
    text-align: center;
    color: var(--col-white);
    text-transform: uppercase;
    font-size: 1.4rem;
    text-align: center;
    line-height: 0.8;
    margin-bottom: 0.4rem;
  }

  .progress-bar {
    height: 0.8rem;
    width: 100%;
    position: relative;
  }
  .progress-bar:before {
    content: '';
    width: 100%;
    height: 0.4rem;
    position: absolute;
    top: 0.2rem;
    left: 0;
    background-color: var(--col-grey);
    z-index: -1;
    box-shadow: 0 0 0.2rem 0.1rem var(--col-info-400);
  }
  .current-progress {
    height: 100%;
    background-color: var(--col-info-400);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .current-progress p {
    font-size: 1.4rem;
    margin: 0;
    line-height: 0;
  }

  /* Complete */
  .card-container.complete .level-container {
    background-color: var(--col-purple-700);
    border: 0.2rem solid var(--col-purple-400);
  }

  .card-container.complete .img-container {
    border-color: var(--col-purple-400);
  }

  .card-container.complete .name-container {
    position: relative;
    background-color: var(--col-purple-400);
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    border-bottom: 0.4rem solid var(--col-common-500);
    border-top: 0.4rem solid var(--col-common-300);
    border-left: 0.4rem solid var(--col-purple-400);
    border-right: 0.4rem solid var(--col-purple-400);
    min-height: 4rem;
    padding: 0rem 0.5rem;
  }

  .card-container.complete .name-container p {
    font-size: 1.8rem;
  }

  .card-container.complete .progress-overlay {
    display: none;
  }

  .card-container.complete .progress-bar:before {
    box-shadow: none;
  }
  .card-container.complete .current-progress {
    background-color: var(--col-purple-400);
    box-shadow: 0 0 0.2rem 0.1rem var(--col-purple-400);
  }
`;
