import css from 'styled-jsx/css';

export default css`
  .extended-button {
    position: absolute;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);
    background: transparent;
    border: none;
    padding: 0;
    z-index: 2;
  }

  .extended-button .extended-image {
    display: inline-flex;
    width: 48rem;
    height: 100%;
    background-color: #b4ffc7;
    border: 2px solid var(--col-info-400);
  }

  .extended-button p {
    text-transform: uppercase;
    color: var(--col-white);
    font-size: 2rem;
    filter: drop-shadow(0px 2px 2px black) drop-shadow(2px 0px 2px black) drop-shadow(0px -2px 2px black) drop-shadow(-2px 0px 2px black);
  }

  .container {
    position: absolute;
    width: fit-content;
    height: fint-content;
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-100%);
  }

  .nft-container {
    display: flex;
    z-index: 1;
    position: relative;
    top: -3rem;
  }

  .main-img-container {
    position: relative;
    overflow: hidden;
    width: 20rem;
    height: 20rem;
    background-color: var(--col-info-400);
    border: 2px solid var(--col-info-400);
    filter: drop-shadow(0px 0px 6px var(--col-info-400)) drop-shadow(0px 0px 6px var(--col-info-400));
    z-index: 1;
  }

  .main-img-container.button-include {
    position: relative;
    width: 20rem;
    height: 19.4rem;
    background-color: var(--col-info-400);
    border: 2px solid var(--col-info-400);
    border-bottom: none;
    filter: drop-shadow(0px 0px 6px var(--col-info-400)) drop-shadow(0px 0px 6px var(--col-info-400));
    z-index: 1;
  }

  // .main-img-container.button-include .extend-container {
  //   position: absolute;
  //   right: 1.6rem;
  //   bottom: 0.9rem;
  //   z-index: 1;
  //   height: 2rem;
  // }

  .main-img-container:before {
    content: ' ';
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 0.6rem solid var(--col-dark-gray-400);
  }

  .main-img-container.button-include:before {
    content: ' ';
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 0.6rem solid var(--col-dark-gray-400);
    border-bottom: none;
  }

  .main-img-container:after {
    content: ' ';
    position: absolute;
    z-index: -1;
    top: 0.6rem;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.6rem;
    border: 2px solid var(--col-info-400);
  }

  .main-img-container.button-include:after {
    content: ' ';
    position: absolute;
    z-index: -1;
    top: 0.6rem;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0;
    border: 2px solid var(--col-info-400);
  }

  .img-container {
    // position: relative;
    width: calc(100% - 1.6rem);
    height: calc(100% - 1.6rem);
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-frame {
    width: 100%;
    height: 100%;
  }

  .main-img-container.button-include .img-container {
    width: calc(100% - 1.6rem);
    height: calc(100% - 0.8rem);
    box-sizing: border-box;
    position: absolute;
    top: calc(50% + 0.2rem);
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-container .loading-back {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .name {
    position: relative;
    text-transform: uppercase;
    color: var(--col-pink-200);
    font-size: 4rem;
  }
  .name.slim {
    font-size: 2.6rem;
  }
  .swap-link {
    color: var(--col-pink-200);
    line-hight: 1;
    border: 1px solid var(--col-pink-300);
    max-width: 11rem;
    vertical-align: middle;
    padding: 0 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .swap-link .link-text {
    line-height: 1.2;
    padding-bottom: 0.2rem;
  }

  .swap-link .img {
    line-height: 0;
  }

  .sub-text {
    text-transform: uppercase;
    color: var(--col-pink-200);
    font-size: 2rem;
  }

  .action-button-info {
    font-size: 1.5rem;
  }

  .links-container {
    color: white;
    font-size: 1.6rem;
  }

  .link {
    color: var(--col-info-300);
  }

  .link-image {
    padding: 0 0.4rem;
    width: 0.7rem;
    height: 0.7rem;
  }

  .ghst-icon {
    margin: 0 0.8rem;
    line-height: 0.5;
    width: 2.5rem;
    height: 2.5rem;
    position: relative;
    display: flex;
    filter: none;
  }

  .inner.disable .ghst-icon {
    filter: grayscale(100%);
  }

  .extend-button {
    border: none;
    background: transparent;
    padding: 0;
    position: absolute;
    right: 1.4rem;
    bottom: 1.4rem;
    z-index: 1;
  }

  .main-img-container.button-include .extend-button {
    border: none;
    background: transparent;
    padding: 0;
    position: absolute;
    right: 1.2rem;
    bottom: 0.8rem;
    z-index: 1;
  }

  .extend-button .icon {
    position: relative;
    width: 2rem;
    height: 2rem;
  }
  .extend-button .icon.big {
    width: 3.5rem;
    height: 3.5rem;
  }

  .button-shadow {
    position: absolute;
    width: 20rem;
    top: 19.2rem;
    z-index: 1;
    filter: drop-shadow(0px 4px 4px var(--col-info-400));
  }

  .button-container {
    clip-path: polygon(0 0, 100% 0, 100% 2px, calc(100% - 3.6rem) 100%, 3.6rem 100%, 0 2px);
    padding: 0px 0.8rem 0.5rem;
    background: var(--col-dark-gray-400);
    border-bottom: 2px solid var(--col-info-400);
    // top: 10px;
  }

  .button-container:before {
    content: '';
    position: absolute;
    left: 0px;
    top: -0.6rem;
    width: 4.3rem;
    height: calc(100% + 1.2rem);
    background-color: var(--col-info-400);
    clip-path: polygon(0 0, 2px 0px, 2px 0.7rem, 4.3rem 100%, 0 100%);
  }

  .button-container:after {
    content: '';
    position: absolute;
    right: 0px;
    top: -0.6rem;
    width: 4.3rem;
    height: calc(100% + 1.2rem);
    background-color: var(--col-info-400);
    clip-path: polygon(calc(100% - 2px) 0.7rem, calc(100% - 2px) 0px, 100% 0, 100% 100%, 0px 100%);
  }

  .edit-button {
    padding: 0;
    border: none;
    padding: 0;
    background: none;
    display: flex;
    align-items: center;
  }

  .edit-button .icon {
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    opacity: 0.55;
  }

  .action-button {
    border: none;
    position: relative;
    background: var(--col-dark-gray-400);
    width: 100%;
    height: 4rem;
    clip-path: polygon(0 0, 100% 0, calc(100% - 3.3rem) 100%, 3.3rem 100%);
    border-bottom: 2px solid var(--col-info-400);
    padding: 2px 4px;
  }

  .action-button:before {
    content: '';
    position: absolute;
    left: 0px;
    top: -2px;
    width: 3.4rem;
    height: calc(100% + 4px);
    background-color: var(--col-info-400);
    clip-path: polygon(0 0, 0 0, 100% 100%, 0 100%);
    z-index: 1;
  }

  .action-button:after {
    content: '';
    position: absolute;
    right: 0px;
    top: -2px;
    width: 3.4rem;
    height: calc(100% + 4px);
    background-color: var(--col-info-400);
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 0px 100%);
  }

  .button-container .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-top: 0.6rem solid var(--col-pink-300);
    border-bottom: 0.6rem solid var(--col-pink-500);
    background-color: var(--col-pink-400);
    color: var(--col-white);
    clip-path: polygon(2px 0, calc(100% - 2px) 0, calc(100% - 3rem) 100%, 3rem 100%);
  }

  .button-container:active .inner {
    border-top: 0.6rem solid var(--col-pink-400);
    border-bottom: 0.6rem solid var(--col-pink-300);
    background-color: var(--col-pink-500);
  }

  .button-container .inner:before {
    content: '';
    position: absolute;
    left: 0px;
    width: 4.1rem;
    height: 3.4rem;
    background-color: var(--col-pink-300);
    clip-path: polygon(0 0, calc(100% - 2.8rem) 0, 100% 100%, 0 100%);
  }

  .button-container .inner:after {
    content: '';
    position: absolute;
    right: 0;
    width: 4.1rem;
    height: 3.4rem;
    background-color: var(--col-pink-500);
    clip-path: polygon(2.8rem 0, 100% 0, 100% 100%, 0 100%);
  }

  .button-container .inner.disable {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-top: 0.6rem solid var(--col-grey-300);
    border-bottom: 0.6rem solid var(--col-grey-500);
    background-color: var(--col-grey-400);
    color: var(--col-white);
    clip-path: polygon(2px 0, calc(100% - 2px) 0, calc(100% - 3rem) 100%, 3rem 100%);
  }

  .button-container:active .inner.disable {
    border-top: 0.6rem solid var(--col-grey-300);
    border-bottom: 0.6rem solid var(--col-grey-500);
    background-color: var(--col-grey-400);
  }

  .button-container .inner.disable:before {
    content: '';
    position: absolute;
    left: 0px;
    width: 4.1rem;
    height: 3.4rem;
    background-color: var(--col-grey-300);
    clip-path: polygon(0 0, calc(100% - 2.8rem) 0, 100% 100%, 0 100%);
  }

  .button-container .inner.disable:after {
    content: '';
    position: absolute;
    right: 0;
    width: 4.1rem;
    height: 3.4rem;
    background-color: var(--col-grey-500);
    clip-path: polygon(2.8rem 0, 100% 0, 100% 100%, 0 100%);
  }

  .desc {
    font-size: 1.8rem;
    color: var(--col-white);
  }

  .content-container {
    width: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid;
    border-image: linear-gradient(to right, var(--col-info-400), rgba(0, 164, 200, 0.4) 80%, #fff0 100%) 1;
    border-width: 2px 0;
    background: linear-gradient(90deg, rgba(0, 64, 159, 0.4) 7.68%, rgba(0, 55, 159, 0.4) 30%, rgba(0, 179, 219, 0) 86.75%),
      linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 22, 64, 0.5) 90%, rgba(0, 94, 124, 0) 100%);
    padding: 1rem 1.8rem;
  }

  .loading-state {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.4rem;
    height: 2.4rem;
  }
  .loading-state p {
    margin: 0 0.9rem !important;
    color: var(--col-info-400);
    font-size: 2.9rem;
  }

  .name-icon-container {
    display: flex;
    margin-bottom: 0.8rem;
  }

  .name-container {
    flex: 1;
  }
  .icon-container {
    width: 5rem;
    height: 5rem;
    margin-right: 0;
    padding: 0;
  }

  .content-container p {
    margin: 0;
    line-height: 1;
  }

  .listing-button-container {
    width: 8.8rem;
    height: fit-content;
  }

  .nosale-container {
    display: inline-flex;
    position: relative;
    border: 2px solid var(--col-purple-250);
    border-radius: 2px;
    color: var(--col-purple-200);
    left: 46%;
    width: 14rem;
    height: 2.7rem;
    transform: translateX(-50%);
  }

  .nosale-container .nosale-image {
    top: -0.3rem;
    position: relative;
    margin-left: 2px;
    width: 1.9rem;
    height: 2.9rem;
  }

  .nosale-container .nosale-text {
    margin: 0 0 0 0.9rem;
    font-size: 2.1rem;
    text-transform: uppercase;
    line-height: 1;
  }

  .is-owner {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
  }

  .is-owner.nolist {
    display: flex;
    flex-direction: column;
  }

  .is-owner .list-links {
    width: 15rem;
  }

  .is-owner .nft-list {
    color: var(--col-white);
    font-size: 1.6rem;
    padding: 0.8rem 0px;
    margin-bottom: 0.5rem;
  }

  .price-edit {
    display: flex;
    align-items: center;
    column-gap: 4px;
    margin-bottom: 0.8rem;
  }

  .price-inputbox {
    display: flex;
    align-items: center;
    padding: 3px 8px;
    column-gap: 2px;
    background: linear-gradient(180deg, rgba(0, 185, 225, 0.161) 22.92%, rgba(74, 219, 251, 0.35) 82.74%);
    border-radius: 1px;
    width: 10.5rem;
  }

  .price-inputbox.editing {
    display: flex;
    align-items: center;
    padding: 0 0 0 5px;
    column-gap: 2px;
    background: linear-gradient(180deg, rgba(0, 185, 225, 0.161) 22.92%, rgba(74, 219, 251, 0.35) 82.74%);
    border-radius: 1px;
    width: 10.5rem;
    border: 1px solid var(--col-info-400);
  }

  .price-inputbox .icon {
    position: relative;
    width: 2rem;
    height: 2rem;
  }

  .price-value {
    color: var(--col-white);
    font-size: 1.6rem;
    line-height: 1.1;
    width: 5rem;
    text-align: center;
  }

  .price-input {
    width: 4.7rem;
    background: transparent;
    text-align: center;
    font-size: 1.6rem;
    color: var(--col-info-200);
    border: none;
    line-height: 1.1;
  }

  .price-confirm {
    color: var(--col-info-200);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .approve-container .info-container {
    display: flex;
    margin-bottom: 0.8rem;
  }

  .approve-container .icon {
    max-width: 3rem;
    z-index: 1;
    line-height: 1;
  }

  .approve-container .text {
    height: 4.4rem;
    font-size: 2rem;
    line-height: 1;
    position: relative;
    padding-left: 2.5rem;
    padding-right: 9rem;
    // padding-top: 0.3rem;
    margin-left: -2rem;
    color: white;
    background: linear-gradient(to right, rgba(0, 142, 66, 0.5) 13.52%, rgba(0, 90, 42, 0.15) 85.67%, rgba(0, 90, 42, 0) 100%);
  }

  .approve-container .text .contract-link {
    text-decoration: none;
    color: var(--col-success-350);
  }

  .confirm-button {
    border: none;
    width: fit-content;
    height: fit-content;
    padding: 0;
  }

  .confirm-button .inner {
    width: 2.6rem;
    height: 2.6rem;
    background: var(--col-pink-400);
    border-top: 4px solid var(--col-pink-300);
    border-bottom: 4px solid var(--col-pink-500);
    border-right: 4px solid var(--col-pink-500);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .confirm-button .inner .icon {
    position: relative;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
  }

  .nft-list-link {
    color: var(--col-white);
    font-size: 1.6rem;
    opacity: 0.8;
    text-decoration: underline;
    background: none;
    border: none;
  }

  .price-confirm-button {
    background: none;
    padding: 0;
    border: none;
    margin: 0;
    margin-right: 0.6rem;
  }

  .price-confirm-button .icon {
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    padding-right: 3px;
    display: flex;
  }

  .confirm-button:active .inner {
    width: 2.6rem;
    height: 2.6rem;
    background: var(--col-pink-500);
    border-top: 4px solid var(--col-pink-400);
    border-bottom: 4px solid var(--col-pink-300);
    border-right: 4px solid var(--col-pink-300);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .confirm-button.no-conf .inner {
    width: 2.7rem;
    height: 2.7rem;
    background: var(--col-grey-400);
    border-top: 4px solid var(--col-grey-300);
    border-bottom: 4px solid var(--col-grey-500);
    border-right: 4px solid var(--col-grey-500);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .confirm-button.no-conf:active .inner {
    width: 2.7rem;
    height: 2.7rem;
    background: var(--col-grey-500);
    border-top: 4px solid var(--col-grey-400);
    border-bottom: 4px solid var(--col-grey-300);
    border-right: 4px solid var(--col-grey-300);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scrollable-container-wrapper {
    position: relative;
    margin-bottom: 0.8rem;
  }

  .views-container {
    display: flex;
    color: var(--col-white);
    align-items: center;
    gap: 1rem;
  }

  .views-container .icon {
    width: 1.6rem;
    height: 1rem;
    display: flex;
  }

  .views-container .text {
    font-size: 1.7rem;
    margin-left: 0.5rem;
  }

  .desc {
    max-height: 5.2rem;
    font-size: 1.8rem;
  }

  .owner-link {
    font-size: 1.6rem;
    line-height: 1.1;
  }

  .owner-link .owner-title {
    color: var(--col-white);
    opacity: 0.65;
  }

  .token-id {
    font-size: 1.6rem;
    color: var(--col-white);
    opacity: 0.8;
  }

  .is-owner.nolist .nft-nolist {
    font-size: 1.8rem;
    color: var(--col-purple-250);
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .shadow-box {
    width: 100%;
    height: 12.5rem;
    margin: -4.5rem 0 0 0;
    padding: 0;
    position: relative;
  }

  // .shadow-box.button-include {
  //   width: 100%;
  //   height: 15rem;
  //   margin: -4.5rem 0 0 0;
  //   padding: 0;
  //   position: relative;
  // }

  .link {
    text-decoration: underline dotted var(--col-info-400);
  }

  /*********************************/
  /*******  Halloween Style ********/
  /*********************************/

  .halloween .name {
    color: var(--col-halloween-200);
  }

  .halloween .swap-link {
    color: var(--col-halloween-200);
  }

  .halloween .sub-text {
    color: var(--col-halloween-200);
  }

  .halloween .button-container .inner {
    border-top: 0.6rem solid var(--col-halloween-300);
    border-bottom: 0.6rem solid var(--col-halloween-500);
    background-color: var(--col-halloween-400);
  }

  .halloween .button-container:active .inner {
    border-top: 0.6rem solid var(--col-halloween-400);
    border-bottom: 0.6rem solid var(--col-halloween-300);
    background-color: var(--col-halloween-500);
  }

  .halloween .button-container .inner:before {
    background-color: var(--col-halloween-300);
  }

  .halloween .button-container .inner:after {
    background-color: var(--col-halloween-500);
  }

  .halloween .confirm-button .inner {
    background: var(--col-halloween-400);
    border-top: 4px solid var(--col-halloween-300);
    border-bottom: 4px solid var(--col-halloween-500);
    border-right: 4px solid var(--col-halloween-500);
  }

  .halloween .confirm-button:active .inner {
    background: var(--col-halloween-500);
    border-top: 4px solid var(--col-halloween-400);
    border-bottom: 4px solid var(--col-halloween-300);
    border-right: 4px solid var(--col-halloween-300);
  }
`;
