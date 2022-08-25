import { dateFormatter } from "@/helper/dateFormatter";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";
import { axiosTaskUpdateStart, axiosTaskUpdateEnd } from "@/api/task/index";

export interface TaskObject {
  id: number;
  categoryId: number;
  title: string;
  additionContent: string;
  additionUrl: string;
  lastStartTimestamp: number;
  lastEndTimestamp: number;
  createTimestamp: number;
  updateTimestamp: number;
}

export class Task implements TaskObject {
  id: TaskObject["id"];
  categoryId: TaskObject["categoryId"];
  title: TaskObject["title"];
  additionContent: TaskObject["additionContent"];
  additionUrl: TaskObject["additionUrl"];
  lastStartTimestamp: TaskObject["lastStartTimestamp"];
  lastEndTimestamp: TaskObject["lastEndTimestamp"];
  createTimestamp: TaskObject["createTimestamp"];
  updateTimestamp: TaskObject["updateTimestamp"];

  constructor(arg: TaskObject) {
    this.id = arg.id;
    this.categoryId = arg.categoryId;
    this.title = arg.title;
    this.additionContent = arg.additionContent;
    this.additionUrl = arg.additionUrl;
    this.lastStartTimestamp = arg.lastStartTimestamp;
    this.lastEndTimestamp = arg.lastEndTimestamp;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;
  }

  getLastUseDateText(): string {
    const config = { year: undefined, hour12: false, second: undefined };
    return this.lastStartTimestamp
      ? dateFormatter(this.lastStartTimestamp, config)
      : "尚未使用過";
  }

  getLastDurationTimeText(): string {
    const duration = this.lastEndTimestamp - this.lastStartTimestamp;
    if (duration === 0) return "尚未使用過";
    else if (duration < 0) return "正在進行中";
    else return durationTimeFormatter(duration).outputText;
  }

  async setLastStartTimestampToNow(): Promise<void> {
    const now = new Date().getTime();
    await axiosTaskUpdateStart({ id: this.id, lastStartTimestamp: now });
    this.lastStartTimestamp = now;
  }

  async setLastEndTimestampToNow(): Promise<void> {
    const now = new Date().getTime();
    await axiosTaskUpdateEnd({ id: this.id, lastEndTimestamp: now });
    this.lastEndTimestamp = now;
  }
}
