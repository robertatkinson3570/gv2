import css from 'styled-jsx/css';

export default css`
  .banner {
    background-color: var(--col-purple-800);
    display: flex;
    justify-content: center;
    position: relative;
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden;
  }
  .banner.open {
    max-height: 50rem;
  }

  .message-container {
    display: flex;
    align-items: center;
    padding: 0.8rem 0 1.2rem;
  }
  .message-container:hover {
    text-decoration: none;
  }
  .message-container img {
    width: 2.2rem;
  }
  .message-container p {
    color: var(--col-white);
    margin: 0 0 0 1.2rem;
    line-height: 1;
    font-size: 2.2rem;
  }

  .close-container {
    position: absolute;
    top: 0;
    right: 1.2rem;
    top: 0;
  }
  .close-container p {
    color: var(--col-white);
    font-size: 3.2rem;
    margin: 0;
    line-height: 1;
  }
`;
