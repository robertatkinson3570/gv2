import css from 'styled-jsx/css';

export default css`
  .input-container {
    position: relative;
    width: var(--width, 100%);
    height: var(--height, 4.2rem);
  }

  .input-container.parcel {
    position: relative;
    margin-top: 2.9rem;
  }

  .search-input {
    width: 100%;
    height: 100%;
    border: 0.3rem solid var(--col-pink-350);
    border-radius: 0.3rem;
    background: rgba(0, 0, 0, 0.25);
    padding: 0.4rem 0.4rem 0.8rem 3.6rem;
    font-size: 2rem;
    color: var(--col-pink-400);
    vertical-align: middle;
  }

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  .parcel .search-input {
    font-size: 2.2rem;
  }

  .search-input:focus {
    outline: none;
  }

  // .search-input:focus {
  //   outline: none;
  //   box-shadow: 0 0 4px 2px var(--col-pink-400);
  // }

  .search-input::placeholder {
    color: var(--col-pink-400);
  }

  .search-input.info {
    height: 100%;
    width: 100%;
    border-color: var(--col-info-400);
    background: rgba(0, 0, 0, 0.25);
    padding: 0.4rem 0.4rem 0.8rem 3.6rem;
    font-size: 2.4rem;
    color: var(--col-info-400);
  }
  .search-input.info.shadow {
    box-shadow: 0 0 0.4rem var(--col-blue-border), 0 0 0.4rem var(--col-blue-border);
  }

  .search-input.info::placeholder {
    color: var(--col-info-400);
    opacity: 0.6;
  }

  .icon {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    width: 2.2rem;
    height: 2.2rem;
  }

  .close-icon {
    position: absolute;
    right: 0.4rem;
    top: 50%;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    width: 2.2rem;
    height: 2.2rem;
    opacity: 0.8;
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .search-input.halloween {
    border-color: var(--col-halloween-400);
    color: var(--col-halloween-400);
    box-shadow: 0 0 4px 2px var(--col-halloween-400);
  }

  .search-input.halloween::placeholder {
    color: var(--col-halloween-600);
  }
`;
