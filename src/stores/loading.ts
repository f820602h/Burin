import { defineStore } from "pinia";
import type { RequestConfig } from "@/api/axios/types";

export type LoadingState = {
  show: boolean;
  queue: Set<RequestConfig>;
};

export const useLoadingStore = defineStore({
  id: "loading",
  state: (): LoadingState => ({
    show: false,
    queue: new Set(),
  }),
  getters: {
    _getIsLoading(): boolean {
      return this.show || !!this.queue.size;
    },
  },
  actions: {
    _actShowLoading(): void {
      this.show = true;
    },
    _actHideLoading(): void {
      this.show = false;
    },
    _actAddQueue(axiosConfig: RequestConfig): void {
      this.queue.add(axiosConfig);
    },
    _actRemoveQueue(axiosConfig: RequestConfig): void {
      this.queue.delete(axiosConfig);
    },
    _actReset(): void {
      this.show = false;
      this.queue.clear();
    },
  },
});
