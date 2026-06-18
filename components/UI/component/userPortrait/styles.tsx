import css from 'styled-jsx/css';

export default css`
  .user-img-container {
    border: 0.2em solid var(--col-pink-border);
    min-width: 7em;
    width: 7em;
    height: 7em;
    border-radius: 50%;
    padding: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }

  .user-img-container .static-img {
    position: relative;
    display: flex;
    min-width: 7.8em;
    height: 7.8em;
    margin-top: 1em;
  }

  .user-img-container .static-img.observor {
    position: relative;
    display: flex;
    min-width: 6em;
    height: 6em;
    margin: 0;
    margin-top: 2em;
  }

  .user-img-container img {
    width: 7.8em;
    height: 7.8em;
    margin-top: 1em;
  }
`;
