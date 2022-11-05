import { dateFormatter } from "@/helper/dateFormatter";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

export interface TaskId {
  id: number;
}

export interface TaskBasicInfo extends TaskId {
  categoryId: number;
  title: string;
  additionContent: string;
  additionUrl: string;
}

export interface TaskInfo extends TaskBasicInfo {
  lastStartTimestamp: number;
  lastEndTimestamp: number;
}

export interface TaskCompleteInfo extends TaskInfo {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Task implements TaskCompleteInfo {
  id: TaskCompleteInfo["id"];
  categoryId: TaskCompleteInfo["categoryId"];
  title: TaskCompleteInfo["title"];
  additionContent: TaskCompleteInfo["additionContent"];
  additionUrl: TaskCompleteInfo["additionUrl"];
  lastStartTimestamp: TaskCompleteInfo["lastStartTimestamp"];
  lastEndTimestamp: TaskCompleteInfo["lastEndTimestamp"];
  createTimestamp: TaskCompleteInfo["createTimestamp"];
  updateTimestamp: TaskCompleteInfo["updateTimestamp"];

  constructor(arg: TaskCompleteInfo) {
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
}
