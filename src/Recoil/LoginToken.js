import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginToken = atom({
  key: 'loginToken',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
