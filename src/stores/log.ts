import { defineStore } from "pinia";
import {
  Log,
  CurrentLog,
  type LogInfo,
  type LogCompleteInfo,
} from "@/class/Log";
import {
  axiosLogGetCurrent,
  axiosLogPostPush,
  axiosLogPostPause,
  axiosLogPostResume,
  axiosLogPostFinish,
  axiosLogGetListInSpecificDate,
} from "@/api/log/index";

export type LogState = {
  currentLog: CurrentLog | null;
  dailyLogs: Record<string | number, (Log | CurrentLog)[]>;
};

export const useLogStore = defineStore({
  id: "log",
  state: (): LogState => ({
    currentLog: null,
    dailyLogs: {},
  }),
  actions: {
    _actUpdateCurrentLog(logData: LogCompleteInfo) {
      this.currentLog = new CurrentLog(logData, {
        pause: axiosLogPostPause,
        resume: axiosLogPostResume,
        finish: (payload: CurrentLog) =>
          axiosLogPostFinish(payload).then(() => {
            this.currentLog = null;
          }),
      });
    },
    async _actPushLog(
      payload: Pick<LogInfo, "title" | "startTimestamp" | "categories">
    ): Promise<void> {
      if (this.currentLog) await this.currentLog.finish();
      const { id } = await axiosLogPostPush(payload);
      this._actUpdateCurrentLog({
        id,
        title: payload.title,
        categories: payload.categories,
        startTimestamp: payload.startTimestamp,
        finishTimestamp: 0,
        pauseTimestamp: 0,
        pauseDuration: 0,
        createTimestamp: payload.startTimestamp,
        updateTimestamp: payload.startTimestamp,
      });
    },
    async _actFetchCurrentLog(): Promise<void> {
      const data = await axiosLogGetCurrent();
      if (!data) return;
      this._actUpdateCurrentLog(data);
    },
    async _actFetchDailyLogs(payload: { stamp: number }): Promise<void> {
      const startTimestamp = payload.stamp;
      const endTimestamp = startTimestamp + 24 * 60 * 60 * 1000 - 1;
      const data = await axiosLogGetListInSpecificDate({
        start: startTimestamp,
        end: endTimestamp,
      });
      this.dailyLogs[payload.stamp] = data.map((logData) =>
        logData.id === this.currentLog?.id ? this.currentLog : new Log(logData)
      );
    },
  },
});
