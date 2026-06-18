import css from 'styled-jsx/css';

export default css`
  .news-item {
    display: flex;
    gap: 1rem;
    max-width: 48rem;
  }
  @media screen and (max-width: 1199px) {
    .news-item {
      max-width: 90rem;
    }
  }
  .image-container {
    min-width: 13rem;
    max-width: 13rem;
    min-height: 13rem;
    max-height: 13rem;
    position: relative;
    border: 0.2rem solid var(--col-blue-border);
  }
  .content {
    color: var(--col-white);
    flex-grow: 1;
    padding-top: 0.4rem;
  }
  .title {
    font-size: 3.2rem;
    line-height: 0.9;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  .title:hover {
    color: var(--col-info-200);
  }
  .description {
    font-size: 2.2rem;
    line-height: 0.9;
  }
  .auto-clip {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:after {
      content: '...';
      text-align: right;
    }
  }
`;
