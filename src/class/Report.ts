import { CurrentLog, type Log } from "./Log";
import orderBy from "lodash-es/orderBy";
import union from "lodash-es/union";

export class Report<T extends Log | CurrentLog> {
  private _logs: T[] = [];
  private _currentLog: CurrentLog | null = null;
  private _groupBy: "category" | null = null;
  private _orderBy: keyof Log = "updateTimestamp";
  private _direction: "asc" | "desc" = "desc";

  constructor(logs: T[]) {
    this.logs = logs;
    this.currentLog = logs.find(
      (log) => log instanceof CurrentLog
    ) as CurrentLog;
  }

  set logs(logs: typeof this._logs) {
    const _log: typeof this._logs = [];
    logs.forEach((log) => {
      if (log instanceof CurrentLog) return;
      else _log.push(log);
    });
    this._logs = this.sort(_log);
  }
  get logs(): typeof this._logs {
    return this._logs;
  }

  set currentLog(currentLog: typeof this._currentLog) {
    this._currentLog = currentLog;
  }
  get currentLog(): typeof this._currentLog {
    return this._currentLog;
  }

  set groupBy(value: typeof this._groupBy) {
    this._groupBy = value;
    this.sort(this._logs);
  }
  get groupBy(): typeof this._groupBy {
    return this._groupBy;
  }

  set orderBy(value: typeof this._orderBy) {
    this._orderBy = value;
    this.sort(this._logs);
  }
  get orderBy(): typeof this._orderBy {
    return this._orderBy;
  }

  set direction(value: typeof this._direction) {
    this._direction = value;
    this.sort(this._logs);
  }
  get direction(): typeof this._direction {
    return this._direction;
  }

  private sort(array: T[]): T[] {
    const dir =
      this._direction === "asc" ? 1 : this._direction === "desc" ? -1 : 0;

    return array.sort((a, b) => {
      if (a[this._orderBy] < b[this._orderBy]) return -1 * dir;
      else if (a[this._orderBy] > b[this._orderBy]) return 1 * dir;
      else return 0;
    });
  }

  get categories(): number[] {
    return union(...this._logs.map((log) => log.categories)).sort(
      (a, b) => a - b
    );
  }

  get durationSum(): number {
    return this._logs.reduce((acc, log) => {
      const { totalMilliseconds } =
        log instanceof CurrentLog ? log.duringTime : log.durationTime;
      return acc + totalMilliseconds;
    }, 0);
  }

  get pauseDurationSum(): number {
    return this._logs.reduce((acc, log) => {
      return acc + log.pauseDuration;
    }, 0);
  }

  get maxDurationLog(): T {
    return orderBy(this._logs, ["durationTime"], "desc")[0];
  }

  get maxPauseDurationLog(): T {
    return orderBy(this._logs, ["pauseDuration"], "desc")[0];
  }
}
