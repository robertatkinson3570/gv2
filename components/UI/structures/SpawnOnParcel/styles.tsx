import css from 'styled-jsx/css';

export default css`
  .title-container {
    position: relative;
    z-index: 1;
  }

  .content {
    position: relative;
    margin-top: 1.5rem;
    padding: 0;
    min-height: 85rem;
    max-height: 85rem;

    --bottom-clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 3.5rem),
      calc(100% - 11.5rem) calc(100% - 3.5rem),
      calc(100% - 14.2rem) 100%,
      14.2rem 100%,
      11.5rem calc(100% - 3.5rem),
      0 calc(100% - 3.5rem)
    );
  }

  .content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 88, 220, 0.6);
    clip-path: var(--bottom-clip-path);
    z-index: -1;
  }
  .filter-buttons {
    display: flex;
    gap: 1.6rem;
    padding: 6rem 1rem 1rem 1rem;
    margin-top: -3rem;
  }

  .filter-button {
    height: 5rem;
    border-radius: 2px;
    font-size: 3.2rem;
    line-height: 3rem;
    padding: 0.8rem 2rem;
    background: rgba(0, 32, 114, 0.8);
    color: var(--col-info-400);
    text-transform: uppercase;
    text-align: center;
    cursor: url('/cursors/pointer.png'), pointer;
    position: relative;
  }

  .bottom-outline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.1rem;
    display: flex;
    height: 4rem;
    z-index: 10;
  }
  .bottom-outline .left,
  .bottom-outline .right {
    width: 11rem;
    border-top: 0.3rem solid var(--col-info-border);
    position: relative;
    z-index: 20;
  }
  .bottom-outline .left:before,
  .bottom-outline .right:after {
    position: absolute;
    top: -0.9rem;
    content: '';
    width: 1.4rem;
    height: 1.4rem;
    background: var(--col-info-400);
    z-index: 20;
  }
  .bottom-outline .left:before {
    left: 0;
  }
  .bottom-outline .right:after {
    right: 0;
  }

  .bottom-outline .center {
    display: flex;
    flex-grow: 1;
    z-index: 20;
  }
  .bottom-outline .center .bottom-line {
    height: 100%;
    flex-grow: 1;
    border-bottom: 0.3rem solid var(--col-info-border);
  }
  .bottom-outline .center .diag,
  .bottom-outline .center .anti-diag {
    width: 3rem;
    height: 100%;
  }
  .bottom-outline .center .diag {
    background: linear-gradient(
      to bottom left,
      transparent calc(50% - 2px),
      var(--col-info-border) calc(50% - 2px),
      var(--col-info-border) calc(50% + 2px),
      transparent calc(50% + 2px)
    );
  }
  .bottom-outline .center .anti-diag {
    background: linear-gradient(
      to bottom right,
      transparent calc(50% - 2px),
      var(--col-info-border) calc(50% - 2px),
      var(--col-info-border) calc(50% + 2px),
      transparent calc(50% + 2px)
    );
  }

  .filter-button.active {
    background: linear-gradient(180deg, rgba(0, 120, 157, 0.63) -16%, rgba(0, 227, 214, 0.6) 119%);
    color: var(--col-info-200);
    border: 2px solid rgba(157, 237, 255, 0.6);
  }

  .filter-container {
    display: flex;
    align-items: flex-end;
    column-gap: 1rem;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    padding: 0 1rem;
  }
  .sort {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: flex-end;
  }

  .sort > span {
    color: var(--col-info-400);
    font-size: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
  }
  .district {
    width: 6.4rem;
  }
  .toggle-title {
    font-size: 1.6rem;
    line-height: 1;
    color: var(--col-info-400);
  }
  .searching-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0.6rem 0rem 0.6rem;
  }
  .searching-container p {
    color: var(--col-info-400);
    margin: 0 0.8rem 0 0;
  }
  .channel-filter p {
    color: var(--col-info-400);
  }
  .channel-filter.active p {
    opacity: 0.5;
  }

  .filters-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
    flex: 1 0 calc(50% - 1.5rem);
  }

  .cta-baazaar-container {
    position: absolute;
    width: 100%;
    height: var(--base-height);
    z-index: 1;
    bottom: 0;
  }
  .content .loading-image {
    width: fit-content;
    margin: 8rem auto;
    // height: 62rem;
  }
  .search-by-name {
    flex: 1 0 calc(50% - 2rem);
  }

  @media screen and (max-width: 1199px) {
    .filter-button {
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 1023px) {
    .cta-baazaar-container {
      position: relative;
    }
  }
`;
