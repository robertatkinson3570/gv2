import css from 'styled-jsx/css';

export default css`
  .panel-content {
    display: flex;
    padding-right: 1.6rem;
    max-width: 30rem;
    align-items: center;
    justify-content: center;
  }
  .details-container {
    margin-left: 1.2em;
  }
  .details-container .user-name {
    font-size: 2.9rem;
    line-height: 1;
    margin-bottom: 0rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 20rem;
    display: inline-block;
  }
  .details-container .user-name.small {
    font-size: 1.8em;
  }
  .health-bar-container {
    width: 18rem;
  }
`;
