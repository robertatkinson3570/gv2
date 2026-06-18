import css from 'styled-jsx/css';

export default css`
  .panel-outline {
    position: relative;
  }

  .border-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .panel-outline.outer .border-wrap {
    filter: var(--border-filter);
  }
  .panel-outline.inner .border-wrap {
    filter: var(--content-filter);
  }

  .border-wrap:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(var(--clip-path-outer), var(--clip-path-inner));
    background: var(--border-color, transparent);
  }

  .clip-content {
    position: relative;
    box-sizing: border-box;
    color: var(--content-color);
    clip-path: polygon(var(--clip-path-inner));
    z-index: 1;
  }

  .panel-outline.outer .clip-content {
    padding-top: calc(var(--cap-top) + var(--double-border-spacing));
    padding-right: calc(var(--cap-right) + var(--double-border-spacing));
    padding-bottom: calc(var(--cap-bottom) + var(--double-border-spacing));
    padding-left: calc(var(--cap-left) + var(--double-border-spacing));
  }

  .panel-outline.inner .clip-content {
    padding-top: calc(var(--cap-top) + var(--content-padding) + var(--border-size));
    padding-right: calc(var(--cap-right) + var(--content-padding) + var(--border-size));
    padding-bottom: calc(var(--cap-bottom) + var(--content-padding) + var(--border-size));
    padding-left: calc(var(--cap-left) + var(--content-padding) + var(--border-size));
  }

  .clip-content:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg, transparent);
    z-index: -2;
    opacity: var(--bg-opacity, 1);
  }

  .clip-content.scanlines:after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--scanline-bg);
    background-size: 100% var(--scanline-spacing);
    opacity: var(--scanline-opacity);
    z-index: -1;
  }

  .clip-content.scrollable {
    overflow-y: auto;
  }
`;
