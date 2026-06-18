import css from 'styled-jsx/css';

export default css`
  .minimap-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .zoom-icons {
    position: relative;
    top: 145px;
    left: 245px;
  }

  .zoom-icons div {
    width: 2.5rem;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .top-left-container {
    position: absolute;
    top: 0;
    left: 35rem;
    display: flex;
    height: 0;
  }
  .settings-menu-container {
    margin-left: 1.6rem;
  }
  .wallet-menu-container {
    margin-left: 2rem;
  }

  .pocket-container {
    position: absolute;
    top: 0;
    right: 34rem;
  }

  .right-middle-container {
    position: fixed;
    right: 0;
    top: 50%;
  }
  .item-shop-button-container {
    position: fixed;
    right: -1rem;
    top: 12rem;
  }

  .item-shop-button-container.open {
    right: 39.5rem;
    z-index: 91;
  }

  .top-right-container {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 0;
  }

  .hide {
    display: none;
  }

  .right-container {
    position: absolute;
    right: 0;
    top: 80px;
    bottom: 12px;
    display: flex;
    z-index: 90;
  }

  .users-health-container {
    margin-bottom: 1.2rem;
  }

  .performance {
    position: absolute;
    padding: 2rem;
    padding-top: 1rem;
    top: 0;
    right: 44rem;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0 1rem 0 0;
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    line-height: 1.2;
    min-width: 30rem;
    z-index: 2;
  }

  .bottom-right-container {
    position: fixed;
    width: 6rem;
    bottom: 15rem;
    right: 5.4rem;
  }

  .bottom-left-container {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .left-container {
    position: absolute;
    bottom: 15rem;
    left: 0;
  }

  .chat-container {
    margin-bottom: 50rem;
    position: absolute;
    bottom: 50rem;
    left: 0;
  }

  .action-button-container {
    position: fixed;
    bottom: 1.2rem;
    right: 0rem;
    gap: 1.8rem;
  }

  // update button image later
  .shootingOnButton {
    display: block;
    width: 6rem;
    height: 6rem;
    background: url(images/hud/shoot_on.png);
    margin-left: 1rem;
    border: 0rem;
  }

  .shootingOffButton {
    display: block;
    width: 6rem;
    height: 6rem;
    background: url(images/hud/shoot_off.png);
    margin-left: 1rem;
    border: 0rem;
  }

  // Opacity overrides for HUD elements
  .left-container,
  .item-shop-button-container,
  .right-container,
  .right-middle-container,
  .bottom-left-container {
    opacity: 0.85;
    transition: opacity 0.2s ease-in-out;
  }
  .left-container:hover,
  .item-shop-button-container:hover,
  .right-container:hover,
  .right-middle-container:hover,
  .bottom-left-container:hover {
    opacity: 1;
  }
`;
