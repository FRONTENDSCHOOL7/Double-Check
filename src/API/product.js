/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */

import { authInstance } from './Instance';

export const productAPI = async (productData, token) => {
  try {
    const response = await authInstance.post('/product', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
