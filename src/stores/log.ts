import { defineStore } from "pinia";
import { Log } from "@/class/Log";
import { axiosLogGetListBetweenPeriod } from "@/api/log/index";
import { timestampCalculator } from "@/helper/timestampCalculator";

export type LogState = {
  today: Log[];
};

export const useLogStore = defineStore({
  id: "log",
  state: (): LogState => ({
    today: [],
  }),
  actions: {
    async _actFetchTodayLog(): Promise<void> {
      const logs = await axiosLogGetListBetweenPeriod({
        start: timestampCalculator("today"),
        end: timestampCalculator("tomorrow"),
      });
      this.today = logs.map((log) => new Log(log));
    },
  },
  getters: {
    _getTotalTodayLogTime(): number {
      return this.today.reduce<number>((sum, log) => {
        return sum + log.endTimestamp - log.startTimestamp;
      }, 0);
    },
    _getCategorizeTodayLog(): Record<string, Log[]> {
      return this.today.reduce<Record<string, Log[]>>((obj, log) => {
        obj[log.categoryName] = [...(obj[log.categoryName] || []), log];
        return obj;
      }, {});
    },
  },
});
