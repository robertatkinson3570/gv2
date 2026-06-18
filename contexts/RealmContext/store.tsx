import { SelectedPlayer, GotchiUrl, AlchemicaCounters, Parcel, RealmEvent, AlchemicaNumbers, QuickSlotItem, ParcelOwnerData } from 'types';

export interface State {
  aavegotchis?: SelectedPlayer[];
  selectedPlayer?: SelectedPlayer;
  gotchiUrl?: GotchiUrl;
  alchemica?: AlchemicaCounters;
  playerWallet?: AlchemicaNumbers;
  onChainWallet?: AlchemicaNumbers;
  backgroundColor?: string;
  isAavegotchiLent?: boolean;
  escrow?: string;
  ownedParcels?: Parcel[];
  currentDistrict?: number;
  currentParcel?: ParcelOwnerData;
  gameAlert?: string;
  lastChanneledId?: number;
  health: number;
  eventsList: RealmEvent[];
  leftWeapon?: string;
  rightWeapon?: string;

  aarenaQueue?: {
    state: boolean;
    status?: 'queued' | 'approved' | 'aborted';
    meta?: { position: number; size: number };
  };
  userTraits?: {
    alchemicaCarryingCapacity: number;
    maxHealth: number;
    ap: number;
    maxAP: number;
    defense: number;
    evasion: number;
    luck: number;
    speed: number;
    melee: number;
    range: number;
    regen: number;
    apRegenAmount: number;
    healthRegenAmount: number;
  };
  userTraitsBases?: {
    alchemicaCarryingCapacity: number;
    maxHealth: number;
    ap: number;
    maxAP: number;
    defense: number;
    evasion: number;
    luck: number;
    speed: number;
    melee: number;
    range: number;
  };
  userWearableTraitBonuses?: {
    alchemicaCarryingCapacity?: number;
    maxHealth?: number;
    ap?: number;
    maxAP?: number;
    defense?: number;
    evasion?: number;
    luck?: number;
    speed?: number;
    melee?: number;
    range?: number;
    regen?: number;
    apRegenAmount?: number;
    healthRegenAmount?: number;
  };

  userQuickslots?: QuickSlotItem[];
}

export const initialState: State = {
  isAavegotchiLent: false,
  eventsList: [],
  aarenaQueue: { state: false },
  health: 1000,
  playerWallet: { fud: 0, fomo: 0, alpha: 0, kek: 0 },
  onChainWallet: { fud: 0, fomo: 0, alpha: 0, kek: 0 },
};
