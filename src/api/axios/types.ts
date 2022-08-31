import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useLoadingStore } from "@/stores/loading";

export interface RequestConfig extends AxiosRequestConfig {
  reqInterceptors?: RequestInterceptor[];
  resInterceptors?: ResponseInterceptor[];
  showLoading?: boolean;
}

export interface RequestInterceptor {
  onFulfilled?: (config: RequestConfig) => RequestConfig;
  onRejected?: (error: AxiosError<any>) => Promise<never>;
}

export interface ResponseInterceptor {
  onFulfilled?: (res: AxiosResponse) => AxiosResponse;
  onRejected?: (error: AxiosError<any>) => Promise<never>;
}

export class AxiosRequestor {
  instance: AxiosInstance;
  reqInterceptors?: RequestInterceptor[];
  resInterceptors?: ResponseInterceptor[];
  showLoading?: boolean;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading;
    this.reqInterceptors = config.reqInterceptors;
    this.resInterceptors = config.resInterceptors;

    this.reqInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.request.use(onFulfilled, onRejected);
      }
    );

    this.resInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.response.use(onFulfilled, onRejected);
      }
    );
  }

  request<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      const loadingStore = useLoadingStore();
      this.showLoading = config.showLoading ?? this.showLoading ?? false;

      if (this.showLoading) loadingStore._actAddQueue(config);

      this.instance
        .request(config)
        .then((res) => {
          loadingStore._actRemoveQueue(config);
          resolve(res.data);
        })
        .catch((err) => {
          loadingStore._actRemoveQueue(config);
          reject(err);
        });
    });
  }

  get<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
