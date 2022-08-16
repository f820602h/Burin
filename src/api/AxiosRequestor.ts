import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

interface RequestConfig extends AxiosRequestConfig {
  reqInterceptors?: RequestInterceptor[];
  resInterceptors?: ResponseInterceptor[];
  showLoading?: boolean;
}

export interface RequestInterceptor {
  onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onRejected?: (error: AxiosError) => AxiosError;
}

export interface ResponseInterceptor {
  onFulfilled?: (res: AxiosResponse) => AxiosResponse;
  onRejected?: (error: AxiosError) => AxiosError;
}

export class AxiosRequestor {
  instance: AxiosInstance;
  reqInterceptors?: RequestInterceptor[];
  resInterceptors?: ResponseInterceptor[];
  showLoading?: boolean;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.reqInterceptors = config.reqInterceptors;
    this.resInterceptors = config.resInterceptors;

    this.reqInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.request.use(onFulfilled, onRejected);
      }
    );

    this.reqInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.request.use(onFulfilled, onRejected);
      }
    );
  }

  request<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.showLoading = config.showLoading ?? this.showLoading ?? false;

      this.instance
        .request(config)
        .then((res) => {
          this.showLoading = false;
          resolve(res.data);
        })
        .catch((err) => {
          this.showLoading = false;
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
