import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//1. 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
// const { persistAtom } = recoilPersist();
const { persistAtom } = recoilPersist;

export const loginCheck = atom({
  key: 'loginCheck',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
