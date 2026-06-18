import css from 'styled-jsx/css';

const styles = css`
  .select-preferred-network {
    position: relative;
    z-index: 5;
    margin-bottom: 3.2rem;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .select-preferred-network .title {
    font-size: 1.8rem;
    margin: .8rem 1.2rem 0 0;
    color: var(--col-text);
  }

  @media (min-width: 425px) {
    .select-preferred-network {
      flex-direction: row;
      align-items: flex-start;
    }
  }
`;

export default styles;
