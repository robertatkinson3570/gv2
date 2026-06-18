import css from 'styled-jsx/css';

const styles = css`
  .warning-area {
    padding: 1.2rem 1.5rem;
    border-width: 0.1rem;
    border-style: solid;
    border-radius: 0.4rem;
    background-color: #faf7fe;
    margin-bottom: 2.4rem;
  }

  .top-line {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .top-line.topLine {
    margin-bottom: 1rem;
  }
  .top-line.topLine p {
    font-weight: 600;
  }
  .top-line img {
    margin-top: 0.3rem;
    position: absolute;
    left: 0;
    width: 2rem;
  }
  .top-line p {
    padding-left: 3rem;
    font-size: 2.4rem;
    position: relative;
  }
  .content {
    font-size: 1.8rem;
  }
`;

export default styles;
