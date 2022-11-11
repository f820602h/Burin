import axios from "axios";
import type { AxiosRequestConfig, Canceler } from "axios";

const pending: Map<string, Canceler> = new Map();

export function addPending(config: AxiosRequestConfig): void {
  const url: string = [config.method, config.url].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: Canceler) => {
      if (!pending.has(url)) pending.set(url, cancel);
    });
}

export function removePending(config: AxiosRequestConfig): void {
  const url: string = [config.method, config.url].join("&");
  const cancel: Canceler | undefined = pending.get(url);
  if (cancel) {
    cancel(`cancel ${url}`);
    pending.delete(url);
  }
}

export function clearPending(): void {
  for (const [url, cancel] of pending) {
    cancel(`cancel ${url}`);
  }
  pending.clear();
}
