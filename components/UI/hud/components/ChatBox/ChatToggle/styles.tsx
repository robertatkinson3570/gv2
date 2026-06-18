import css from 'styled-jsx/css';

export default css`
  .toggle-wrapper.hide {
    display: none;
  }

  .toggle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: .8rem;
  }

  .toggle-container img {
    filter: drop-shadow(0 0 .2rem var(--col-pink-400));
  }
`;
