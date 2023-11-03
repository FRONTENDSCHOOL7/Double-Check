import { atom } from 'recoil';

export const modalIsOpenAtom = atom({
  key: 'modalIsOpen',
  default: false,
});

export const modalState = atom({
  key: 'modalState', // 고유한 키
  default: {
    isModalVisible: false,
    showModal: false,
    showReportModal: false,
    currentItemId: null,
  },
});
