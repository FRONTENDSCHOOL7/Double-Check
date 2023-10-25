/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
// 인증이 필요없는 요청(ex. 로그인이 필요 없는 경우)
import { authInstance, unauthInstance } from './Instance';

export const signUpAPI = async (signUpData) => {
  try {
    const response = await unauthInstance.post('/user', signUpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (loginData) => {
  try {
    const response = await unauthInstance.post('/user/login');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const myInfo = async (token) => {
  try {
    const response = await authInstance.get('/user/myinfo');
    response.data;
  } catch (error) {
    throw error;
  }
};

// 이메일 중복 검사
export const emailValid = async (email) => {
  const response = await unauthInstance.post('/user/emailvalid');
  try {
    response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

// 계정 ID 중복 검사
export const accountnameValid = async (accountname) => {
  const response = await unauthInstance.post('/user/accountnamevalid');
  try {
    response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
