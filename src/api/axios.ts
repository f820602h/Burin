import Qs from "qs";
import {
  AxiosRequestor,
  type RequestInterceptor,
  type ResponseInterceptor,
} from "./AxiosRequestor";
import { addPending, removePending } from "./axiosCancel";

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
    return error;
  },
};

const errorHandlerResponseInterceptor: ResponseInterceptor = {
  onRejected: (error) => {
    if (error.response) {
      const { status, config } = error.response;
      switch (status) {
        case 400:
          break;

        // 沒登入
        case 401:
          break;

        // 沒有權限
        case 403:
          break;

        // 500: 伺服器異常
        case 500:
          break;

        default:
          console.log(`response 沒有攔截到的錯誤：${config.url}`);
      }
    }
    return error;
  },
};

export const BaseAxiosRequestor: AxiosRequestor = new AxiosRequestor({
  baseURL: `https://${import.meta.env.VITE_API_DOMAIN_URL}/`,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
  timeout: 60000,
  reqInterceptors: [cancelDuplicateRequestInterceptor],
  resInterceptors: [
    removeCancelResponseInterceptor,
    errorHandlerResponseInterceptor,
  ],
});
