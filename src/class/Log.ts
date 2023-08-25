import type { Category } from "@/class/Category";
import { FieldTypes } from "@/types/fieldType";
import { computed } from "vue";
import { dateFormatter } from "@/helper/dateFormatter";
import { useTimestamp } from "@vueuse/core";

export enum LogStatus {
  IN_PROGRESS = "in_progress",
  PAUSE = "pause",
  FINISH = "finish",
}

export const LOG_STATUS_TEXT_MAP = {
  [LogStatus.IN_PROGRESS]: "In Progress",
  [LogStatus.PAUSE]: "Pause",
  [LogStatus.FINISH]: "Finish",
};

export interface LogId {
  id: number;
}

export interface LogInfo extends LogId {
  title: string;
  categories: Category["id"][];
  startTimestamp: number;
  finishTimestamp: number;
  pauseTimestamp: number;
  pauseTimes: number;
  pauseDurationTime: number;
}

export interface LogCompleteInfo extends LogInfo {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Log implements LogCompleteInfo {
  id: LogCompleteInfo["id"];
  title: LogCompleteInfo["title"];
  categories: LogCompleteInfo["categories"];
  startTimestamp: LogCompleteInfo["startTimestamp"];
  finishTimestamp: LogCompleteInfo["finishTimestamp"];
  pauseTimestamp: LogCompleteInfo["pauseTimestamp"];
  pauseTimes: LogCompleteInfo["pauseTimes"];
  pauseDurationTime: LogCompleteInfo["pauseDurationTime"];
  createTimestamp: LogCompleteInfo["createTimestamp"];
  updateTimestamp: LogCompleteInfo["updateTimestamp"];

  constructor(log: LogCompleteInfo) {
    this.id = log.id;
    this.title = log.title;
    this.categories = log.categories;
    this.startTimestamp = log.startTimestamp;
    this.finishTimestamp = log.finishTimestamp;
    this.pauseTimestamp = log.pauseTimestamp;
    this.pauseTimes = log.pauseTimes;
    this.pauseDurationTime = log.pauseDurationTime;
    this.createTimestamp = log.createTimestamp;
    this.updateTimestamp = log.updateTimestamp;
  }

  get status(): LogStatus {
    return LogStatus.FINISH;
  }

  get startTimeText(): string {
    return dateFormatter(this.startTimestamp, {
      year: undefined,
      month: undefined,
      day: undefined,
      hour12: false,
      second: undefined,
    });
  }

  get finishTimeText(): string {
    const start = new Date(this.startTimestamp);
    const finish = new Date(this.finishTimestamp);

    return this.finishTimestamp
      ? dateFormatter(this.finishTimestamp, {
          year: undefined,
          month: start.getDate() !== finish.getDate() ? "short" : undefined,
          day: start.getDate() !== finish.getDate() ? "2-digit" : undefined,
          hour12: false,
          second: undefined,
        })
      : this.status;
  }

  get durationTime(): number {
    const duration =
      this.finishTimestamp - this.startTimestamp - this.pauseDurationTime;
    return Math.max(duration, 0);
  }
}

const {
  timestamp,
  pause: timestampPause,
  resume: timestampResume,
} = useTimestamp({ controls: true });

export type CurrentLogCallBack = (payload: CurrentLog) => Promise<void> | void;

export class CurrentLog extends Log {
  private _pauseCallbacks: Set<CurrentLogCallBack>;
  private _resumeCallbacks: Set<CurrentLogCallBack>;
  private _finishCallbacks: Set<CurrentLogCallBack>;

  constructor(log: LogCompleteInfo) {
    super(log);
    timestampResume();
    this._pauseCallbacks = new Set();
    this._resumeCallbacks = new Set();
    this._finishCallbacks = new Set();
  }

  get status(): LogStatus {
    return this.pauseTimestamp ? LogStatus.PAUSE : LogStatus.IN_PROGRESS;
  }

  get duringTime(): number {
    return computed<number>(() => {
      const duration =
        (this.pauseTimestamp || timestamp.value) -
        this.startTimestamp -
        this.pauseDurationTime;
      return Math.max(duration, 0);
    }).value;
  }

  subscribePauseCallback(callback: CurrentLogCallBack): () => void {
    this._pauseCallbacks.add(callback);
    return () => this._pauseCallbacks.delete(callback);
  }

  subscribeResumeCallback(callback: CurrentLogCallBack): () => void {
    this._resumeCallbacks.add(callback);
    return () => this._resumeCallbacks.delete(callback);
  }

  subscribeFinishCallback(callback: CurrentLogCallBack): () => void {
    this._finishCallbacks.add(callback);
    return () => this._finishCallbacks.delete(callback);
  }

  async pause() {
    if (this.status !== LogStatus.IN_PROGRESS) return;
    timestampPause();
    this.pauseTimestamp = timestamp.value;
    if (this._pauseCallbacks.size) {
      for (const cb of this._pauseCallbacks) await cb(this);
    }
  }

  async resume() {
    if (this.status !== LogStatus.PAUSE) return;
    const now = new Date().getTime();
    this.pauseDurationTime += now - this.pauseTimestamp;
    this.pauseTimestamp = 0;
    timestampResume();
    if (this._resumeCallbacks.size) {
      for (const cb of this._resumeCallbacks) await cb(this);
    }
  }

  async finish() {
    if (this.status === LogStatus.FINISH) return;
    if (this.status === LogStatus.PAUSE) {
      const now = new Date().getTime();
      this.pauseDurationTime += now - this.pauseTimestamp;
      this.pauseTimestamp = 0;
      timestampResume();
    }
    timestampPause();
    this.finishTimestamp = timestamp.value;
    if (this._finishCallbacks.size) {
      for (const cb of this._finishCallbacks) await cb(this);
    }
  }
}

export const LOG_FIELD_TYPE_MAP = {
  title: FieldTypes.STRING,
  status: FieldTypes.SELECT,
  categories: FieldTypes.MULTI_SELECT,
  startTimestamp: FieldTypes.DATE,
  finishTimestamp: FieldTypes.DATE,
  pauseTimes: FieldTypes.NUMBER,
  pauseDurationTime: FieldTypes.TIME,
  durationTime: FieldTypes.TIME,

  id: FieldTypes.NUMBER,
  pauseTimestamp: FieldTypes.DATE,
  createTimestamp: FieldTypes.DATE,
  updateTimestamp: FieldTypes.DATE,
  startTimeText: FieldTypes.STRING,
  finishTimeText: FieldTypes.STRING,
} as const;

export const LOG_FIELD_TEXT_MAP: Partial<Record<keyof Log, string>> = {
  title: "Title",
  status: "Status",
  categories: "Tags",
  startTimestamp: "Start Time",
  finishTimestamp: "Finish Time",
  pauseTimes: "Pause Count",
  pauseDurationTime: "Pause Duration",
  durationTime: "Work Duration",
} as const;
