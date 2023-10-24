/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
// 인증이 필요없는 요청(ex. 로그인이 필요 없는 경우)
import axios from "axios";
import { authInstance, unauthInstance } from "./Instance";

// 인증이 필요없는 요청
export const signUpAPI = async (signUpData) => {
  const response = await unauthInstance.post("/user", signUpData);
  try {
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const loginAPI = async (loginData) => {
  const response = await unauthInstance.post("/user/login");
  try {
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 인증이 필요한 요청(토큰)
export const myInfo = async (token) => {
  const response = await authInstance.get("/user/myinfo");
  try {
    response.data;
  } catch (error) {
    throw error;
  }
};

export const emailValid = async (email) => {
  const response = await unauthInstance.post("/user/emailvalid");
  try {
    response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const accountnameValid = async (accountname) => {
  const response = await unauthInstance.post("/user/accountnamevalid");
  try {
    response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
