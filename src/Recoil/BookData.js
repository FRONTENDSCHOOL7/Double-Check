import { selector } from 'recoil';
import axios from 'axios';

// 베스트 셀러 데이터를 가져오는 셀렉터
export const fetchBestsellersData = selector({
  key: 'fetchBestsellersData',
  get: async () => {
    try {
      const response = await axios.get('http://localhost:8080/bestseller');
      return response.data; // 베스트 셀러 데이터 반환
    } catch (error) {
      console.error('베스트 셀러 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});

// 신간 도서 데이터를 가져오는 셀렉터
export const fetchNewBooksData = selector({
  key: 'fetchNewBooksData',
  get: async () => {
    try {
      const response = await axios.get('http://localhost:8080/newBooks');
      return response.data; // 신간 도서 데이터 반환
    } catch (error) {
      console.error('신간 도서 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});

// 이번달 주목할 만한 도서 데이터를 가져오는 셀렉터
export const fetchNewBookSpecialData = selector({
  key: 'fetchNewBookSpecialData',
  get: async () => {
    try {
      const response = await axios.get('http://localhost:8080/NewBookSpecial');
      return response.data; // 이번달 주목할 만한 도서 데이터 반환
    } catch (error) {
      console.error('이번달 주목할 만한 도서 데이터를 불러오는 중 오류 발생:', error);
      throw error;
    }
  },
});
