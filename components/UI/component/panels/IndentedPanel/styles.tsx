import css from 'styled-jsx/css';

export default css`
  .box-holder {
    position: relative;
    box-shadow: 0 0 0.8rem 2px var(--col-pink-350);
    width: fit-content;
    z-index: 3;
  }
  .box-holder.secondary {
    box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
  }
  .box-holder.borrowed {
    // box-shadow: 0 0 0.8rem 2px var(--col-blue-border);
    box-shadow: none;
  }
  .box-holder.halloween {
    box-shadow: 0 0 0.8rem 2px var(--col-halloween-border);
  }
  .box-holder.small {
    box-shadow: 0 0 0.8rem 2px var(--col-pink-border);
  }
  .box-holder.yellow {
    box-shadow: 0 0 0.8rem 2px var(--col-yellow-border);
  }
  .title-panel {
    background-color: var(--col-black);
    border: 3px solid var(--col-pink-350);
    box-shadow: 0 0 0.8rem 2px var(--col-pink-350);
    border-radius: 0.6rem;
    padding: 1rem 0.8rem 1.4rem;
    position: absolute;
    z-index: 2;
    left: 50%;
    min-width: 66.6%;
    transform: translate(-50%, -50%);
  }

  .title-panel.side-title {
    padding: 0.5rem 0.8rem 0.7rem;
  }

  .box-holder.secondary .title-panel {
    border: 3px solid var(--col-purple-border);
    box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
  }
  .box-holder.borrowed .title-panel {
    border: 3px solid var(--col-blue-border);
    box-shadow: 0 0 0.8rem 2px var(--col-blue-border);
  }
  .box-holder.light-bg .title-panel {
    border: 3px solid var(--col-blue-border);
    box-shadow: 0 0 0.8rem 2px var(--col-blue-border);
    background: var(--col-purple-750);
  }
  .box-holder.halloween .title-panel {
    border: 3px solid var(--col-halloween-border);
    box-shadow: 0 0 0.8rem 2px var(--col-halloween-border);
  }
  .box-holder.yellow .title-panel {
    border: 3px solid var(--col-yellow-border);
    box-shadow: 0 0 0.8rem 2px var(--col-yellow-border);
  }
  .side-outer {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0.6rem 0rem 0rem 2px;
    box-shadow: 0.6rem 0 0.8rem 2px var(--col-info-400);
  }

  .side-outer:after {
    content: '';
    position: absolute;
    top: 0rem;
    left: 0.6rem;
    background-color: var(--col-info-400);
    height: 2px;
    width: 100%;
  }
  .side-outer.item-shop:after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.85);
    height: 1rem;
    border-bottom: 0.3rem solid var(--col-info-400);
    width: calc(100% + 0.3rem);
    bottom: -1rem;
    top: unset;
    left: -0.3rem;
  }

  .side-outer.item-shop {
    background: rgba(0, 0, 0, 0.85);
  }
  .side-outer.item-shop .box-holder .title-panel {
    background: linear-gradient(0deg, #1f0176, #1f0176), #0523c2;
  }
  .title-panel h2 {
    text-align: center;
    color: var(--col-white);
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
    font-size: 4.2rem;
  }

  .side-outer.item-shop .title-panel h2 {
    font-family: 'Alien Encounters Solid';
    font-size: 3.2rem;
    color: var(--col-info-800);
    line-height: 1;
    margin-top: 0.6rem;
  }

  .box-holder .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-pink-350);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    position: absolute;
    height: calc(100% - 1.2rem);
    top: 0;
    z-index: 0;
  }

  .side-outer.item-shop .box-holder.borrowed.has-top .cap {
    border-top: 0.2rem solid var(--col-blue-border);
  }
  .side-outer.item-shop .box-holder.borrowed .left-cap {
    border-left: 0.2rem solid var(--col-blue-border);
  }
  .side-outer.item-shop .box-holder .cap {
    border-bottom: 0.2rem solid var(--col-blue-border);
  }

  .box-holder .cap.padding-12 {
    height: calc(100% - 0.8rem);
  }

  .box-holder.secondary .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-purple-border);
  }
  .box-holder.borrowed .cap {
    // box-shadow: 0 0 0.8rem 2px var(--col-blue-border);
    box-shadow: none;
  }
  .box-holder.small .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-pink-350);
  }
  .box-holder.halloween .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-halloween-border);
  }
  .box-holder.yellow .cap {
    box-shadow: 0 0 0.8rem 2px var(--col-yellow-border);
  }
  .box-holder .cap.setting-menu {
    height: calc(100% - 1.2rem);
    background: linear-gradient(
      to bottom,
      var(--col-purple-900) 0%,
      var(--col-purple-900) 70%,
      var(--col-purple-750) 70%,
      var(--col-purple-750) 100%
    );
    background-size: 100% 0.8rem;
  }

  .box-holder.has-top .cap {
    top: 1.2rem;
    border-top: 0.4rem solid var(--col-pink-350);
    background-position-y: 0.4rem;
  }
  .box-holder.thin.has-top .cap {
    top: 1.2rem;
    border-top: 2px solid var(--col-pink-350);
    background-position-y: 0.4rem;
  }
  .box-holder.small.has-top .cap {
    top: 0.8rem;
    border-top: 2px solid var(--col-pink-350);
    background-position-y: 0.4rem;
  }
  .box-holder.chat-btn.has-top .cap {
    top: 1.2rem;
    border-top: 2px solid var(--col-pink-350);
    background-position-y: 0.4rem;
  }
  .box-holder.chat-btn.has-top.thin .cap {
    top: 1.2rem;
    border-top: 2px solid var(--col-pink-350);
    background-position-y: 2px;
  }
  .box-holder.secondary.has-top .cap {
    border-top: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.thin.secondary.has-top .cap {
    border-top: 2px solid var(--col-purple-border);
  }
  .box-holder.borrowed.has-top .cap {
    border-top: 0.4rem solid var(--col-blue-border);
  }
  .box-holder.small.has-top .cap {
    border-top: 3px solid var(--col-pink-350);
  }
  .box-holder.borrowed.thin.has-top .cap {
    border-top: 2px solid var(--col-blue-border);
  }
  .box-holder.halloween.has-top .cap {
    border-top: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.halloween.thin.has-top .cap {
    border-top: 2px solid var(--col-halloween-border);
  }
  .box-holder.yellow.has-top .cap {
    border-top: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.yellow.thin.has-top .cap {
    border-top: 2px solid var(--col-yellow-border);
  }
  .box-holder.has-bottom .cap {
    border-bottom: 0.4rem solid var(--col-pink-350);
  }
  .box-holder.small.has-bottom .cap {
    border-bottom: 3px solid var(--col-pink-350);
  }
  .box-holder.thin.secondary.has-bottom .cap {
    border-bottom: 2px solid var(--col-purple-border);
  }
  .box-holder.secondary.has-bottom .cap {
    border-bottom: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.yellow.has-bottom .cap {
    border-bottom: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.yellow.thin.has-bottom .cap {
    border-bottom: 2px solid var(--col-yellow-border);
  }
  .box-holder.thin.has-bottom .cap {
    border-bottom: 2px solid var(--col-pink-350);
  }
  .box-holder.chat-btn.has-bottom .cap {
    border-bottom: 2px solid var(--col-pink-350);
  }
  .box-holder.borrowed.has-bottom > .cap {
    border-bottom: 0.4rem solid var(--col-blue-border);
  }
  .box-holder.borrowed.thin.has-bottom .cap {
    border-bottom: 2px solid var(--col-blue-border);
  }
  .box-holder.halloween.has-bottom .cap {
    border-bottom: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.halloween.thin.has-bottom .cap {
    border-bottom: 2px solid var(--col-halloween-border);
  }
  .box-holder.small.has-top.has-bottom > .cap {
    height: calc(100% - 1.6rem);
  }
  .box-holder.has-top.has-bottom > .cap {
    height: calc(100% - 2.4rem);
  }

  .box-holder .content {
    width: fit-content;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) 75%, rgba(21, 21, 21, 0.9) 75%, rgba(21, 21, 21, 0.9));
    background-size: 100% 0.8rem;
    position: relative;
    z-index: 1;
    color: white;
    max-height: calc(100vh - 7.4rem);
  }
  .box-holder.borrowed .content {
    // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 90%, rgba(0, 185, 225, 0.12) 90%, rgba(0, 185, 225, 0.12));
    background-size: 100% 0.8rem;
  }
  .box-holder.light-bg .content {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 185, 225, 0.12) 80%, rgba(0, 185, 225, 0.12) 100%);
    background-size: 100% 0.8rem;
  }
  .box-holder.small .content {
    background: linear-gradient(90deg, rgba(255, 61, 224, 0.6) 11.69%, rgba(118, 8, 250, 0.6) 59.4%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7));
    background-size: 100% 0.8rem;
  }
  .box-holder.has-top .content {
    border-top: 0.4rem solid var(--col-pink-350);
  }
  .box-holder.thin.has-top .content {
    border-top: 2px solid var(--col-pink-350);
  }
  .box-holder.chat-btn.has-top .content {
    border-top: 2px solid var(--col-pink-350);
  }
  .box-holder.has-top.secondary .content {
    border-top: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.thin.has-top.secondary .content {
    border-top: 2px solid var(--col-purple-border);
  }
  .box-holder.has-top.borrowed .content {
    border-top: 0.4rem solid var(--col-blue-border);
  }
  .box-holder.has-top.small .content {
    border-top: 3px solid var(--col-pink-350);
  }
  .box-holder.thin.has-top.borrowed .content {
    border-top: 2px solid var(--col-blue-border);
  }
  .box-holder.has-top.halloween .content {
    border-top: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.thin.has-top.halloween .content {
    border-top: 2px solid var(--col-halloween-border);
  }
  .box-holder.has-top.yellow .content {
    border-top: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.thin.has-top.yellow .content {
    border-top: 2px solid var(--col-yellow-border);
  }
  .box-holder.has-bottom .content {
    border-bottom: 0.4rem solid var(--col-pink-350);
  }
  .box-holder.setting-menu .content {
    background: linear-gradient(
      to bottom,
      var(--col-purple-900) 0%,
      var(--col-purple-900) 70%,
      var(--col-purple-750) 70%,
      var(--col-purple-750) 100%
    );
    background-size: 100% 0.8rem;
  }

  .box-holder.thin.has-bottom.secondary .content {
    border-bottom: 2px solid var(--col-purple-border);
  }

  .box-holder.thin.has-bottom .content {
    border-bottom: 2px solid var(--col-pink-350);
  }
  .box-holder.chat-btn.has-bottom .content {
    border-bottom: 2px solid var(--col-pink-350);
  }
  .box-holder.has-bottom.secondary .content {
    border-bottom: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.has-bottom.borrowed > .content {
    border-bottom: 0.4rem solid var(--col-blue-border);
  }
  .box-holder.thin.has-bottom.borrowed > .content {
    border-bottom: 2px solid var(--col-blue-border);
  }
  .box-holder.has-bottom.halloween .content {
    border-bottom: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.thin.has-bottom.halloween .content {
    border-bottom: 2px solid var(--col-halloween-border);
  }
  .box-holder.has-bottom.yellow .content {
    border-bottom: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.thin.has-bottom.yellow .content {
    border-bottom: 2px solid var(--col-yellow-border);
  }
  .box-holder .left-cap {
    border-left: 0.4rem solid var(--col-pink-350);
  }
  .box-holder.light-bg .left-cap {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 185, 225, 0.12) 80%, rgba(0, 185, 225, 0.12) 100%);
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.thin .left-cap {
    border-left: 2px solid var(--col-pink-350);
  }
  .box-holder.secondary .left-cap {
    border-left: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.thin.secondary .left-cap {
    border-left: 2px solid var(--col-purple-border);
  }
  .box-holder.borrowed .left-cap {
    border-left: 0.4rem solid var(--col-blue-border);
    // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 90%, rgba(0, 185, 225, 0.12) 90%, rgba(0, 185, 225, 0.12));
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.thin.borrowed .left-cap {
    border-left: 2px solid var(--col-blue-border);
  }
  .box-holder.halloween .left-cap {
    border-left: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.thin.halloween .left-cap {
    border-left: 2px solid var(--col-halloween-border);
  }
  .box-holder.yellow .left-cap {
    border-left: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.thin.yellow .left-cap {
    border-left: 2px solid var(--col-yellow-border);
  }
  .box-holder .right-cap {
    border-right: 0.4rem solid var(--col-pink-350);
  }
  .side-outer.item-shop .box-holder .left-cap {
    background: linear-gradient(180deg, rgba(39, 5, 140, 0.8) 25.75%, rgba(17, 108, 217, 0.8) 99.99%);
  }
  .box-holder.light-bg .right-cap {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 185, 225, 0.12) 80%, rgba(0, 185, 225, 0.12) 100%);
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.thin .right-cap {
    border-right: 2px solid var(--col-pink-350);
  }
  .box-holder.chat-btn .right-cap {
    border-right: 2px solid var(--col-pink-350);
  }
  .box-holder.secondary .right-cap {
    border-right: 0.4rem solid var(--col-purple-border);
  }
  .box-holder.thin.secondary .right-cap {
    border-right: 2px solid var(--col-purple-border);
  }
  .box-holder.borrowed .right-cap {
    border-right: 0.4rem solid var(--col-blue-border);
    // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 90%, rgba(0, 185, 225, 0.12) 90%, rgba(0, 185, 225, 0.12));
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.small .right-cap {
    border-right: 3px solid var(--col-pink-350);
  }
  .box-holder.thin.borrowed .right-cap {
    border-right: 2px solid var(--col-blue-border);
  }
  .box-holder.halloween .right-cap {
    border-right: 0.4rem solid var(--col-halloween-border);
  }
  .box-holder.thin.halloween .right-cap {
    border-right: 2px solid var(--col-halloween-border);
  }
  .box-holder.yellow .right-cap {
    border-right: 0.4rem solid var(--col-yellow-border);
  }
  .box-holder.thin.yellow .right-cap {
    border-right: 2px solid var(--col-yellow-border);
  }
  /* corners */

  .box-holder.has-bottom .left-cap:after,
  .box-holder.has-top .left-cap:before,
  .box-holder.has-bottom .right-cap:after,
  .box-holder.has-top .right-cap:before {
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 1.25rem;
    background-color: var(--col-pink-350);
  }
  .side-outer.item-shop .box-holder.has-top .left-cap:before {
    width: 0.2rem;
  }
  .box-holder.thin.has-bottom .left-cap:after,
  .box-holder.thin.has-top .left-cap:before,
  .box-holder.thin.has-bottom .right-cap:after,
  .box-holder.thin.has-top .right-cap:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 1.2rem;
    background-color: var(--col-pink-350);
  }
  .box-holder.small.has-bottom .left-cap:after,
  .box-holder.small.has-top .left-cap:before,
  .box-holder.small.has-bottom .right-cap:after,
  .box-holder.small.has-top .right-cap:before {
    content: '';
    position: absolute;
    width: 3px;
    height: 0.8rem;
    background-color: var(--col-pink-350);
  }

  .box-holder.has-bottom .left-cap.padding-12:after,
  .box-holder.has-top .left-cap.padding-12:before,
  .box-holder.has-bottom .right-cap.padding-12:after,
  .box-holder.has-top .right-cap.padding-12:before {
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 0.8rem;
    background-color: var(--col-pink-350);
  }
  .box-holder.thin.has-bottom .left-cap.padding-12:after,
  .box-holder.thin.has-top .left-cap.padding-12:before,
  .box-holder.thin.has-bottom .right-cap.padding-12:after,
  .box-holder.thin.has-top .right-cap.padding-12:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 0.8rem;
    background-color: var(--col-pink-350);
  }

  .box-holder.chat-btn.has-bottom .left-cap:after,
  .box-holder.chat-btn.has-top .left-cap:before,
  .box-holder.chat-btn.has-bottom .right-cap:after,
  .box-holder.chat-btn.has-top .right-cap:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 1rem;
    background-color: var(--col-pink-350);
  }

  .box-holder.has-bottom .left-cap.setting-menu:after,
  .box-holder.has-bottom .right-cap.setting-menu:after {
    content: '';
    position: absolute;
    width: 0.4rem;
    height: 1.25rem;
    background: var(--col-purple-border);
  }

  .box-holder.secondary.has-bottom .left-cap:after,
  .box-holder.secondary.has-top .left-cap:before,
  .box-holder.secondary.has-bottom .right-cap:after,
  .box-holder.secondary.has-top .right-cap:before {
    background-color: var(--col-purple-border);
  }
  .box-holder.borrowed.has-bottom > .left-cap:after,
  .box-holder.borrowed.has-top .left-cap:before,
  .box-holder.borrowed.has-bottom > .right-cap:after,
  .box-holder.borrowed.has-top .right-cap:before {
    background-color: var(--col-blue-border);
  }
  .box-holder.small.has-bottom .left-cap:after,
  .box-holder.small.has-top .left-cap:before,
  .box-holder.small.has-bottom .right-cap:after,
  .box-holder.small.has-top .right-cap:before {
    background-color: var(--col-pink-350);
  }
  .box-holder.halloween.has-bottom .left-cap:after,
  .box-holder.halloween.has-top .left-cap:before,
  .box-holder.halloween.has-bottom .right-cap:after,
  .box-holder.halloween.has-top .right-cap:before {
    background-color: var(--col-halloween-border);
  }
  .box-holder.yellow.has-bottom .left-cap:after,
  .box-holder.yellow.has-top .left-cap:before,
  .box-holder.yellow.has-bottom .right-cap:after,
  .box-holder.yellow.has-top .right-cap:before {
    background-color: var(--col-yellow-border);
  }
  .box-holder.thin.has-bottom .left-cap.setting-menu:after,
  .box-holder.thin.has-bottom .right-cap.setting-menu:after {
    width: 2px;
  }
  .left-cap:after,
  .left-cap:before {
    right: 0;
  }

  .right-cap:after,
  .right-cap:before {
    left: 0;
  }

  .left-cap:after,
  .right-cap:after {
    top: calc(100% + 0.35rem);
  }
  .left-cap:before,
  .right-cap:before {
    bottom: calc(100% + 0.35rem);
  }
  .side-outer.item-shop .left-cap:before {
    bottom: calc(100% + 0.15rem);
  }
  .small .left-cap:after,
  .small .right-cap:after {
    top: calc(100% + 0.28rem);
  }
  .small .left-cap:before,
  .small .right-cap:before {
    bottom: calc(100% + 0.28rem);
  }
  .thin .left-cap:after,
  .thin .right-cap:after {
    top: calc(100% + 2px);
  }
  .thin .left-cap:before,
  .thin .right-cap:before {
    bottom: calc(100% + 2px);
  }

  .normal-outer {
    height: 100%;
  }
  .side-outer.item-shop {
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 0.6rem;
  }

  .side-outer.item-shop:before {
    content: '';
    position: absolute;
    top: -0.3rem;
    left: -0.3rem;
    background-color: var(--col-info-400);
    height: 0.3rem;
    width: calc(100% + 0.3rem);
  }

  .outer-cap {
    position: absolute;
    top: 1rem;
    height: calc(100% - 0.8rem);
    border-top: 2px solid var(--col-info-400);
    width: 1rem;
    box-shadow: 0 0 0.8rem 2px var(--col-info-400);
  }
  .side-outer.item-shop .outer-cap {
    width: 1rem;
    border-bottom: 3px solid var(--col-info-400);
    height: 100%;
    box-shadow: none;
  }
  .outer-cap.left {
    border-left: 2px solid var(--col-info-400);
    left: -0.4em;
  }
  .side-outer.item-shop .outer-cap.left {
    border-left: 0.3rem solid var(--col-info-400);
    background: rgba(0, 0, 0, 0.85);
    left: -1rem;
  }
  .outer-cap:after {
    content: '';
    position: absolute;
    width: 2px;
    top: -1.2rem;
    height: 1.2rem;
    background-color: var(--col-info-400);
  }
  .side-outer.item-shop .outer-cap:after {
    height: 1.5rem;
    top: -1.5rem;
    width: 3px;
  }
  .outer-cap.left:after {
    right: -2px;
  }
  .side-outer.item-shop .outer-cap.left:after {
    right: 0;
  }
  .box-holder.small .cap {
    background: linear-gradient(90deg, rgba(118, 8, 250, 0.6) 0%, rgba(118, 8, 250, 0.6) 75%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7));
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.wallet-button .content {
    background: linear-gradient(90deg, rgba(51, 133, 255, 0.6) 11.69%, rgba(118, 8, 250, 0.6) 100%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7));
    background-size: 100% 0.8rem;
  }
  .box-holder.wallet-button .cap {
    background: linear-gradient(90deg, rgba(118, 8, 250, 0.6) 0%, rgba(118, 8, 250, 0.6) 75%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 75%, rgba(21, 21, 21, 0.7) 75%, rgba(21, 21, 21, 0.7));
    background-size: 100% 0.8rem;
    background-position-y: 0.4rem;
  }
  .box-holder.wallet-toggle .content {
    background: linear-gradient(
      to bottom,
      var(--col-purple-900) 0%,
      var(--col-purple-900) 70%,
      var(--col-purple-750) 70%,
      var(--col-purple-750) 100%
    );
    background-size: 100% 0.8rem;
  }
  .side-outer.item-shop .box-holder .content {
    background: linear-gradient(180deg, rgba(39, 5, 140, 0.8) 25.75%, rgba(17, 108, 217, 0.8) 99.99%);
    border-top: 0.2rem solid var(--col-blue-border);
    border-bottom: 0.2rem solid var(--col-blue-border);
  }
  .box-holder.wallet-toggle .cap {
    background: linear-gradient(
      to bottom,
      var(--col-purple-900) 0%,
      var(--col-purple-900) 70%,
      var(--col-purple-750) 70%,
      var(--col-purple-750) 100%
    );
    background-size: 100% 0.8rem;
  }

  .wallet-toggle .right-cap.cap:before {
    content: '';
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: calc(50% - 0.3rem);
    transform: rotate(135deg);
    background: rgb(46, 6, 113);
    border: 0.2rem solid var(--col-purple-border);
    box-shadow: 0 0 0.5rem 0.1rem var(--col-purple-border);
    clip-path: polygon(-0.2rem -0.2rem, -0.2rem calc(100% + 0.2rem), calc(100% + 0.2rem) -0.2rem);
    left: 0rem;
  }
`;
