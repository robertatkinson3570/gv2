import css from 'styled-jsx/css';

export default css`
  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100rem;
  }
  .events-filter {
    padding: 0 0.4rem 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  }
  .events-filter .sort-district {
    display: flex;
    gap: 1rem;
  }
  .district {
    width: 6.1rem;
  }
  .events-filter .search-input {
    max-width: 41rem;
  }
  .content-wrapper .events {
    height: 100%;
    overflow-y: auto;
  }
  .content-wrapper.no-filter .events {
    height: 100%;
  }

  .events::-webkit-scrollbar {
    display: none;
  }

  .content-wrapper .scrollable {
    padding-right: 0.8rem;
  }
  .content-wrapper .scrollable.events {
    flex-grow: 1;
  }
  .sort {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: flex-end;
  }
  .sort > span {
    color: var(--col-pink-350);
    font-size: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 12rem;
  }
`;
