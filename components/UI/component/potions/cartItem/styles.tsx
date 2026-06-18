import css from 'styled-jsx/css';

export default css`
  .cart-item-container {
    position: relative;
    display: flex;
    gap: 1rem;
    max-width: 8rem;
    max-height: 5rem;
    background: var(--col-blue-700);
    border-radius: 0.6rem;
    border-width: 2.5px;
    border-style: solid;
    border-color: var(--col-yellow-border);
    padding: 0.3rem 0.8rem;
  }
  .cart-item-container.editable {
    border-color: var(--col-info-border);
  }
  .icon-container {
    width: 2.2rem;
    height: 3.8rem;
    position: relative;
  }
  .counter {
    font-size: 3.2rem;
    line-height: 3rem;
    color: var(--col-white);
  }
  .btn-close {
    background: var(--col-blue-700);
    border: 2px solid var(--col-blue-border);
    border-radius: 3px;
    padding: 0.3rem;
    position: absolute;
    top: -1rem;
    right: -1rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .btn-close:active {
    transform: scale(1.1);
  }
`;
