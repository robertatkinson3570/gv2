import css from 'styled-jsx/css';

export default css`
  .panel-title > div {
    background: var(--title-bg-color);
    border-width: var(--title-border-size);
    border-color: var(--border-color);
    color: var(--title-color);
    filter: var(--title-filter);
    min-width: var(--title-width);
    padding: var(--title-padding);
    z-index: 3;
    font-size: var(--title-font-size);
    font-family: var(--title-font-family);
    overflow: hidden;
    margin: 0 auto;
  }
  .panel-title.panel-title-component > div {
    background: transparent;
    border: none;
  }
  h2 {
    white-space: nowrap;
  }
`;
