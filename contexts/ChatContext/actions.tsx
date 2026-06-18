import { convertInlineSVGToBlobURL } from 'helpers/aavegotchi';
import { aavegotchiSvgSubgraph } from 'shared_code/web3/shared.const.web3';
import { ChatEvent, ChatRoomEvent, SuperChatEvent } from 'types';
import { useSubgraph } from 'web3/subgraph';
import { getAavegotchiSvgs } from 'web3/subgraph/queries';
import { Action } from './reducer';
import GameController from '../../components/controllers/GameController';
import _ from 'lodash';
import { getRandomId } from 'contexts/NotificationContext/actions';

export const postChatMessage = (message: string): void => {
  GameController.sendData('chat', null, { action: 'post', message });
};

export const postBubbleChatMessage = (message: string): void => {
  GameController.sendData('bubble-chat', null, { message: message, state: false });
};

export const postBubbleChatTyping = (state: boolean): void => {
  GameController.sendData('bubble-chat', null, { state });
};

export const unsubscribeToChatChannels = (): void => {
  GameController.sendData('chat', null, { action: 'unsubscribe' });
};

export const subscribeToChatChannel = (channel: 'LOCAL' | 'GLOBAL'): void => {
  GameController.sendData('chat', null, { action: 'subscribe', channel: channel.toLowerCase() });
};
export const handleChatEvent = (data: ChatEvent | ChatRoomEvent | SuperChatEvent, dispatch: React.Dispatch<Action>): void => {
  if (data.channel === 'superchat') {
    data = _.assign(data, { chatId: getRandomId() });
    _.delay(() => {
      dispatch({
        type: 'REMOVE_SUPER_CHAT_EVENT',
        chatEvent: data as SuperChatEvent,
      });
    }, 10000);

    dispatch({
      type: 'PUSH_SUPER_CHAT_EVENT',
      chatEvent: data as SuperChatEvent,
    });
  } else if (data.channel === 'global') {
    dispatch({
      type: 'PUSH_GLOBAL_CHAT_EVENT',
      chatEvent: data,
    });
  } else {
    dispatch({
      type: 'PUSH_LOCAL_CHAT_EVENT',
      chatEvent: data,
    });
  }
};

export const updateGotchiImgs = async (
  ids: string[],
  currentState: Array<{ img: string; id: string }>,
  dispatch: React.Dispatch<Action>,
): Promise<void> => {
  const noImgs = ids.filter((id) => !currentState.some((gotchi) => gotchi.id === id));
  const query = getAavegotchiSvgs(noImgs);
  const res = await useSubgraph<{ aavegotchis: Array<{ id: string; svg: string }> }>(query, aavegotchiSvgSubgraph);

  if (res.aavegotchis) {
    const gotchiImgs = {};
    res.aavegotchis.forEach((gotchi) => {
      gotchiImgs[gotchi.id] = { img: convertInlineSVGToBlobURL(gotchi.svg), id: gotchi.id };
    });
    dispatch({
      type: 'PUSH_GOTCHI_IMGS',
      gotchiImgs: gotchiImgs,
    });
  }
};
