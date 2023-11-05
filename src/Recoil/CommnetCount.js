import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage, // 로컬스토리지 저장
});

export const commentCount = atom({
  key: 'commentCount',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
