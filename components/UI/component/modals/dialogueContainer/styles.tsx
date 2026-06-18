import css from 'styled-jsx/css';

export default css`
  .overlay {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .panel-container {
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 0 6.4rem;
    max-width: 100%;
    width: 120rem;
  }

  .close-icon-container {
    position: absolute;
    top: -0.5rem;
    left: calc(100% + 1rem);
  }

  .dialogue-source-container {
    width: 25rem;
    box-shadow: 0 0 0.8rem 0.2rem var(--col-pink-400);
    border-radius: 0.8rem 0.8rem 0 0;
    z-index: 1;
  }
  .dialogue-source-container.info {
    box-shadow: 0 0 0.8rem 0.2rem var(--col-info-400);
  }

  .img-container {
    box-shadow: 0 0 0.8rem 0.2rem rgb(0, 0, 0) inset;
    background-color: var(--col-dark-grey);
    border-top: 0.4rem solid var(--col-pink-400);
    border-left: 0.4rem solid var(--col-pink-400);
    border-right: 0.4rem solid var(--col-pink-400);
    border-radius: 0.8rem 0.8rem 0 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 25rem;
    padding: 0 0 0.8rem;
    overflow: hidden;
    position: relative;
  }

  .img-container.info {
    border-top: 0.4rem solid var(--col-info-400);
    border-left: 0.4rem solid var(--col-info-400);
    border-right: 0.4rem solid var(--col-info-400);
  }

  .img-container .bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .img-container > span {
    position: absolute;
    bottom: 1.2rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    object-fit: contain;
    transform: scale(1.4);
  }

  .title-container {
    background-color: var(--col-pink-400);
    border-bottom: 0.6rem solid var(--col-pink-500);
    padding: 0.4rem 1.2rem 0.4rem;
  }

  .title-container.info {
    background-color: var(--col-info-400);
    border-bottom: 0.6rem solid var(--col-info-500);
  }

  .title-container h2 {
    text-transform: uppercase;
    font-size: 4rem;
    text-align: center;
    margin: 0;
    line-height: 0.8;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: var(--col-white);
  }

  .content-panel-container {
    z-index: 0;
    position: relative;
    width: calc(100% - 25rem);
  }
  .content-container {
    position: relative;
    min-height: 15rem;
    width: 100%;
  }

  /***********************************/
  /********  Halloween Style *********/
  /***********************************/

  .dialogue-source-container.halloween {
    box-shadow: 0 0 0.8rem 0.2rem var(--col-halloween-400);
  }

  .img-container.halloween {
    border-top: 0.4rem solid var(--col-halloween-400);
    border-left: 0.4rem solid var(--col-halloween-400);
    border-right: 0.4rem solid var(--col-halloween-400);
  }

  .title-container.halloween {
    background-color: var(--col-halloween-400);
    border-bottom: 0.6rem solid var(--col-halloween-500);
  }
`;
