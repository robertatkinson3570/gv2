import { useState, useEffect, useRef } from 'react';
import { usePhaser } from 'contexts/PhaserContext';
import { useChat } from 'contexts/ChatContext';
import { postBubbleChatMessage, postBubbleChatTyping } from 'contexts/ChatContext/actions';
import { ChatBubbleIcon, ChatBubbleHalloweenIcon } from 'assets';
import { SendIcon } from 'components/UI/elements';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import Image from 'next/image';
import styles from './styles';
import { getThemeColor } from 'helpers/functions';
import { useGame } from 'contexts/GameContext';

const CHAR_LIMIT = 40;

export const ChatBar = (): JSX.Element => {
  const [{ toggleChat, toggleChatBar }, dispatch] = usePhaser();
  const [{ bigChatOpen }] = useChat();
  const [messageValue, setMessageValue] = useState('');
  const [remainingCharacters, setRemainingCharacters] = useState(CHAR_LIMIT);
  const valueRef = useRef<string>('');
  const focusRef = useRef(null);
  const [firstFocus, setFirstFocus] = useState(1);
  const [{ isTyping, sentMessage }, setIsTyping] = useState({ isTyping: false, sentMessage: false });
  const firstRender = useRef(true);
  const { click, back } = useAavegotchiSound();
  const [{ gameConfig }] = useGame();

  const setFocused = (value: boolean) => {
    dispatch({
      type: 'UPDATE_DISABLE_KEYBOARD',
      disableKeyboard: value,
    });
  };

  const updateTypingStatus = (message) => {
    if (message.length && !isTyping) {
      setIsTyping({ isTyping: true, sentMessage: false });
    } else if (!message.length && isTyping) {
      setIsTyping({ isTyping: false, sentMessage: false });
    }
  };

  const handleChange = (message) => {
    setMessageValue(message);
    setRemainingCharacters(CHAR_LIMIT - message.length);
    updateTypingStatus(message);
  };

  const reset = () => {
    setMessageValue('');
    setRemainingCharacters(CHAR_LIMIT);
    setIsTyping({ isTyping: false, sentMessage: false });
  };

  const submitMessage = () => {
    const message = valueRef.current;
    if (!message.trim()) return; // Don't send empty messages
    postBubbleChatMessage(message);
    reset();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && !e.shiftKey && !bigChatOpen) {
      e.preventDefault();
      submitMessage();
    }
  };

  const handleClick = () => {
    toggleChatBar ? back() : click();
    dispatch({
      type: 'TOGGLE_CHATBAR',
      toggleChatBar: !toggleChatBar,
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      // Prevent sending typing update when the chatbar loads
      firstRender.current = false;
      return;
    }
    if (sentMessage) return;
    postBubbleChatTyping(isTyping);
  }, [isTyping]);

  useEffect(() => {
    if (valueRef.current !== messageValue) {
      valueRef.current = messageValue;
    }
  }, [messageValue]);

  useEffect(() => {
    if (firstFocus) {
      // Prevent focusing on the chat bar when the component renders for the first time
      setFirstFocus(0);
      return;
    }
    setFocused(toggleChatBar);
    if (toggleChatBar) {
      setTimeout(() => {
        focusRef.current.focus();
      }, 100); // Need slight delay otherwise the B press will also type a b in the chat bar
    } else {
      reset();
    }
  }, [toggleChatBar]);

  useEffect(() => {
    // Remove text from chat bar when big chat is opened
    if (toggleChat) reset();
  }, [toggleChat]);
  const blockPropagation = (e) => e.stopPropagation();

  return (
    <>
      <div onClick={blockPropagation} onMouseDown={blockPropagation} className={gameConfig.gotchiverseTheme}>
        <div className={'clickable icon'} onClick={handleClick}>
          <Image alt="" src={gameConfig.gotchiverseTheme === 'halloween' ? ChatBubbleHalloweenIcon : ChatBubbleIcon} layout="fill" />
        </div>
        <div className={`input-container toggle-wrapper ${toggleChatBar ? '' : 'hide'}`}>
          <textarea
            className="input-text"
            maxLength={CHAR_LIMIT}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={messageValue}
            wrap="off"
            ref={focusRef}
          />
          <span className="remaining-chars-container">{remainingCharacters}</span>
          <button className="chat-action clickable" onClick={submitMessage}>
            <SendIcon fill="var(--col-pink-400)" size={20} />
          </button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
