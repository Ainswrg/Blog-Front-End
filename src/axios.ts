/* eslint-disable no-param-reassign */
import axios from "axios";
import { Routers } from "./ts/enum";
import { getTokenLocalStorage } from "./utils";

const instance = axios.create({
  baseURL: Routers.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokenLocalStorage();
    if (!token) throw new Error("Token is required field!");
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
