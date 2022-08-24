import { defineStore } from "pinia";

export type AlarmState = {
  intervalMinuteOptions: number[];
  currentIntervalMinute: number;
};

export const useAlarmStore = defineStore({
  id: "alarm",
  state: (): AlarmState => ({
    intervalMinuteOptions: [5, 10, 15, 30, 60],
    currentIntervalMinute: 0,
  }),
  actions: {
    _acSetCurrentTiming(minus: number): void {
      const isInvalid = this.intervalMinuteOptions.indexOf(minus) < 0;
      this.currentIntervalMinute = isInvalid
        ? this.intervalMinuteOptions[0]
        : minus;
    },
  },
  getters: {
    _getCurrentIntervalMillisecond(): number {
      return this.currentIntervalMinute * 1000 * 60;
    },
  },
});
