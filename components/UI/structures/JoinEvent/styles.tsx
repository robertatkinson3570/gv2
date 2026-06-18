import css from 'styled-jsx/css';

export default css`
  .join-event-container {
  }
  .content-wrapper {
    padding: 0rem 4.6rem 2rem 4.6rem;
    background: rgba(54, 11, 61, 0.6);
  }

  .filter-buttons {
    display: flex;
    gap: 1.6rem;
    padding-top: 2.5rem;
    margin-bottom: 1rem;
  }
  .filter-button {
    height: 5rem;
    background: linear-gradient(180deg, #3e0043 0%, rgba(52, 0, 56, 0.64) 46.35%, rgba(39, 0, 43, 0.58) 100%);
    border-radius: 0.2rem;
    font-size: 2.5rem;
    line-height: 3rem;
    padding: 0.8rem 2rem;
    color: var(--col-pink-350);
    text-transform: uppercase;
    text-align: center;
    vertical-align: middle;
    cursor: url('/cursors/pointer.png'), pointer;
  }

  @media screen and (max-width: 1199px) {
    .filter-button {
      font-size: 2rem;
    }
  }

  .filter-button.active {
    background: linear-gradient(to top, rgba(70, 0, 67, 0.6) -16%, rgba(243, 28, 237, 0.6) 119%);
    color: var(--col-pink-200);
    -webkit-text-stroke: 0.3px var(--col-pink-200);
  }

  .event-list {
    margin-top: 1.5rem;
  }
  .bottom-outline {
    height: 3rem;
    border-top: 0.4rem solid var(--col-pink-border);
    position: relative;
  }
  .bottom-outline:before,
  .bottom-outline:after {
    position: absolute;
    top: -0.9rem;
    content: '';
    width: 1.4rem;
    height: 1.4rem;
    background: var(--col-pink-400);
  }
  .bottom-outline:before {
    left: 0;
  }
  .bottom-outline:after {
    right: 0;
  }
`;
