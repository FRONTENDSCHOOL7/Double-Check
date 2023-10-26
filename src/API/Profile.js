/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { authInstance } from './Instance';

// 내 프로필 정보
export const profileAPI = async (token) => {
  try {
    const resposne = await authInstance.get('user/myinfo');
    return resposne.data;
  } catch (error) {
    throw error;
  }
};
