/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = "https://api.mandarin.weniv.co.kr";

export const unauthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
