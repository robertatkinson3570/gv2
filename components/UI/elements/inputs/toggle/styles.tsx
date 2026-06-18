import css from 'styled-jsx/css';

export default css`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 6em;
    height: 3.5em;
    font-size: 1rem;
    margin: 0;
    // border-radius: 0.5rem;
  }

  // .switch.active {
  //   box-shadow: 0 0 0.6em 0.1em var(--col-pink-border);
  // }
  // .info .switch.active {
  //   box-shadow: 0 0 0.6em 0.1em var(--col-blue-border);
  // }
  // .purple .switch.active {
  //   box-shadow: 0 0 0.6em 0.1em var(--col-purple-border);
  // }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: url('/cursors/pointer.png'), pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    opacity: 0.5;
    border: 0.2rem solid var(--col-pink-400);
    // border-radius: 0.4rem;
  }

  .info .slider {
    border: 0.2rem solid var(--col-info-400);
    // box-shadow: 0px 0px 0.4rem 0.2rem var(--col-blue-border);
  }
  .purple .slider {
    border: 0.2rem solid var(--col-purple-400);
    // box-shadow: 0px 0px 0.4rem 0.2rem var(--col-purple-border);
  }

  .switch.active .slider {
    // border-radius: 0.5rem;
  }

  .purple .switch.active .slider {
    background: rgba(131, 72, 255, 0.3);
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 2.5em;
    width: 2.5em;
    left: 0.3em;
    bottom: 0.3em;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    background-color: var(--col-pink-300);
    border-right: 0.3em solid var(--col-pink-500);
    border-bottom: 0.3em solid var(--col-pink-500);
    // border-radius: 2px;
  }

  .info .slider:before {
    background-color: var(--col-info-400);
    border-right: 0.45em solid var(--col-info-650);
    border-bottom: 0.45em solid var(--col-info-650);
  }
  .purple .slider:before {
    background-color: var(--col-purple-400);
    border-right: none;
    border-bottom: none;
  }

  .purple .switch.active .slider:before {
    background-color: var(--col-purple-300);
    border-right: 3px solid var(--col-purple-400);
    border-bottom: 3px solid var(--col-purple-400);
  }

  input:checked + .slider {
    opacity: 1;
  }

  input:focus + .slider {
    box-shadow: 0 0 0.1rem var(--col-pink-400);
  }

  .info input:focus + .info .slider {
    box-shadow: 0 0 0.1rem var(--col-info-400);
  }

  .purple input:focus + .info .slider {
    box-shadow: 0 0 0.1rem var(--col-purple-300);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(2.5em);
    -ms-transform: translateX(2.5em);
    transform: translateX(2.5em);
  }

  div.parcel {
    display: inline-flex;
  }

  .parcel > .switch {
    position: relative;
    display: inline-block;
    width: 7.4em;
    height: 4.2em;
    font-size: 1rem;
    margin: 0;
  }

  .parcel > .switch > input:checked + .slider:before {
    -webkit-transform: translateX(3.2em);
    -ms-transform: translateX(3.2em);
    transform: translateX(3.2em);
  }

  .parcel > .switch > .slider:before {
    position: absolute;
    content: '';
    height: 3.2em;
    width: 3.2em;
    left: 0.3em;
    bottom: 0.3em;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    background-color: var(--col-pink-400);
    border-radius: 0.2rem;
  }

  .info.parcel > .switch > .slider:before {
    background-color: var(--col-info-400);
  }
  .purple.parcel > .switch > .slider:before {
    background-color: var(--col-purple-400);
  }

  /************************************/
  /********* Halloween Style **********/
  /************************************/

  .halloween .switch.active {
    box-shadow: 0 0 0.6em 0.1em var(--col-halloween-border);
  }

  .halloween .slider {
    border: 0.2rem solid var(--col-halloween-400);
  }

  .halloween .slider:before {
    background-color: var(--col-halloween-300);
    border-right: 0.45em solid var(--col-halloween-500);
    border-bottom: 0.45em solid var(--col-halloween-500);
  }

  .halloween input:focus + .slider {
    box-shadow: 0 0 0.1rem var(--col-halloween-400);
  }

  .parcel.halloween > .switch > .slider:before {
    background-color: var(--col-halloween-400);
  }
`;
