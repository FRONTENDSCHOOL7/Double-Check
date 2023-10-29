/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */

import { authInstance } from './Instance';

export const phraseAPI = async (productData, token) => {
  try {
    const response = await authInstance.post('/product', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPhraseListAPI = async ({ pageParam = 0 }) => {
  const skip = pageParam * 30;
  try {
    const response = await authInstance.get(`/product?limit=30&skip=${skip}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getPhraseListAPI = async ({ skip }) => {
//   try {
//     const response = await authInstance.get(`/product?limit=10&skip=${skip}`);
//     const { product } = response.data;

//     return {
//       data: product,
//       nextPage: skip,
//       isLast: product.length < 10,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };
