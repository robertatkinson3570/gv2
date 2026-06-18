import { BigNumber } from '@ethersproject/bignumber';
import type { AlchemicaBalance, GotchiverseAavegotchi, GotchiverseParcel, Installation, OngoingUpgrades } from 'types';

export interface State {
  ghstBalance: BigNumber;
  inventory?: Installation[];
  activeBrush?: number;
  alchemicaBalance?: AlchemicaBalance;
  gltrBalance?: number;
  maticBalance?: number;
  ownedParcels?: GotchiverseParcel[];
  userAavegotchis?: GotchiverseAavegotchi[];
  ongoingUpgrades?: OngoingUpgrades[];
  addresses?: string[];
  parcelAccessOwners?: string[];
  eventInitialFilter?: string;
  isVerified: boolean;
}

export const initialState: State = {
  ghstBalance: BigNumber.from(0),
  isVerified: false,
  parcelAccessOwners: [],
};
