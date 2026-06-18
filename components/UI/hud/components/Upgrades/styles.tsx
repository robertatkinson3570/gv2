import css from 'styled-jsx/css';

export default css`
  .claim-container {
    display: flex;
    justify-content: center;
    padding: 1.8rem 0 0;
    gap: 2rem;
  }

  .scroll-wrapper {
    position: relative;
    height: calc(100% - 5rem);
    padding-top: 1.2rem;
  }
  .scroll-wrapper:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.4rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .scroll-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    display: grid;
    padding-right: 1.2rem;
  }

  // .scrollable::-webkit-scrollbar-thumb {
  //   background: var(--col-info-400);
  // }

  .scroll-button-div {
    margin: 1.2rem auto 0;
    display: block;
    position: absolute;
    height: 1.6rem;
    width: 100%;
    border: none;
    background-color: transparent;
    transform: translateX(50%) translateX(-2.7rem);
  }
  .scroll-button-div:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-top: 1.5rem solid var(--col-info-500);
  }
  .scroll-button {
    margin: 1.2rem auto 0;
    display: block;
    position: relative;
    height: 1.2rem;
    width: 3.2rem;
    border: none;
    background-color: transparent;
  }
  .scroll-button:after {
    content: '';
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    height: 0;
    border-left: 1.6rem solid transparent;
    border-right: 1.6rem solid transparent;
    border-top: 1.2rem solid var(--col-info-400);
  }

  .upgrade-card {
    display: flex;
  }

  .upgrade-details {
    width: calc(100% - 13rem);
    height: 14rem;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    padding: 1.1rem 0;
  }

  .upgrade-details p {
    margin: 0;
    line-height: 1;
  }
  .upgrade-details .district {
    color: var(--col-info-400);
    font-size: 1.8rem;
    margin: 0.6rem 0 1.4rem 0;
  }

  .upgrade-details .claim-back {
    padding: 0.2rem 1.6rem 0.2rem 1rem;
    background: #009946;
    color: #fff;
    clip-path: polygon(0% 0%, 100% 0%, calc(100% - 1rem) 50%, 100% 100%, 0% 100%);
    float: right;
    font-size: 1.8rem;
    line-height: 1;
  }

  .upgrade-details .parcel-name {
    text-transform: uppercase;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  .upgrade-details .parcel-size {
    font-size: 1.8rem;
    color: var(--col-purple-200);
    margin-bottom: 0.8rem;
  }
  .upgrade-details .time-left {
    font-size: 1.6rem;
    color: var(--col-info-400);
  }

  .upgrade-details.claimable .time-left {
    color: var(--col-pink-400);
  }
`;
