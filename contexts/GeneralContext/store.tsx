export interface State {
  showAuthModal: boolean;
  volume: number;
  language: string;
}

export const initialState: State = {
  showAuthModal: false,
  volume: 0.5,
  language: 'en',
};
