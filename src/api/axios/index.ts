import Qs from "qs";
import {
  AxiosRequestor,
  type RequestInterceptor,
  type ResponseInterceptor,
} from "./types";
import { addPending, removePending } from "./cancel";

const cancelDuplicateRequestInterceptor: RequestInterceptor = {
  onFulfilled: (config) => {
    removePending(config);
    addPending(config);
    return config;
  },
};

const removeCancelResponseInterceptor: ResponseInterceptor = {
  onFulfilled: (response) => {
    removePending(response);
    return response;
  },
  onRejected: (error) => {
    removePending(error.config);
    return Promise.reject(error);
  },
};

const errorHandlerResponseInterceptor: ResponseInterceptor = {
  onFulfilled: (response) => {
    return response;
  },
  onRejected: (error) => {
    if (error.response) {
      const { status, config, data } = error.response;
      switch (status) {
        // Unauthorized
        case 401:
          if (data?.err) Promise.reject(error);
          break;

        // Forbidden
        case 403:
          break;

        // Not Found
        case 404:
          break;

        // Server Error
        case 500:
          break;

        default:
          console.log(`response 沒有攔截到的錯誤：${config.url}`);
      }
    }
    return Promise.reject(error);
  },
};

export const BaseAxiosRequestor: AxiosRequestor = new AxiosRequestor({
  baseURL: `http://${import.meta.env.VITE_API_DOMAIN_URL}/`,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
  timeout: 60000,
  withCredentials: true,
  showLoading: false,
  reqInterceptors: [cancelDuplicateRequestInterceptor],
  resInterceptors: [
    removeCancelResponseInterceptor,
    errorHandlerResponseInterceptor,
  ],
});
