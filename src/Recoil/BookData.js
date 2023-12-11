import { selector } from 'recoil';
import axios from 'axios';

export const fetchBestsellersData = selector({
  key: 'fetchBestsellersData',
  get: async () => {
    try {
      const response = await axios.get('https://double-check.onrender.com/bestseller');
      return response.data;
    } catch (error) {
      console.error('베스트 셀러 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});

export const fetchNewBooksData = selector({
  key: 'fetchNewBooksData',
  get: async () => {
    try {
      const response = await axios.get('https://double-check.onrender.com/newbooks');
      return response.data;
    } catch (error) {
      console.error('신간 도서 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});

export const fetchNewBookSpecialData = selector({
  key: 'fetchNewBookSpecialData',
  get: async () => {
    try {
      const response = await axios.get('https://double-check.onrender.com/special');
      return response.data;
    } catch (error) {
      console.error('이번달 주목할 만한 도서 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});
