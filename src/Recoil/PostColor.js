import { atom, selector } from 'recoil';

// 컬러 상태를 저장할 atom 생성
export const colorState = atom({
  key: 'colorState',
  default: [
    ['#FFE7FF', '#E3EEFF'],
    '#F2F4FF',
    '#ccf0ff',
    ['#F1E4F1', '#F9F0DC'],
    '#f4f4f4',
    '#fff0f0',
    ['#DDF6FA', '#F9F0DC'],
    '#f9f0ff',
    ['#E3FDF5', '#FFE6FA'],
    '#f0f8ff',
    ['#ffecd2', '#fcb69f'],
    ['#fdfbfb', '#ebedee'],
    ['#e9defa', '#fbfcdb'],
  ],
});

// 계산된 컬러를 반환하는 selector 생성
export const calculatedColorState = selector({
  key: 'calculatedColorState',
  get: ({ get }) => {
    const colors = get(colorState);

    return (index) => {
      const colorIndex = index % colors.length;
      return colors[colorIndex];
    };
  },
});
