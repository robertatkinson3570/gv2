import css from 'styled-jsx/css';

export default css`
  .card-container {
    border-radius: 0.4rem;
    position: relative;
    padding: 2.1rem 0.7rem 0.7rem 2.1rem;
  }

  .card-content-wrapper.disabled {
    opacity: 0.7;
  }

  .level-container {
    position: absolute;
    top: 0;
    left: 0;
    /* transform: translate(-50%, -50%); */
    background-color: var(--col-black);
    color: white;
    z-index: 1;
    width: 3.4rem;
    height: 3.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--col-pink-400);
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
    border-top: 3px solid var(--col-pink-400);
    border-left: 3px solid var(--col-pink-400);
    border-right: 3px solid var(--col-pink-400);
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    height: 11rem;
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
    padding: 0 0.8rem 0 1.6rem;
    font-size: 2.4rem;
    line-height: 2.8rem;
    pointer-events: none;
    top: 0;
    right: 0;
    z-index: 5;
    color: var(--col-white);
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  }
  .img-container img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .disable-container {
    background: #000000aa;
    position: absolute;
    left: calc(50% + 0.7rem);
    width: 12.5rem;
    height: 5rem;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.2rem;
    line-height: 0.8;
    font-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .disabled-text {
    font-size: 2rem;
  }

  .name-container {
    border-top: 3px solid var(--col-pink-300);
    background-color: var(--col-pink-400);
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0rem 0.8rem;
    min-height: 4rem;
  }

  .name-container p {
    text-align: center;
    color: var(--col-white);
    text-transform: uppercase;
    font-size: 1.8rem;
    line-height: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .card-container.common .name-container {
    border-bottom: 0.4rem solid var(--col-common-500);
  }
  .card-container.common .level-container,
  .card-container.common .img-container {
    border-color: var(--col-common-400);
  }
  .card-container.common .name-container {
    border-top-color: var(--col-common-300);
    background-color: var(--col-common-400);
  }
  .card-container.common .level-container {
    background-color: var(--col-black);
  }

  .card-container.uncommon {
    border-bottom: 0.4rem solid var(--col-uncommon-500);
  }
  .card-container.uncommon .level-container,
  .card-container.uncommon .img-container {
    border-color: var(--col-uncommon-400);
  }
  .card-container.uncommon .name-container {
    border-top-color: var(--col-uncommon-300);
    background-color: var(--col-uncommon-400);
  }
  .card-container.uncommon .level-container {
    background-color: var(--col-uncommon-500);
  }

  .card-container.rare {
    border-bottom: 0.4rem solid var(--col-rare-500);
  }
  .card-container.rare .level-container,
  .card-container.rare .img-container {
    border-color: var(--col-rare-400);
  }
  .card-container.rare .name-container {
    border-top-color: var(--col-rare-300);
    background-color: var(--col-rare-400);
  }
  .card-container.rare .level-container {
    background-color: var(--col-rare-500);
  }

  .card-container.legendary {
    border-bottom: 0.4rem solid var(--col-legendary-500);
  }
  .card-container.legendary .level-container,
  .card-container.legendary .img-container {
    border-color: var(--col-legendary-400);
  }
  .card-container.legendary .name-container {
    border-top-color: var(--col-legendary-300);
    background-color: var(--col-legendary-400);
  }
  .card-container.legendary .level-container {
    background-color: var(--col-legendary-500);
  }

  .card-container.mythical {
    border-bottom: 0.4rem solid var(--col-mythical-500);
  }
  .card-container.mythical .level-container,
  .card-container.mythical .img-container {
    border-color: var(--col-mythical-400);
  }
  .card-container.mythical .name-container {
    border-top-color: var(--col-mythical-300);
    background-color: var(--col-mythical-400);
  }
  .card-container.mythical .level-container {
    background-color: var(--col-mythical-500);
  }

  .card-container.godlike {
    border-bottom: 0.4rem solid var(--col-godlike-500);
  }
  .card-container.godlike .level-container,
  .card-container.godlike .img-container {
    border-color: var(--col-godlike-400);
  }
  .card-container.godlike .name-container {
    border-top-color: var(--col-godlike-300);
    background-color: var(--col-godlike-400);
  }
  .card-container.godlike .level-container {
    background-color: var(--col-godlike-500);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .card-container.halloween {
    border-bottom: 0.4rem solid var(--col-halloween-500);
  }
  .card-container.halloween .level-container,
  .card-container.halloween .img-container {
    border-color: var(--col-halloween-400);
  }
  .card-container.halloween .name-container {
    border-top-color: var(--col-halloween-300);
    background-color: var(--col-halloween-400);
  }
  .card-container.halloween .level-container {
    background-color: var(--col-halloween-500);
  }
`;
