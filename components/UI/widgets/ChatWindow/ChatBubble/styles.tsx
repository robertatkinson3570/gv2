import css from 'styled-jsx/css';

export default css`
  .bubble-wrapper {
    filter: drop-shadow(0 0 0.4rem var(--col-black));
  }
  .bubble-container {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 0.4rem 1.2rem 0.4rem 0.8rem;
    background-color: #324852;
    width: fit-content;
    border-radius: 1.2rem;
    margin: 0.4rem 0 0.4rem 1.8rem;
  }
  .bubble-container:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    right: 100%;
    border-top: 1.2rem solid transparent;
    border-right: 1.8rem solid #324852;
    border-bottom: 1.2rem solid transparent;
  }

  .message-container {
    margin-left: 0.8rem;
  }

  .details-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: var(--col-pink-200);
    font-size: 1.7rem;
    line-height: 1;
    margin-bottom: 0;
  }
  .details-container .name {
    margin-right: 1.2rem;
  }

  .message {
    font-size: 2.2rem;
    line-height: 1;
    margin-bottom: 0;
  }

  /* sender */
  .bubble-wrapper.sender {
    display: flex;
    justify-content: flex-end;
  }

  .bubble-wrapper.sender .bubble-container {
    background-color: var(--col-pink-400);
    margin: 0.4rem 1.8rem 0.4rem 0;
  }
  .bubble-wrapper.sender .bubble-container:after {
    left: 100%;
    border-top: 1.2rem solid transparent;
    border-left: 1.8rem solid var(--col-pink-400);
    border-bottom: 1.2rem solid transparent;
    border-right: none;
  }

  .bubble-wrapper.sender .details-container {
    color: var(--col-white);
  }
`;
