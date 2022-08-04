import { dateFormatter } from "@/helper/dateFormatter";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

export interface TaskAddition {
  content: string;
  isLink: boolean;
  url?: string;
}

export interface TaskObject {
  id: string;
  categoryId: string;
  title: string;
  addition: TaskAddition;
  lastStartTimestamp: number;
  lastEndTimestamp: number;
  createTimestamp: number;
  updateTimestamp: number;
}

export class Task implements TaskObject {
  id: TaskObject["id"];
  categoryId: TaskObject["categoryId"];
  title: TaskObject["title"];
  addition: TaskObject["addition"];
  lastStartTimestamp: TaskObject["lastStartTimestamp"];
  lastEndTimestamp: TaskObject["lastEndTimestamp"];
  createTimestamp: TaskObject["createTimestamp"];
  updateTimestamp: TaskObject["updateTimestamp"];

  constructor(arg: TaskObject) {
    this.id = arg.id;
    this.categoryId = arg.categoryId;
    this.title = arg.title;
    this.addition = arg.addition;
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
    return this.lastStartTimestamp && this.lastEndTimestamp
      ? durationTimeFormatter(this.lastEndTimestamp - this.lastStartTimestamp)
          .outputText
      : "尚未使用過";
  }

  setLastStartTimestampToNow(): void {
    this.lastStartTimestamp = new Date().getTime();
  }

  setLastEndTimestampToNow(): void {
    this.lastEndTimestamp = new Date().getTime();
  }
}
