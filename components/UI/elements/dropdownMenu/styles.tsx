import css from 'styled-jsx/css';

export default css`
  .box-holder {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 0 1.2rem;
    box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
    cursor: url('/cursors/pointer.png'), pointer;
  }

  .box-holder.open {
    position: relative;
    margin: 0 -0.4rem;
    box-shadow: none;
  }

  .dropdown-container {
    position: relative;
  }
  .dropdown-content-wrapper {
    position: absolute;
    top: 4rem;
    transform: translateX(-20%);
    background: var(--col-purple-900);
  }

  // .dropdown-container:not(.open) {
  //   cursor: url('/cursors/pointer.png'), pointer;
  // }

  // .dropdown-container .toggle {
  //   cursor: url(/cursors/pointer.png), pointer;
  //   width: 8rem;
  //   height: 8rem;
  //   display: flex;
  //   align-items: center;
  //   border-bottom: 2px solid var(--col-purple-border);
  //   justify-content: center;
  //   background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
  //   background-size: 100% 0.8rem;
  // }

  // .dropdown-container.open .toggle {
  //   cursor: url(/cursors/pointer.png), pointer;
  //   width: 11.2rem;
  //   height: 7.5rem;
  //   padding-top: 0.5rem;
  //   display: flex;
  //   align-items: center;
  //   border: 2px solid var(--col-purple-border);
  //   border-top: none;
  //   justify-content: center;
  //   background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 75%, rgba(21, 21, 21, 1) 75%, rgba(21, 21, 21, 1));
  //   background-size: 100% 0.8rem;
  //   box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
  // }

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropdown-content {
    height: 0;
    overflow: hidden;
  }
  .dropdown-container.open .dropdown-content {
    height: fit-content;
  }
  .dropdown-container.open .box-holder {
    margin-left: 1.4rem !important;
  }

  .setting-ico {
    position: relative;
    z-index: 9;
    height: 100%;
  }

  .arrow-down-purple {
    border-bottom: 0.5rem solid #8348ff;
    z-index: 10;
  }

  .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    border-bottom: 2px solid var(--col-purple-border);
    position: absolute;
    height: calc(100% - 1.2rem);
    top: 0;
    z-index: 0;
  }

  .left-cap {
    border-left: 2px solid var(--col-purple-border);
  }

  .right-cap {
    border-right: 2px solid var(--col-purple-border);
  }

  .left-cap:after,
  .right-cap:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 1.2rem;
    background-color: var(--col-purple-border);
    top: calc(100% + 2px);
  }

  .left-cap:after {
    right: 0rem;
  }

  .right-cap:after {
    left: 0rem;
  }

  .arrow-down-purple:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    bottom: -1.5rem;
    border-top: 1.4rem solid #8348ff;
    border-left: 1.4rem solid transparent;
    border-right: 1.4rem solid transparent;
    z-index: 10;
  }
  .arrow-down-black {
    border-bottom: 0.5rem solid #8348ff;
    z-index: 10;
  }
  .arrow-down-black:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    bottom: -1.2rem;
    border-top: 1.2rem solid #000000;
    border-left: 1.2rem solid transparent;
    border-right: 1.2rem solid transparent;
    z-index: 10;
  }
`;
