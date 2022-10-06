import type { Task } from "./Task";
import type { TaskCategory } from "./TaskCategory";
import { Color } from "@/class/Color";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

export interface LogId {
  id: number;
}

export interface LogInfo extends LogId {
  categoryName: TaskCategory["name"];
  startColor: TaskCategory["startColor"];
  endColor: TaskCategory["endColor"];
  taskTitle: Task["title"];
  taskAdditionContent: Task["additionContent"];
  startTimestamp: Task["lastStartTimestamp"];
  endTimestamp: Task["lastEndTimestamp"];
}

export interface LogCompleteInfo extends LogInfo {
  createTimestamp: number;
}

export class Log implements LogCompleteInfo {
  id: LogCompleteInfo["id"];
  categoryName: LogCompleteInfo["categoryName"];
  startColor: LogCompleteInfo["startColor"];
  endColor: LogCompleteInfo["endColor"];
  taskTitle: LogCompleteInfo["taskTitle"];
  taskAdditionContent: LogCompleteInfo["taskAdditionContent"];
  startTimestamp: LogCompleteInfo["startTimestamp"];
  endTimestamp: LogCompleteInfo["endTimestamp"];
  createTimestamp: LogCompleteInfo["createTimestamp"];

  constructor(arg: LogCompleteInfo) {
    this.id = arg.id;
    this.categoryName = arg.categoryName;
    this.startColor = arg.startColor;
    this.endColor = arg.endColor;
    this.taskTitle = arg.taskTitle;
    this.taskAdditionContent = arg.taskAdditionContent;
    this.startTimestamp = arg.startTimestamp;
    this.endTimestamp = arg.endTimestamp;
    this.createTimestamp = arg.createTimestamp;
  }

  getColor(): Color {
    return new Color([this.startColor, this.endColor]);
  }

  getLastDurationTimeText(): string {
    const duration = this.endTimestamp - this.startTimestamp;
    if (duration === 0) return "Error";
    else if (duration < 0) return "Error";
    else return durationTimeFormatter(duration).outputText;
  }

  static parse(task: Task, taskCategory: TaskCategory): Omit<LogInfo, "id"> {
    if (task.categoryId !== taskCategory.id) {
      throw Error("task and task category cannot be associated");
    }
    return {
      categoryName: taskCategory.name,
      startColor: taskCategory.startColor,
      endColor: taskCategory.endColor,
      taskTitle: task.title,
      taskAdditionContent: task.additionContent,
      startTimestamp: task.lastStartTimestamp,
      endTimestamp: task.lastEndTimestamp,
    };
  }
}
