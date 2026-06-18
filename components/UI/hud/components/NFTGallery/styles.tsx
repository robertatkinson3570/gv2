import css from 'styled-jsx/css';

export default css`
  .panel-wrapper {
    position: relative;
    z-index: 100000;
  }

  .gallery-container {
    width: 40rem;
    height: 100%;
    padding: 0 2rem 1.2rem 2rem;
    display: flex;
    flex-direction: column;
  }

  .loading-state {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 0.4rem;
    height: 2.4rem;
  }
  .loading-state p {
    margin: 0 0.4rem;
    color: var(--col-info-400);
  }

  .search-content {
    margin: 2rem 0 1rem 0;
    display: flex;
    position: relative;
  }

  .searched-wrapper {
    position: absolute;
    left: 10.1rem;
    top: 4.2rem;
    width: calc(100% - 10.1rem);
    background: rgba(0, 0, 0, 0.8);
    border: solid 2px var(--col-blue-border);
    border-top: none;
    z-index: 3;
    box-shadow: 0 0 4px 2px var(--col-info-400);
  }

  .searched-item {
    padding-left: 3.2rem;
    color: var(--col-info-400);
    font-size: 2rem;
    text-transform: capitalize;
  }

  .searched-item:hover {
    background: rgba(0, 169, 225, 0.4);
  }
  .input-container {
    width: auto;
  }

  .category-list-container {
    font-size: 2.4rem;
    color: white;
    margin: 0 0 10px 0;
    line-height: 1;
    display: flex;
    justify-content: space-between;
  }
  .network-toggle {
    width: 4rem;
    padding: 0;
    margin-right: 4rem;
  }
  .catergory-wrapper {
    width: 100%;
    overflow-x: auto;
  }
  .catergory-wrapper.scrollable::-webkit-scrollbar-thumb {
    // background: var(--col-info-400);
    height: 1rem;
  }

  .categories-list {
    display: flex;
    column-gap: 1rem;
    flex-flow: nowrap;
    flex-basis: fit-content;
    width: max-content;
  }

  .categories-list .item {
    font-size: 2.4rem;
    line-height: 1.1;
    border: 1px solid #bababa;
    border-radius: 2px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    column-gap: 4px;
    width: fit-content;
    text-transform: capitalize;
  }

  .categories-list .item .item-close {
    background: transparent;
    display: flex;
    padding: 0;
    border: none;
  }

  .divider {
    height: 10px;
  }

  .scroll-wrapper {
    position: relative;
    margin-bottom: 1rem;
    overflow: hidden;
    flex: 1;
  }

  .scroll-wrapper:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 3rem);
    height: 5.4rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .scroll-cantainer-wrapper {
    max-height: 100%;
    height: fit-content;
    padding-right: 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll-container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 2rem;
    column-gap: 3rem;
    padding: 1rem 0;
    // justify-content: space-between;
  }

  .shadow.active {
    filter: drop-shadow(0px 0px 4px var(--col-blue-border)) drop-shadow(0px 0px 4px var(--col-blue-border))
      drop-shadow(0px 0px 4px var(--col-blue-border));
  }

  .installation-wrapper {
    cursor: url('/cursors/pointer.png'), pointer;
    user-select: none;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .installation-wrapper.active {
    background: var(--col-blue-border);
    border-radius: 0.4rem;
  }

  .pointer {
    position: absolute;
    top: 5.4rem;
    left: -1.2rem;
    z-index: 1;
    transform: rotate(180deg);
    animation: drag 3000ms;
    animation-delay: 1000ms;
    opacity: 0;
    pointer-events: none;
  }

  @keyframes drag {
    0% {
      transform: rotate(180deg) translateX(0);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg) translateX(32px);
      opacity: 1;
    }
    51% {
      transform: rotate(180deg) translateX(0);
      opacity: 1;
    }
    100% {
      transform: rotate(180deg) translateX(32px);
      opacity: 1;
    }
  }

  .scroll-button-div {
    margin: 1.2rem auto 0px;
    display: block;
    position: absolute;
    height: 1.6rem;
    width: 100%;
    border: none;
    background-color: transparent;
    transform: translateX(50%) translateX(-2.7rem);
  }

  .scroll-button-div:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-top: 15px solid var(--col-info-500);
  }

  .buttons-container {
    display: flex;
    gap: 3rem;
    margin-top: 1rem;
    margin-right: 3rem;
  }

  .scroll-button {
    margin: 1.2rem auto 0;
    display: block;
    position: relative;
    height: 1.2rem;
    width: 3.2rem;
    border: none;
    background-color: transparent;
  }

  .scroll-button:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 1.6rem solid transparent;
    border-right: 1.6rem solid transparent;
    border-top: 1.2rem solid var(--col-info-400);
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 33rem;
  }
  .page-nav-btn {
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .page {
    font-size: 2.4rem;
    line-height: 1;
    color: var(--col-info-800);
    font-family: 'Alien Encounters Solid';
  }
  .pagination-button {
    width: 8rem;
  }
`;
