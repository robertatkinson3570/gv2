import { useSettings } from 'contexts/SettingsContext';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';

export default function useAavegotchiSound(): { [key: string]: () => void } {
  const [{ allowSound }] = useSettings();

  const [sounds, setSounds] = useState<{ [key: string]: Howl }>();

  const howlSound = (src: string, volume: number) => {
    const opts = {
      src: src,
      volume: volume,
      preload: false,
      autoplay: true,
    };
    return new Howl(opts);
  };

  useEffect(() => {
    setSounds({
      back: howlSound('/sounds/pop.mp3', 1),
      click: howlSound('/sounds/click.mp3', 1),
      success: howlSound('/sounds/success.mp3', 0.8),
      sending: howlSound('/sounds/sending.mp3', 0.8),
      send: howlSound('/sounds/send.mp3', 0.5),
      oopsClick: howlSound('/sounds/oops.mp3', 0.6),
      portalOpen: howlSound('/sounds/portalOpen.mp3', 0.5),
      oops: howlSound('/sounds/oops.mp3', 0.6),
      playOn: howlSound('/sounds/boop.mp3', 0.5),
      craft: howlSound('/sounds/craft_crafting.mp3', 1),
      craftSuccess: howlSound('/sounds/craft_success.mp3', 1),
      craftError: howlSound('/sounds/craft_fail.mp3', 1),
      alchemicaDeposited: howlSound('/sounds/alchemica_deposited.mp3', 1),
    });
  }, []);

  const tryPlay = (sound?: Howl) => {
    if (allowSound) {
      if (!sound) return;
      if (sound.state() === 'unloaded') sound.load();
      else sound.play();
    }
  };

  return {
    back: () => tryPlay(sounds?.back),
    click: () => tryPlay(sounds?.click),
    success: () => tryPlay(sounds?.success),
    sending: () => tryPlay(sounds?.sending),
    send: () => () => tryPlay(sounds?.send),
    oopsClick: () => tryPlay(sounds?.oopsClick),
    portalOpen: () => tryPlay(sounds?.portalOpen),
    oops: () => tryPlay(sounds?.oops),
    playOn: () => tryPlay(sounds?.playOn),
    craft: () => tryPlay(sounds?.craft),
    craftSuccess: () => tryPlay(sounds?.craftSuccess),
    craftError: () => tryPlay(sounds?.craftError),
    alchemicaDeposited: () => tryPlay(sounds?.alchemicaDeposited),
  };
}
