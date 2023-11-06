import { authInstance } from './Instance';

export const likeAPI = async (token, id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authInstance.post(`/post/${id}/heart`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelLikeAPI = async (token, id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authInstance.delete(`/post/${id}/unheart`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
