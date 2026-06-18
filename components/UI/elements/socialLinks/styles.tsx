import css from 'styled-jsx/css';

export default css`
  .social-container {
    display: flex;
    align-items: center;
  }
  .link-container {
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem;
  }
  .title {
    color: var(--col-info-800);
    font-size: 5rem;
    line-height: 4.6rem;
    text-transform: uppercase;
  }
  .links {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 1rem;
  }
  .link {
    width: 5.8rem;
    height: 4.1rem;
    position: relative;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .link:hover {
    transform: scale(1.2);
  }
`;
