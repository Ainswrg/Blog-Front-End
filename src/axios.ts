/* eslint-disable no-param-reassign */
import axios from "axios";
import { getTokenLocalStorage } from "./utils";

const instance = axios.create({
  baseURL: "http://localhost:4444",
});

instance.interceptors.request.use(
  (config) => {
    const token: string = getTokenLocalStorage();
    config.headers = {
      Authorization: token,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
