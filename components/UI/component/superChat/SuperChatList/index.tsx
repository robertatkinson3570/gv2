import { useChat } from 'contexts/ChatContext';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { SuperChatEvent } from 'types';
// import { useEffect } from 'react';
import { SuperChatItem } from '../SuperChatItem';
import styles from './styles';

export const SuperChatList = (): JSX.Element => {
  const [{ superChatEvents }, chatDispatch] = useChat();

  const [displayedMessages, setDisplayedMessages] = useState<SuperChatEvent[]>();

  useEffect(() => {
    const displayedMessages = _.reverse([...superChatEvents]);
    setDisplayedMessages(displayedMessages);
  }, [superChatEvents]);

  return (
    <>
      {!!superChatEvents?.length && (
        <div className="super-chat-list">
          <h1 className="title">Super Chats</h1>
          {_.map(displayedMessages.slice(0, 5), (event, id) => (
            <div className="super-chat-item-wrapper" key={id}>
              <SuperChatItem event={event} />
            </div>
          ))}
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
};
