import css from 'styled-jsx/css';

export default css`
  .super-chat-item {
    background: #180747b2;
    display: flex;
    font-family: Alien Encounters Solid;
    margin-bottom: 0.4rem;
    border-bottom: 3px solid #4adbfb;
    height: 5rem;
    font-size: 1rem;
    color: white;
    align-items: center;
    position: relative;
  }

  .message {
    font-size: 1.4rem;
    line-height: 1;
    margin: 0;
    margin-left: 1rem;
  }
  .message.default {
    opacity: 0.3;
  }

  .tips {
    position: absolute;
    padding-right: 0.5rem;
    display: flex;
    right: 0;
    bottom: 0;
    gap: 0.4rem;
  }
  .tip {
    flex: 1;
    font-size: 1.2rem;
  }

  .tip.fud {
    color: #0ad869;
  }
  .tip.fomo {
    color: #ff8900;
  }
  .tip.alpha {
    color: #3ec5ff;
  }
  .tip.kek {
    color: #c957ff;
  }
`;
