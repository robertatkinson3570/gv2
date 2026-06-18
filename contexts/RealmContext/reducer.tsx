/* eslint-disable @typescript-eslint/indent */
import { State } from './store';

export type Action =
  | {
      type: 'UPDATE_SELECTED_PLAYER';
      selectedPlayer: State['selectedPlayer'];
      gotchiUrl: State['gotchiUrl'];
      backgroundColor: State['backgroundColor'];
      isAavegotchiLent: State['isAavegotchiLent'];
      escrow: State['escrow'];
      ownedParcels: State['ownedParcels'];
    }
  | { type: 'UPDATE_AAVEGOTCHIS'; aavegotchis: State['aavegotchis'] }
  | { type: 'UPDATE_AARENA_QUEUE'; aarenaQueue: State['aarenaQueue'] }
  | { type: 'UPDATE_ALCHEMICA'; alchemica: State['alchemica'] }
  | { type: 'UPDATE_PLAYER_WALLET'; playerWallet: State['playerWallet'] }
  | { type: 'UPDATE_CURRENT_DISTRICT'; currentDistrict: State['currentDistrict'] }
  | { type: 'UPDATE_CURRENT_PARCEL'; currentParcel: State['currentParcel'] }
  | { type: 'UPDATE_CHANNEL_ID'; lastChanneledId: State['lastChanneledId'] }
  | { type: 'UPDATE_GAME_ALERT'; gameAlert: State['gameAlert'] }
  | { type: 'UPDATE_PLAYERS_HEALTH'; health: number }
  | { type: 'UPDATE_WEAPON_TYPES'; leftWeapon: string; rightWeapon: string }
  | { type: 'UPDATE_EVENTS_LIST'; eventsList: State['eventsList'] }
  | { type: 'UPDATE_PLAYERS_AP'; AP: number }
  | { type: 'UPDATE_USER_QUICKSLOTS'; userQuickslots: State['userQuickslots'] }
  | {
      type: 'UPDATE_USER_TRAITS';
      userTraits: State['userTraits'];
      userTraitsBases: State['userTraitsBases'];
      userWearableTraitBonuses: State['userWearableTraitBonuses'];
    }
  | {
      type: 'UPDATE_ONCHAIN_WALLET';
      onChainWallet: State['onChainWallet'];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_AAVEGOTCHIS':
      return {
        ...state,
        aavegotchis: action.aavegotchis,
      };
    case 'UPDATE_AARENA_QUEUE':
      return {
        ...state,
        aarenaQueue: action.aarenaQueue,
      };
    case 'UPDATE_EVENTS_LIST':
      return {
        ...state,
        eventsList: action.eventsList,
      };
    case 'UPDATE_SELECTED_PLAYER':
      return {
        ...state,
        selectedPlayer: action.selectedPlayer,
        gotchiUrl: action.gotchiUrl,
        backgroundColor: action.backgroundColor,
        isAavegotchiLent: action.isAavegotchiLent,
        escrow: action.escrow,
        ownedParcels: action.ownedParcels,
      };

    case 'UPDATE_ALCHEMICA':
      return {
        ...state,
        alchemica: action.alchemica,
      };

    case 'UPDATE_PLAYER_WALLET':
      return {
        ...state,
        playerWallet: action.playerWallet,
      };
    case 'UPDATE_PLAYERS_HEALTH':
      return {
        ...state,
        health: action.health,
      };
    case 'UPDATE_WEAPON_TYPES':
      return {
        ...state,
        leftWeapon: action.leftWeapon,
        rightWeapon: action.rightWeapon,
      };
    case 'UPDATE_PLAYERS_AP':
      return {
        ...state,
        userTraits: {
          ...state.userTraits,
          ap: action.AP,
        },
      };
    case 'UPDATE_CURRENT_DISTRICT':
      return {
        ...state,
        currentDistrict: action.currentDistrict,
      };
    case 'UPDATE_CURRENT_PARCEL':
      return {
        ...state,
        currentParcel: action.currentParcel,
      };
    case 'UPDATE_CHANNEL_ID':
      return {
        ...state,
        lastChanneledId: action.lastChanneledId,
      };
    case 'UPDATE_GAME_ALERT':
      return {
        ...state,
        gameAlert: action.gameAlert,
      };
    case 'UPDATE_USER_TRAITS':
      return {
        ...state,
        userTraits: action.userTraits,
        userTraitsBases: action.userTraitsBases,
        userWearableTraitBonuses: action.userWearableTraitBonuses,
      };
    case 'UPDATE_USER_QUICKSLOTS':
      return {
        ...state,
        userQuickslots: action.userQuickslots,
      };
    case 'UPDATE_ONCHAIN_WALLET':
      return { ...state, onChainWallet: action.onChainWallet };
    default:
      return state;
  }
};
