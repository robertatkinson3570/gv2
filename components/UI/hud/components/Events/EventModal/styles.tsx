import css from 'styled-jsx/css';

export default css`
  .events-container {
    padding: 0rem 5.4rem 1.6rem;
  }
  .alchemica-balances {
    width: 61rem;
    height: 8.4rem;
    margin-top: 1.8rem;
    margin-left: auto;
    margin-right: auto;
  }
  .config-panel {
    display: flex;
    gap: 4.8rem;
    margin-top: 4rem;
  }
  .event-image-container {
    width: 41rem;
  }
  .logo-wrapper {
    position: relative;
    border: 3px solid var(--col-pink-border);
    border-radius: 2px;
    height: 19rem;
  }
  .edit-icon-wrapper {
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;
    width: 5rem;
    height: 5rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(40, 27, 37, 0.9), rgba(40, 27, 37, 0.9));
    cursor: url('/cursors/pointer.png'), pointer;
    z-index: 100;
  }
  .add-image {
    text-align: center;
    color: var(--col-pink-400);
    font-size: 3.2rem;
    line-height: 2.4rem;
    margin-top: -2rem;
    text-transform: uppercase;
  }
  .add-image .file-size {
    font-size: 2.6rem;
    padding-top: 0.4rem;
    text-transform: none;
  }
  .upload-logo-wrapper {
    position: relative;
    width: 14rem;
    height: 12rem;
  }
  .parcel-container {
    background: linear-gradient(0, rgba(200, 42, 194, 0.105) 22.92%, rgba(200, 42, 194, 0.425) 82.34%);
    padding: 1rem 1.6rem 1.6rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }
  .parcel-image-wrapper {
    border: 2px solid var(--col-pink-border);
    border-radius: 2px;
    font-size: 1rem;
  }
  .parcel-name {
    font-size: 2.8rem;
    line-height: 2rem;
    color: var(--col-pink-200);
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    text-transform: capitalize;
  }
  .parcel-id {
    font-size: 2.4rem;
    line-height: 2.2rem;
    color: var(--col-white);
  }
  .buttons-container {
    display: flex;
    margin-top: 6.4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .main-button {
    width: 32rem;
  }
  .cancel-button {
    height: 3rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .cancel-button span {
    font-size: 2.6rem;
    color: var(--col-white);
  }
  .cancel-button.disabled span {
    color: var(--col-grey-400);
  }
  .event-name-wrapper {
    display: flex;
    align-items: center;
    width: 64rem;
    min-height: 4rem;
    gap: 1rem;
  }
  .event-name {
    width: 55rem;
    color: var(--col-pink-200);
    font-size: 4rem;
    line-height: 3rem;
    text-transform: uppercase;
    flex-grow: 1;
  }
  .event-name-input {
    width: 100%;
    border: 2px solid var(--col-pink-border);
    background: transparent;
    color: var(--col-pink-200);
    font-size: 2.8rem;
    line-height: 2.6rem;
    padding: 0.5rem 0.8rem;
    padding-right: 0rem;
  }
  .event-name-input::-webkit-input-placeholder {
    vertical-align: middle;
    opacity: 0.4;
    color: var(--col-pink-200);
    padding-left: 0.8rem;
  }
  .event-name-input:focus {
    outline: none;
    box-shadow: 0 0 4px 2px var(--col-pink-400);
  }
  .copy-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 8rem;
  }
  .link-copied {
    font-size: 1.8rem;
    line-height: 1.7rem;
    color: var(--col-pink-400);
  }
  .options-wrapper {
    display: flex;
    gap: 4.8rem;
    margin-top: 1.9rem;
  }

  .duration-container {
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }
  .option-header {
    min-width: 18rem;
    margin-bottom: 2rem;
  }
  .option-header .header {
    color: var(--col-pink-200);
    font-size: 2.8rem;
    line-height: 2.6rem;
  }
  .option-header .header.pp {
    width: 18rem;
  }
  .header {
    margin-left: 0.2rem;
  }

  .option-header .value {
    background: linear-gradient(0, rgba(229, 47, 223, 0.2205) 22.92%, rgba(229, 47, 223, 0.45) 82.74%);
    text-align: center;
    font-size: 3.6rem;
    line-height: 3.3rem;
    text-transform: uppercase;
    color: var(--col-white);
  }

  .value {
    height: 4rem;
    padding: 0 0.5rem;
  }
  .value.duration {
    min-width: 4.2rem;
  }

  .value.pp {
    min-width: 11.8rem;
    height: 4rem;
    margin-left: 0.7rem;
  }
  .option .increase {
    font-size: 2rem;
    line-height: 1.9rem;
    color: var(--col-white);
    padding-bottom: 0.8rem;
  }
  .increase-with-gltr {
    width: 16rem;
  }
  .gltr-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    border: 2px solid var(--col-pink-border);
    border-bottom: none;
    padding: 0.8rem 0rem;
  }
  .gltr-icon-wrapper {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }
  .gltr-value {
    font-size: 3.2rem;
    line-height: 3rem;
    color: var(--col-pink-400);
  }
  .inc-button {
    background: var(--col-pink-400);
    border-top: 0.6rem solid var(--col-pink-300);
    border-left: none;
    border-right: 0.6rem solid var(--col-pink-500);
    border-bottom: 0.6rem solid var(--col-pink-500);
    text-align: center;
    cursor: url('/cursors/pointer.png'), pointer;
    user-select: none;
  }
  .inc-button:active {
    background: var(--col-pink-500);
    border-top-color: var(--col-pink-600);
    border-right-color: var(--col-pink-400);
    border-bottom-color: var(--col-pink-400);
  }
  .inc-button:disabled {
    background: var(--col-grey-500);
    border-top-color: var(--col-grey-600);
    border-right-color: var(--col-grey-400);
    border-bottom-color: var(--col-grey-400);
  }
  .duration-counter {
    width: 100%;
    border: 1px solid var(--col-pink-border);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .duration-counter .hour {
    font-size: 2.6rem;
    line-height: 1;
    flex-grow: 1;
    text-align: center;
    border: none;
    background: none;
    color: white;
    max-width: 50%;
  }
  .duration-counter .hour-input {
    text-align: center;
    border: none;
    background: none;
    color: white;
    max-width: 50%;
  }

  .duration-counter .hour-input:focus {
    outline: none;
  }
  .inc-duration {
    font-size: 2.6rem;
    line-height: 2.4rem;
    color: var(--col-white);
    width: 4.4rem;
    padding-top: 0rem;
    padding-bottom: 0.4rem;
  }
  .inc-pp {
    font-size: 2.4rem;
    line-height: 1;
    color: var(--col-white);
    width: 7rem;
    padding: 0rem;
    padding-bottom: 0.3rem;
    padding-top: 0.1rem;
  }
  .inc-alchemica-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 1.2rem;
    min-width: 35rem;
  }
  .inc-alchemica {
    display: flex;
    flex-direction: row;
  }
  .alchemica-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    border: 0.2rem solid var(--col-pink-border);
    border-right: none;
    padding-left: 0.2rem;
    width: 8rem;
    padding: 0 0.5rem;
  }
  .reset-alchemica {
    color: var(--col-pink-400);
    font-weight: 600;
    font-size: 3rem;
    line-height: 1;
    padding-left: 0.4rem;
    cursor: url('/cursors/pointer.png'), pointer;
  }
  .reset-alchemica:active {
    font-size: 3.4rem;
  }
  .alchemica-icon-wrapper {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
  }
  .alchemica-container .alchemica-value {
    font-size: 3rem;
    line-height: 2.8rem;
    color: var(--col-white);
    color: white;
    flex: 1;
    width: 3rem;
  }
  .input-clear {
    background: none;
    color: white;
    border: none;
  }
  .input-clear:focus {
    outline: none;
    box-shadow: 0 0 4px 2px var(--col-pink-400);
  }
  .notification {
    margin-top: 0.8rem;
    font-size: 2.4rem;
    line-height: 2.2rem;
    color: var(--col-white);
  }
  .notification span {
    font-size: 2.8rem;
    line-height: 2.6rem;
    color: var(--col-pink-200);
  }

  /**********************************/
  /********  Halloween Style ********/
  /**********************************/

  .halloween .logo-wrapper {
    border: 3px solid var(--col-halloween-border);
  }

  .halloween .add-image {
    color: var(--col-halloween-400);
  }

  .halloween .parcel-container {
    background: linear-gradient(0, rgba(231, 94, 17, 0.105) 22.92%, rgba(231, 94, 17, 0.425) 82.34%);
  }

  .halloween .parcel-image-wrapper {
    border: 2px solid var(--col-halloween-border);
  }

  .halloween .parcel-name {
    color: var(--col-halloween-200);
  }

  .halloween .event-name {
    color: var(--col-halloween-200);
  }

  .halloween .event-name-input {
    border: 2px solid var(--col-halloween-border);
    color: var(--col-halloween-200);
  }

  .halloween .event-name-input::-webkit-input-placeholder {
    color: var(--col-halloween-200);
  }

  .halloween .event-name-input:focus {
    box-shadow: 0 0 4px 2px var(--col-halloween-400);
  }

  .halloween .option-header .header {
    color: var(--col-halloween-200);
  }

  .halloween .gltr-container {
    border: 2px solid var(--col-halloween-border);
  }

  .halloween .gltr-value {
    color: var(--col-halloween-400);
  }

  .halloween .inc-button {
    background: var(--col-halloween-400);
    border-top: 0.6rem solid var(--col-halloween-300);
    border-right: 0.6rem solid var(--col-halloween-500);
    border-bottom: 0.6rem solid var(--col-halloween-500);
  }

  .halloween .inc-button:active {
    background: var(--col-halloween-500);
    border-top-color: var(--col-halloween-600);
    border-right-color: var(--col-halloween-400);
    border-bottom-color: var(--col-halloween-400);
  }

  .halloween .duration-counter {
    border: 1px solid var(--col-halloween-border);
  }

  .halloween .alchemica-container {
    border: 0.2rem solid var(--col-halloween-border);
  }

  .halloween .reset-alchemica {
    color: var(--col-halloween-400);
  }

  .halloween .input-clear:focus {
    box-shadow: 0 0 4px 2px var(--col-halloween-400);
  }

  .halloween .notification span {
    color: var(--col-halloween-200);
  }

  .create-done-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: linear-gradient(to top, rgba(200, 42, 194, 0.0945) 22.92%, rgba(200, 42, 194, 0.3825) 82.34%);
    border-top: 4px solid;
    border-image: radial-gradient(50% 1000% at 50% 99.92%, #c82ac2 0%, rgba(200, 42, 194, 0.4) 100%) 1;

    margin-top: 4rem;
    width: 100%;
    height: 20rem;
    opacity: 0.95;
  }
  .congrats-container {
    font-size: 4rem;
    line-height: 3.6rem;
    color: var(--col-white);
    text-align: center;
  }
  .congrats-container .heading {
    text-transform: uppercase;
  }
  .congrats-container .message {
    font-size: 3.6rem;
    line-height: 4rem;
  }
  .share-link-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 1rem;
  }
  .share-link-container .share {
    font-size: 3.2rem;
    line-height: 3.6rem;
    color: var(--col-pink-200);
  }
`;
