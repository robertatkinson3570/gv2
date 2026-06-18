import css from 'styled-jsx/css';

export default css`
  .spawn-location {
    position: relative;
    border-radius: 1.2rem;
    padding: 2.5rem 0.8rem 9.8rem 0.8rem;
    box-sizing: border-box;
    background: radial-gradient(circle at 100% 100%, rgba(0, 60, 177, 1) 0, rgba(0, 60, 177, 1) 8px, transparent 8px) 0% 0%/12px 12px no-repeat,
      radial-gradient(circle at 0 100%, rgba(0, 60, 177, 1) 0, rgba(0, 60, 177, 1) 8px, transparent 8px) 100% 0%/12px 12px no-repeat,
      radial-gradient(circle at 100% 0, rgba(0, 60, 177, 1) 0, rgba(0, 60, 177, 1) 8px, transparent 8px) 0% 100%/12px 12px no-repeat,
      radial-gradient(circle at 0 0, rgba(0, 60, 177, 1) 0, rgba(0, 60, 177, 1) 8px, transparent 8px) 100% 100%/12px 12px no-repeat,
      linear-gradient(rgba(0, 60, 177, 1), rgba(0, 60, 177, 1)) 50% 50% / calc(100% - 8px) calc(100% - 24px) no-repeat,
      linear-gradient(rgba(0, 60, 177, 1), rgba(0, 60, 177, 1)) 50% 50% / calc(100% - 24px) calc(100% - 8px) no-repeat,
      linear-gradient(0deg, #008cab 20%, #00bfe9 100%);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  .label {
    font-size: 1.8rem;
    font-family: 'Kimberley Rg';
    border-radius: 0.4rem;
    padding: 0.2rem 1rem;
    display: inline-block;
    transform: translateY(-40%);
    z-index: 20;
  }

  button.cta-change {
    background: none;
    border: none;
    color: var(--col-info-800);
    padding-right: 1rem;
  }

  .spawn-location.parcel .label {
    color: var(--col-white);
    background: linear-gradient(0, #0085be 0%, #00bae3 100%);
    border: 0.3rem solid #00bae3;
  }
  .spawn-location.event .label {
    color: var(--col-black);
    background: linear-gradient(0, rgba(255, 162, 77, 0.7) 0%, rgba(255, 230, 0, 0.7) 100%), linear-gradient(180deg, #ffbe5c 0%, #ffe600 100%);
    border: 3px solid rgba(255, 255, 255, 0.4);
  }

  .detail-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    gap: 1.5rem;
  }

  .img-container {
    position: relative;
    border-radius: 0.2rem;
    border: 2px solid var(--col-info-border);
  }

  .img-container.parcel-banner {
    width: 6.5rem;
    height: 6.5rem;
    flex: 0 0 6.5rem;
  }
  .img-container.event-banner {
    width: 11rem;
    height: 6rem;
    flex: 0 0 11rem;
  }

  .labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    flex-grow: 1;
  }

  .spawn-location-name-container {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    justify-content: space-between;
  }
  .spawn-location-name {
    font-size: 2.6rem;
    line-height: 1em;
    text-transform: capitalize;
    max-width: 25rem;
  }

  .spawn-location-addr {
    display: flex;
    gap: 1rem;
    font-size: 2.2rem;
    width: fit-content;
    align-items: center;
  }
  .spawn-location.event .spawn-location-addr {
    flex-direction: row-reverse;
  }

  .event .spawn-location-district {
    color: var(--col-pink-350);
  }
  .parcel .spawn-location-district {
    color: var(--col-info-800);
  }
  .spawn-location-id {
    color: var(--col-grey-200);
  }
  @media (max-width: 1199px) {
    .spawn-location-name {
      max-width: 20rem;
    }
  }
`;
