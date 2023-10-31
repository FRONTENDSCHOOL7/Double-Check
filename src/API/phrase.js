/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */

import { authInstance } from './Instance';

export const phraseUpload = async (productData, token) => {
  try {
    const response = await authInstance.post('/product', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPhraseList = async ({ pageParam = 0 }) => {
  const skip = pageParam * 100;
  try {
    const response = await authInstance.get(`/product?limit=200&skip=${skip}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
