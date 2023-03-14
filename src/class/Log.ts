import type { Task } from "./Task";
import type { TaskCategory } from "./TaskCategory";
import { Color } from "@/class/Color";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

export interface LogId {
  id: number;
}

export interface LogInfo extends LogId {
  categoryId: TaskCategory["id"];
  categoryName: TaskCategory["name"];
  categoryUpdateTimestamp: TaskCategory["updateTimestamp"];
  startColor: TaskCategory["startColor"];
  endColor: TaskCategory["endColor"];
  taskId: Task["id"];
  taskTitle: Task["title"];
  taskAdditionContent: Task["additionContent"];
  taskUpdateTimestamp: Task["updateTimestamp"];
  startTimestamp: Task["lastStartTimestamp"];
  endTimestamp: Task["lastEndTimestamp"];
}

export interface LogCompleteInfo extends LogInfo {
  createTimestamp: number;
}

export class Log implements LogCompleteInfo {
  id: LogCompleteInfo["id"];
  categoryId: LogCompleteInfo["categoryId"];
  categoryName: LogCompleteInfo["categoryName"];
  categoryUpdateTimestamp: LogCompleteInfo["categoryUpdateTimestamp"];
  startColor: LogCompleteInfo["startColor"];
  endColor: LogCompleteInfo["endColor"];
  taskId: LogCompleteInfo["taskId"];
  taskTitle: LogCompleteInfo["taskTitle"];
  taskAdditionContent: LogCompleteInfo["taskAdditionContent"];
  taskUpdateTimestamp: LogCompleteInfo["taskUpdateTimestamp"];
  startTimestamp: LogCompleteInfo["startTimestamp"];
  endTimestamp: LogCompleteInfo["endTimestamp"];
  createTimestamp: LogCompleteInfo["createTimestamp"];

  constructor(arg: LogCompleteInfo) {
    this.id = arg.id;
    this.categoryId = arg.categoryId;
    this.categoryName = arg.categoryName;
    this.categoryUpdateTimestamp = arg.categoryUpdateTimestamp;
    this.startColor = arg.startColor;
    this.endColor = arg.endColor;
    this.taskId = arg.taskId;
    this.taskTitle = arg.taskTitle;
    this.taskAdditionContent = arg.taskAdditionContent;
    this.taskUpdateTimestamp = arg.taskUpdateTimestamp;
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
      categoryId: taskCategory.id,
      categoryName: taskCategory.name,
      categoryUpdateTimestamp: taskCategory.updateTimestamp,
      startColor: taskCategory.startColor,
      endColor: taskCategory.endColor,
      taskId: task.id,
      taskTitle: task.title,
      taskAdditionContent: task.additionContent,
      taskUpdateTimestamp: task.updateTimestamp,
      startTimestamp: task.lastStartTimestamp,
      endTimestamp: task.lastEndTimestamp,
    };
  }
}
