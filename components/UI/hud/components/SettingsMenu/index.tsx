import { SettingsIcon, SoundIcon, MusicIcon, SoundOffIcon, MusicOffIcon } from 'assets';
import { DropdownMenu } from 'components/UI/elements';
import styles from './styles';
import Image from 'next/image';
import SFXController from 'components/controllers/SFXController';
import { useSettings } from 'contexts/SettingsContext';
import useAavegotchiSound from 'hooks/useAavegotchiSound';

export const SettingsMenu = (): JSX.Element => {
  const { click } = useAavegotchiSound();
  const [{ allowMusic, allowSound }] = useSettings();

  const hanleToggle = (type: 'MUSIC' | 'FX', e): void => {
    e.stopPropagation();
    SFXController.toggleSettings(type);
    click();
  };

  return (
    <>
      <DropdownMenu icon={SettingsIcon} secondaryColor>
        <div className={`settings-option ${!allowMusic ? 'off' : ''}`} onClick={(e) => hanleToggle('MUSIC', e)}>
          <Image alt="" src={allowMusic ? MusicIcon : MusicOffIcon} />
        </div>
        <div className={`settings-option ${!allowSound ? 'off' : ''}`} onClick={(e) => hanleToggle('FX', e)}>
          <Image alt="" src={allowSound ? SoundIcon : SoundOffIcon} />
        </div>
      </DropdownMenu>
      <style jsx>{styles}</style>
    </>
  );
};
