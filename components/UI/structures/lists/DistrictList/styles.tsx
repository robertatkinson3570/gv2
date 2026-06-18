import css from 'styled-jsx/css';

export default css`
  .list-wrapper {
    border: 2px solid var(--col-pink-400);
    display: flex;
    box-shadow: 0 0 4px var(--col-pink-400);
    border-radius: 2px;
    margin: 0 10%;
  }
  .list-wrapper .title {
    position: relative;
    background-color: #100221;
    width: 4.6rem;
    border-right: 2px solid var(--col-pink-400);
    box-shadow: 0 0 4px var(--col-pink-400);
  }
  .list-wrapper .title .text {
    font-size: 2.5rem;
    text-transform: uppercase;
    transform: translate(-50%, -50%) rotate(270deg);
    width: 13.5rem;
    height: 3.2rem;
    top: 50%;
    left: 50%;
    text-align: center;
    position: absolute;
    color: var(--col-pink-400);
    line-height: 1.2;
    margin: 0;
  }
  .list-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1rem;
  }
  .list-item {
    margin: 0.8rem 0.6rem;
    // border: 2px solid transparent;
    display: flex;
    align-items: center;
    width: 27%;
    border: 2px solid var(--col-grey);
    border-radius: 2px;
    box-shadow: 0 0 4px var(--col-grey);
  }
  .list-item:hover {
    border-color: var(--col-pink-400);
    background-color: rgba(200, 42, 194, 0.2);
    box-shadow: 0 0 4px var(--col-pink-400);
  }
  .list-item .img-wrapper {
    position: relative;
    // border: 2px solid var(--col-pink-400);
    height: 4rem;
    width: 4rem;
    display: flex;
  }
  .list-item .text {
    padding: 0 0 0 1.6rem;
    border-left: 2px solid var(--col-grey);
    font-size: 3rem;
    line-height: 1.2;
    text-align: left;
    width: calc(100% - 3.8rem);
    height: 100%;
    margin: 0;
  }
  .list-item:hover p {
    border-color: var(--col-pink-400);
  }

  /***************************************/
  /********** Halloween Style ************/
  /***************************************/
  
  .halloween.list-wrapper {
    border: 2px solid var(--col-halloween-400);
    box-shadow: 0 0 4px var(--col-halloween-400);
  }
  .halloween.list-wrapper .title {
    border-right: 2px solid var(--col-halloween-400);
    box-shadow: 0 0 4px var(--col-halloween-400);
  }
  .halloween.list-wrapper .title .text {
    color: var(--col-halloween-400);
  }
  .halloween .list-item:hover {
    border-color: var(--col-halloween-400);
    background-color: rgba(231, 94, 17, 0.2);
    box-shadow: 0 0 4px var(--col-halloween-400);
  }
  .halloween .list-item .img-wrapper {
    // border: 2px solid var(--col-halloween-400);
  }
  .halloween .list-item:hover p {
    border-color: var(--col-halloween-400);
  }

`;
