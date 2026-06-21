import css from 'styled-jsx/css';

export default css`
  .landing-screen {
    width: 100%;
    overflow-x: hidden;
    padding-top: 10rem; // Account for navigation
  }

  .main-container {
    padding: 8rem 4rem 0rem 4rem;
    max-width: 1400px;
  }

  .main-content {
    position: relative;
    padding-top: 50rem;
    transition: padding-top 1s;
    z-index: 0;
    overflow: hidden;
  }
  .main-content.short {
    padding-top: 15rem;
  }

  .join-event {
    padding-top: 3rem;
    position: relative;
    z-index: 2;
    flex: 1 0 calc(50% - 2.5rem);
  }
  .image-info-container {
    margin-top: 4rem;
  }
  .img-container {
    margin: 0 auto;
  }
  .starting-point {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: -3rem;
    flex: 1 0 calc(50% - 2.5rem);
  }
  .blue-bg {
    background: linear-gradient(0deg, #110f86 -5.21%, #2586bc 71.44%);
    clip-path: polygon(0 0, 100% 20%, 100% 100%, 0 100%);
    padding-top: 110px;
  }
  .news {
    padding: 0 4rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  .social {
    padding-top: 4rem;
    padding-bottom: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .effect-layer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .main-content:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 0.4;
    z-index: -1;
  }

  .parallax-container {
    position: relative;
  }

  .parallax-layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .footer-container {
    position: relative;
    z-index: 2;
  }

  .parallax-layer.main-bg {
    background: url(images/tex_star_field.png);
    background-repeat: repeat;
  }
  .leaderboard-button-container {
    margin: 2rem 0 4rem 12rem;
    width: calc(100% - 22rem);
  }

  @media screen and (max-width: 991px) {
    .main-container {
      padding: 4rem 2rem 0 2rem;
    }
    .image-info-container {
      margin-top: 2rem;
    }
    .blue-bg {
      padding-top: 80px;
    }
    .social {
      padding-top: 3rem;
    }
    .leaderboard-button-container {
      margin: 1rem 0 3rem 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    .main-container {
      padding: 3rem 1.5rem 0 1.5rem;
    }
    .blue-bg {
      padding-top: 60px;
    }
  }
`;
