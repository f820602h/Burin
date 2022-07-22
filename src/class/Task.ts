import type { TaskCategory } from "@/class/TaskCategory";
import { dateFormatter } from "@/helper/dateFormatter";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

export interface TaskAddition {
  content: string;
  isLink: boolean;
  url?: string;
}

export interface TaskObject {
  id: string;
  category: TaskCategory;
  title: string;
  addition: TaskAddition;
  lastStartTimestamp?: number;
  lastEndTimestamp?: number;
}

export class Task implements TaskObject {
  id: TaskObject["id"];
  category: TaskObject["category"];
  title: TaskObject["title"];
  addition: TaskObject["addition"];
  lastStartTimestamp?: TaskObject["lastStartTimestamp"];
  lastEndTimestamp?: TaskObject["lastEndTimestamp"];

  constructor(arg: TaskObject) {
    this.id = arg.id;
    this.category = arg.category;
    this.title = arg.title;
    this.addition = arg.addition;
    this.lastStartTimestamp = arg.lastStartTimestamp;
    this.lastEndTimestamp = arg.lastEndTimestamp;
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
}
