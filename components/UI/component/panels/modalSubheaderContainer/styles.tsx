import css from 'styled-jsx/css';

export default css`
  .modal-subheader-container {
    margin: 0 auto;
    border-bottom: .2rem solid var(--col-pink-border);
    padding: .8rem .0rem .4rem;
    width: fit-content;
    position: relative;
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 .6rem .1rem var(--col-pink-border);
  }
  .modal-subheader-container.halloween {
    border-bottom: .2rem solid var(--col-halloween-border);
    box-shadow: 0 0 .6rem .1rem var(--col-halloween-border);
  }
  .modal-subheader-container.fullscreen {
    padding: .8rem .0rem .4rem;
    margin-bottom: 1.8rem;
  }
  .modal-subheader-container:before,
  .modal-subheader-container:after {
    content: '';
    position: absolute;
    width: .2rem;
    background-color: var(--col-pink-border);
    height: 1.2rem;
    bottom: 0;
  }
  .halloween.modal-subheader-container:before,
  .halloween.modal-subheader-container:after {
    background-color: var(--col-halloween-border);
  }

  .modal-subheader-container:after {
    left: 0;
  }

  .modal-subheader-container:before {
    right: 0;
  }
  .modal-subheader-container .right-cap,
  .modal-subheader-container .left-cap {
    position: absolute;
    height: calc(100% - 1.0rem);
    top: 0;
    width: 1.2rem;
    background-color: rgba(0, 0, 0, 0.9);
    border-bottom: .2rem solid var(--col-pink-border);
  }
  .halloween.modal-subheader-container .right-cap,
  .halloween.modal-subheader-container .left-cap {
    border-bottom: .2rem solid var(--col-halloween-border);
  }
  .modal-subheader-container .left-cap {
    right: 100%;
    border-left: .2rem solid var(--col-pink-border);
    box-shadow: -.2rem .1rem .3rem .0rem var(--col-pink-border);
  }
  .halloween.modal-subheader-container .left-cap {
    border-left: .2rem solid var(--col-halloween-border);
    box-shadow: -.2rem .1rem .3rem .0rem var(--col-halloween-border);
  }
  .modal-subheader-container .right-cap {
    left: 100%;
    border-right: .2rem solid var(--col-pink-border);
    box-shadow: .2rem .1rem .3rem .0rem var(--col-pink-border);
  }
  .halloween.modal-subheader-container .right-cap {
    border-right: .2rem solid var(--col-halloween-border);
    box-shadow: .2rem .1rem .3rem .0rem var(--col-halloween-border);
  }

  // Colors
  .modal-subheader-container.secondary {
    border-bottom: .2rem solid var(--col-purple-border);
    box-shadow: 0 0 .6rem .1rem var(--col-purple-border);
  }
  .modal-subheader-container.secondary:before,
  .modal-subheader-container.secondary:after {
    background-color: var(--col-purple-border);
  }
  .modal-subheader-container.secondary .right-cap,
  .modal-subheader-container.secondary .left-cap {
    border-bottom: .2rem solid var(--col-purple-border);
  }
  .modal-subheader-container.secondary .left-cap {
    border-left: .2rem solid var(--col-purple-border);
    box-shadow: -.2rem .1rem .3rem .0rem var(--col-purple-border);
  }
  .modal-subheader-container.secondary .right-cap {
    border-right: .2rem solid var(--col-purple-border);
    box-shadow: .2rem .1rem .3rem .0rem var(--col-purple-border);
  }

  .modal-subheader-container.info {
    border-bottom: .2rem solid var(--col-info-400);
    box-shadow: 0 0 .6rem .1rem var(--col-info-400);
  }
  .modal-subheader-container.info:before,
  .modal-subheader-container.info:after {
    background-color: var(--col-info-400);
  }

  .modal-subheader-container.info .right-cap,
  .modal-subheader-container.info .left-cap,
  .modal-subheader-container.info .left-cap,
  .modal-subheader-container.info .right-cap {
    border-color: var(--col-info-400);
  }

  .modal-subheader-container.info .left-cap {
    box-shadow: -.2rem .1rem .3rem .0rem var(--col-info-400);
  }
  .modal-subheader-container.info .right-cap {
    box-shadow: .2rem .1rem .3rem .0rem var(--col-info-400);
  }
`;
