/* eslint-disable no-useless-catch */
import axios from 'axios';

const IMAGE_URL = 'https://api.mandarin.weniv.co.kr/image/uploadfile';
export const ImageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(IMAGE_URL, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
