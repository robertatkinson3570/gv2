import css from 'styled-jsx/css';

export default css`
  .parcel-list {
    display: grid;
    grid-template-columns: minmax(24rem, 1fr) minmax(24rem, 1fr);
    grid-auto-rows: min-content;
    grid-gap: 1em 2em;
    margin: 0;
    padding: 0 1rem 2rem 1rem;
    font-size: 0.9rem;
    width: 100%;
    height: auto;
    max-height: 100%;
    overflow-y: auto;
  }

  .parcel-list.narrow {
    height: 100%;
  }
  .parcel-list.narrow.scrollable {
  }
  .parcel-list.narrow.clipped {
    max-height: 62.5rem;
    padding-bottom: 10rem;
    clip-path: polygon(
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

  .parcel-list.wide {
    padding: 0;
    grid-template-columns: minmax(24rem, 1fr);
    gap: 0.3em;
  }

  .parcel-list.narrow .parcel-card-item {
    width: 100%;
    height: fit-content;
  }

  .parcel-list.wide .parcel-card-item {
    margin: 0.3em 0;
  }

  .lazyload-wrapper {
    margin-top: auto;
    margin-bottom: auto;
  }
  @media (max-width: 1439px) {
    .parcel-list.narrow {
      // height: 43.5rem;
    }
  }

  @media (max-width: 1199px) {
    .parcel-list.narrow {
      grid-template-columns: minmax(24rem, 1fr);
      max-height: 100%;
    }
    .parcel-list.narrow .parcel-card-item {
      max-width: 100%;
    }
  }

  @media (max-width: 1023px) {
    .parcel-list.narrow {
      grid-template-columns: minmax(24rem, 1fr);
      max-height: auto;
      height: 100%;
    }
    .parcel-list.narrow .parcel-card-item {
      max-width: 100%;
    }
  }
`;
