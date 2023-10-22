import { atom } from 'recoil';

export const usernameState = atom({
  key: 'username',
  default: '',
});

export const emailState = atom({
  key: 'email',
  default: '',
});

export const passwordState = atom({
  key: 'password',
  default: '',
});

export const accountnameState = atom({
  key: 'accountname',
  default: '',
});

export const imgSrcState = atom({
  key: 'https://api.mandarin.weniv.co.kr/Ellipse.png',
  default: '',
});

export const introState = atom({
  key: 'intro',
  default: '',
});

export const pageState = atom({
  key: 'page',
  default: true,
});

export const infoState = atom({
  key: 'info',
  default: '',
});

export const emailValidState = atom({
  key: 'emailValid',
  default: false,
});
