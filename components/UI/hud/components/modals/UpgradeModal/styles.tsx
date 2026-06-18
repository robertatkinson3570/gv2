import css from 'styled-jsx/css';

export default css`
  .inner {
    padding: 0rem 2.4rem 2.4rem;
    min-width: 80rem;
    min-height: 40rem;
  }

  .raw {
    display: flex;
    gap: 5rem;
    justify-content: center;
  }

  .alchemica-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2.4rem 0.8rem 2.4rem;
  }

  .alchemica-container .title {
    line-height: 1;
  }

  .alchemica {
    display: flex;
    align-items: center;
  }
  .alchemica.invalid {
    opacity: 0.4;
  }
  .alchemica p {
    margin: 0 0 0 0.4rem;
    font-size: 3.2rem;
  }
  .congrats-container {
    border: 0.2rem solid var(--col-blue-border);
    box-shadow: 0 0 0.8rem 0.2rem var(--col-blue-border);
    max-width: 57.9rem;
    margin: 0rem auto;
    text-align: center;
    padding: 4rem 5rem;
    margin-right: 3rem;
  }
  .congrats-title {
    font-size: 6.2rem;
    font-weight: 500;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--col-info-400);
  }
  .congrats-info {
    font-size: 4.8rem;
    line-height: 1.1;
    color: var(--col-white);
  }
  .level-decoration {
    color: var(--col-info-400);
  }
  .traits-container {
    display: flex;
    flex-direction: row;
    gap: 1.6rem;
    min-width: 60%;
    margin-top: 4.8rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    padding: 0rem 1.6rem 0.8rem 1.6rem;
    background: linear-gradient(180deg, rgba(0, 185, 225, 0) 22.92%, rgba(0, 185, 225, 0.45) 100%);
    opacity: 0.9;
    border-bottom: 0.3rem solid;
    border-image: radial-gradient(50% 2354449.91% at 50% 99.92%, #00b9e1 0%, rgba(0, 185, 225, 0.4) 100%) 1;
  }
  .left-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 50rem;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5.4rem;
    padding-top: 1.04rem;
  }
  .info-container {
    margin: 6rem 0;
  }

  .info-content {
    display: flex;
  }

  .traits-content {
    width: 28rem;
    padding-left: 2rem;
    max-height: calc(100% - 1.4rem);
  }

  .btn-container {
    margin-top: 3.2rem;
  }

  .craft-time-container {
    margin-top: 1.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  .craft-time {
    padding: 0.8rem;
  }
  .craft-time p {
    margin: 0;
    line-height: 1;
  }

  .craft-time .blocks {
    font-size: 2.6rem;
    margin-bottom: 0.4rem;
  }
  .craft-time .estimated-time {
    font-size: 2.2rem;
    color: var(--col-info-400);
  }
`;
