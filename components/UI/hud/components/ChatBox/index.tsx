import { useState, useEffect } from 'react';
import { ChatIcon, ChatIconHalloween, CitaadelIcon, CitaadelIconHalloween } from 'assets';
import { Tabs } from 'components/UI/elements';
import { ChatModal } from './ChatModal';
import { ChatToggle } from './ChatToggle';
import { ChatWindow } from 'components/UI/widgets/ChatWindow';
import { useRealm } from 'contexts/RealmContext';
import { usePhaser } from 'contexts/PhaserContext';
import { useGame } from 'contexts/GameContext';

type ChatRooms = 'LOCAL' | 'GLOBAL';

export const ChatBox = (): JSX.Element => {
  const [{ currentDistrict }] = useRealm();
  const [{ gameConfig }] = useGame();

  const [open, setOpen] = useState(false);
  const [{ toggleChat }, dispatch] = usePhaser();
  const [currentChat, setCurrentChat] = useState<ChatRooms>('LOCAL');

  const handleOpen = () => {
    setOpen(true);
    dispatch({
      type: 'TOGGLE_CHAT',
      toggleChat: true,
    });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: 'TOGGLE_CHAT',
      toggleChat: false,
    });
  };

  useEffect(() => {
    setOpen(toggleChat);
  }, [toggleChat]);

  return (
    <>
      <ChatToggle hide={open} onClick={handleOpen} />
      <ChatModal open={open} onClose={handleClose}>
        <Tabs
          options={[
            {
              value: 'LOCAL',
              icon: gameConfig.gotchiverseTheme === 'halloween' ? ChatIconHalloween : ChatIcon,
              name: `District ${currentDistrict}` || 'Local',
            },
            { value: 'GLOBAL', icon: gameConfig.gotchiverseTheme === 'halloween' ? CitaadelIconHalloween : CitaadelIcon, name: 'Citaadel' },
          ]}
          onSelect={(e) => setCurrentChat(e as ChatRooms)}
          currentOption={currentChat}
        />
        <ChatWindow channel={currentChat} open={open} />
      </ChatModal>
    </>
  );
};
