import css from 'styled-jsx/css';

export default css`
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lds-roller {
    display: inline-block;
    position: relative;
  }
  .lds-roller div {
  }
  .lds-roller div:after {
    animation: lds-roller 1.8s infinite;
    content: ' ';
    display: block;
    position: absolute;
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
    background: var(--col-info-400);
    margin: -0.4em 0 0 -0.4em;
  }
  .lds-roller.white div:after {
    background: var(--col-white);
  }
  .lds-roller.pink div:after {
    background: var(--col-pink-400);
  }
  .lds-roller.purple div:after {
    background: var(--col-purple-400);
  }
  .lds-roller.halloween div:after {
    background: var(--col-halloween-400);
  }

  .lds-roller div:nth-child(1):after {
    top: 100%;
    left: 50%;
  }
  .lds-roller div:nth-child(2) {
  }
  .lds-roller div:nth-child(2):after {
    animation-delay: -0.225s;

    top: 85%;
    left: 85%;
  }
  .lds-roller div:nth-child(3) {
  }
  .lds-roller div:nth-child(3):after {
    animation-delay: -0.45s;

    top: 50%;
    left: 100%;
  }
  .lds-roller div:nth-child(4) {
  }
  .lds-roller div:nth-child(4):after {
    animation-delay: -0.675s;

    top: 15%;
    left: 85%;
  }
  .lds-roller div:nth-child(5) {
  }
  .lds-roller div:nth-child(5):after {
    animation-delay: -0.9s;

    top: 0;
    left: 50%;
  }
  .lds-roller div:nth-child(6) {
  }
  .lds-roller div:nth-child(6):after {
    animation-delay: -1.125s;

    top: 15%;
    left: 15%;
  }
  .lds-roller div:nth-child(7) {
  }
  .lds-roller div:nth-child(7):after {
    animation-delay: -1.35s;

    top: 50%;
    left: 0%;
  }
  .lds-roller div:nth-child(8) {
  }
  .lds-roller div:nth-child(8):after {
    animation-delay: -1.575s;

    top: 85%;
    left: 15%;
  }
  @keyframes lds-roller {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(2.4);
    }
    100% {
      transform: scale(1);
    }
  }
`;
