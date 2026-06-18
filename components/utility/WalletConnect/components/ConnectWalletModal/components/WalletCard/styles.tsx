import css from 'styled-jsx/css';

const styles = css`
  .wallet-card {
    position: relative;
    border: none;
    padding: 0;
    border: 0.2rem solid var(--col-purple-border);
    background-color: var(--col-purple-320);

    color: var(--col-purple-300);
    width: 20rem;
    height: 14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2.7rem 0 1.1rem;
  }
  .wallet-card:hover {
    background-color: var(--col-purple-340);
  }
  .wallet-card:disabled,
  .wallet-card.in-development {
    background-color: #d6d6d6;
  }
  .wallet-card.in-development .text-inner span {
    font-size: 1.6rem;
  }

  .wallet-card.halloween {
    border: 0.2rem solid var(--col-halloween-border);
    background-color: rgba(231, 94, 17, 0.2);
  }

  .error {
    font-size: 1.2rem;
    font-weight: 400;
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 0;
  }

  .image-inner {
    position: relative;
    width: 4.6rem;
    height: 4.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: auto;
    transform: scale(1);
    transition: 300ms;
  }

  .text-inner {
    text-align: center;
    line-height: 1;
  }
  .text-inner p {
    font-size: 2.6rem;
    line-height: 1.6rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .text-inner span {
    display: block;
    font-weight: 300;
    font-size: 1.6rem;
  }
`;

export default styles;
