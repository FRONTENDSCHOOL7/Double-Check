import { atom } from 'recoil';

export const viewState = atom({
  key: 'viewState',
  default: 'feed',
});
