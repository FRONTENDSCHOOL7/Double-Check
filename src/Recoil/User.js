/* eslint-disable no-unused-vars */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginCheck = atom({
  key: "loginCheck",
  default: false,
  deffects_UNSTABLE: [persistAtom],
});

export const loginToken = atom({
  key: "loginToken",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// export const logoutCheck = atom({
//   key: "logoutCheck",
//   default: false,
//   effects_UNSTABLE: [persistAtom],
// });
