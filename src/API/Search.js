import { authInstance } from './Instance';

// 유저 검색
export const SearchAPI = async (token, keyword) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const resposne = await authInstance.get(`user/searchuser/?keyword=${keyword}`);
    return resposne.data;
  } catch (error) {
    throw error;
  }
};
