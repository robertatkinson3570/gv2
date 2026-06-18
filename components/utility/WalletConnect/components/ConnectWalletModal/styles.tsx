import css from 'styled-jsx/css';

const styles = css`
  .network-selector {
    position: absolute;
    top: 2.4rem;
    right: 0.8rem;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 2.4rem;
    justify-content: center;
    position: relative;
    z-index: 3;
  }

  .privacy-inner {
    font-size: 2rem;
    margin: 5rem auto 0;
    text-align: center;
    max-width: 96rem;
    padding: 0rem 8rem;
    position: relative;
    z-index: 3;
    color: var(--col-text);
  }

  .privacy-inner a,
  .privacy-inner p {
    letter-spacing: 0.2rem;
  }
  .privacy-inner a {
    font-weight: 600;
  }
  .privacy-inner p {
    margin-bottom: 3rem;
    font-size: 2.4rem;
    line-height: 2.6rem;
  }
  .privacy-inner p span {
    font-weight: 400;
  }

  @media (min-width: 425px) {
    .content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .content {
      grid-template-columns: repeat(3, 20rem);
    }
  }

  .disclaimer {
    color: var(--col-purple-300);
  }
`;

export default styles;
