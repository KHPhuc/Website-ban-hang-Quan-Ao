import axios from "axios";
import store from "../store";
// import { refreshToken } from "./Auth/Auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401) {
      //   if (
      //     originalConfig.url !== "/auth/login" &&
      //     originalConfig.url !== "/auth/register" &&
      //     originalConfig.url !== "/auth/logout" &&
      //     originalConfig.url !== "/games/category" &&
      //     !arrLink.includes(originalConfig.url)
      //   ) {
      //     store.dispatch(refreshToken(-1));
      //   }
      //   return Promise.reject(err);
    }
    // else {
    //   return Promise.reject(err.response);
    // }
    // return err;
    return Promise.reject(err.response);
  }
);

export default api;
