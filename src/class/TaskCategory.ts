import { Color } from "@/class/Color";

export interface TaskCategoryId {
  id: number;
}

export interface TaskCategoryInfo extends TaskCategoryId {
  name: string;
  startColor: string;
  endColor: string;
}

export interface TaskCategoryCompleteInfo extends TaskCategoryInfo {
  createTimestamp: number;
  updateTimestamp: number;
}

export class TaskCategory implements TaskCategoryCompleteInfo {
  id: TaskCategoryCompleteInfo["id"];
  name: TaskCategoryCompleteInfo["name"];
  startColor: TaskCategoryCompleteInfo["startColor"];
  endColor: TaskCategoryCompleteInfo["endColor"];
  createTimestamp: TaskCategoryCompleteInfo["createTimestamp"];
  updateTimestamp: TaskCategoryCompleteInfo["updateTimestamp"];

  constructor(arg: TaskCategoryCompleteInfo) {
    this.id = arg.id;
    this.name = arg.name;
    this.startColor = arg.startColor;
    this.endColor = arg.endColor;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;
  }

  getColor(): Color {
    return new Color([this.startColor, this.endColor]);
  }
}
