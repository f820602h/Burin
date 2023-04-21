import { defineStore } from "pinia";
import { axiosStampGetList } from "@/api/stamp/index";

export type StampState = {
  stamps: number[];
};

export const useStampStore = defineStore({
  id: "stamp",
  state: (): StampState => ({
    stamps: [],
  }),
  actions: {
    async _actFetchStamps(): Promise<void> {
      const date = await axiosStampGetList();
      this.stamps = date;
    },
  },
});
