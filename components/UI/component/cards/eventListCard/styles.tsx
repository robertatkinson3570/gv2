import css from 'styled-jsx/css';

export default css`
  .card-wrapper {
    display: flex;
    margin: 0 0 0.6rem;
    padding: 0.3rem;
  }

  .img-shadow {
    filter: drop-shadow(0 0 4px var(--col-pink-400));
    flex: 1 0 100%;
    max-width: 50%;
  }

  .img-wrapper {
    background: var(--col-pink-350);
    width: 100%;
    aspect-ratio: 2/1;
    min-height: 100%;
    clip-path: polygon(
      1.5rem 0rem,
      100% 0rem,
      100% 100%,
      1.5rem 100%,
      1.5rem calc(100% - 1.5rem),
      0rem calc(100% - 1.5rem),
      0rem 1.5rem,
      1.5rem 1.5rem
    );
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1400px) {
    .img-wrapper {
      height: 100%;
    }
  }

  .card-wrapper:hover .img-wrapper {
    padding: 0.2rem 0 0.2rem 0.2rem;
  }

  .img-wrapper .inner {
    position: relative;
    width: calc(100% - 0.6rem);
    height: calc(100% - 0.6rem);
    display: flex;
    align-items: center;
    clip-path: polygon(
      1.5rem 0rem,
      100% 0rem,
      100% 100%,
      1.5rem 100%,
      1.5rem calc(100% - 1.5rem),
      0rem calc(100% - 1.5rem),
      0rem 1.5rem,
      1.5rem 1.5rem
    );
  }

  .contents-wrapper {
    position: relative;
    display: flex;
    flex: 1 1 50%;
    flex-direction: column;
    line-height: 1.1;
    padding: 0.3rem 0.8rem 0.3rem 1.6rem;
    background: linear-gradient(270deg, rgba(207, 0, 199, 0.27) 36.97%, rgba(200, 42, 194, 0.51) 100%);
    justify-content: space-between;
    border: 0.3rem solid var(--col-pink-border);
    border-left: none;
  }

  .card-wrapper:hover .contents-wrapper {
    border: 0.3rem solid var(--col-pink-400);
    box-shadow: 0px 0px 10px #ff96ff;
    border-left: none;
    // border-right: none;
  }

  .contents-wrapper .title {
    color: var(--col-white);
    font-size: 2.8rem;
    line-height: 0.8;
    margin-bottom: 0.4rem;
    max-width: 90%;
  }

  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .contents-wrapper .start-time {
    color: var(--col-purple-300);
    font-size: 1.6rem;
    line-height: 0.8;
    display: flex;
    align-items: center;
  }

  .contents-wrapper .start-time .icon {
    display: flex;
    width: 1.2rem;
    height: 1.2rem;
  }

  .contents-wrapper .start-time .text {
    margin: 0 0 0 0.7rem;
  }

  .contents-wrapper .price {
    color: var(--col-info-400);
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .contents-wrapper .price .icon {
    display: flex;
    width: 1.2rem;
    height: 1.6rem;
  }

  .contents-wrapper .price .text {
    margin: 0 0 2px 0.7rem;
    font-size: 2.6rem;
    line-height: 0.9;
  }
  .contents-wrapper .price .text:after {
    content: ' attending';
    font-size: 2.2rem;
  }
  .contents-wrapper .end-time {
    color: var(--col-pink-200);
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .contents-wrapper .end-time .icon {
    display: flex;
    width: 1.3rem;
    height: 1.5rem;
  }

  .contents-wrapper .end-time .text {
    margin: 0 0 2px 0.7rem;
    font-size: 2.6rem;
    line-height: 0.9;
  }

  .contents-wrapper .parcel-info {
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .parcel-info .text {
    font-size: 1.8rem;
    color: var(--col-pink-200);
    margin-bottom: 1px;
  }

  .parcel-info .img-border {
    position: relative;
    display: flex;
    border: 2px solid var(--col-pink-400);
    width: 5.6rem;
    height: 5.6rem;
  }

  .parcel-img {
    display: flex;
  }

  @media (min-width: 1024px) and (max-width: 1199px) {
    .contents-wrapper .end-time .text {
      font-size: 1.8rem;
    }

    .parcel-info .img-border {
      width: 4.8rem;
      height: 4.8rem;
    }
  }

  /***************************************/
  /********** Halloween Style ************/
  /***************************************/

  .halloween .img-shadow {
    filter: drop-shadow(0 0 4px var(--col-halloween-400));
  }

  .halloween .img-wrapper {
    background: var(--col-halloween-400);
  }

  .halloween.card-wrapper:hover .contents-wrapper {
    border: 0.3rem solid var(--col-halloween-400);
  }

  .halloween .contents-wrapper .end-time {
    color: var(--col-halloween-200);
  }

  .halloween .contents-wrapper {
    background: linear-gradient(to left, rgba(231, 94, 17, 0.105) 36.97%, rgba(231, 94, 17, 0.425) 100%);
  }
`;
