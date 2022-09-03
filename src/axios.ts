/* eslint-disable no-param-reassign */
import axios from "axios";
import { getTokenLocalStorage } from "./utils";
import { constants } from "./utils/const";

const instance = axios.create({
  baseURL: constants.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokenLocalStorage();
    config.headers = {
      Authorization: token ?? "",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
