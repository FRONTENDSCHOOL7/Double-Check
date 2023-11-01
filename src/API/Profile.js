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

//다른 유저프로필 정보
export const accountProfileAPI = async (accountname, token) => {
  try {
    const response = await authInstance.get(`/profile/${accountname}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 내 프로필 수정
export const setProfileAPI = async (profileData, token) => {
  try {
    const response = await authInstance.put(`/user`, profileData);
    return response.data;
  } catch (error) {
    console.error('프로필 수정 오류:', error);
    throw error;
  }
};
