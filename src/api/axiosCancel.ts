import axios from "axios";
import type { AxiosRequestConfig, Canceler } from "axios";

const pending: Map<string, Canceler> = new Map();

export const addPending: (config: AxiosRequestConfig) => void = (config) => {
  const url: string = [config.method, config.url].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: Canceler) => {
      if (!pending.has(url)) pending.set(url, cancel);
    });
};

export const removePending: (config: AxiosRequestConfig) => void = (config) => {
  const url: string = [config.method, config.url].join("&");
  const cancel: Canceler | undefined = pending.get(url);
  if (cancel) {
    cancel(`cancel ${url}`);
    pending.delete(url);
  }
};

export const clearPending: () => void = () => {
  for (const [url, cancel] of pending) {
    cancel(`cancel ${url}`);
  }
  pending.clear();
};
