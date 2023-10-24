import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//1. 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
const { persistAtom } = recoilPersist();

const loginCheck = atom({
  key: 'loginCheck',
  default: false,
  effects_UNSTABLE: [persistAtom], //Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
});

export { loginCheck };
