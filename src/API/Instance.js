/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const BASE_URL = 'https://api.mandarin.weniv.co.kr';

// 인증이 필요없는 요청
export const unauthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// 인증이 필요한 요청
export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
  return localStorage.getItem('userToken');
};

authInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);
