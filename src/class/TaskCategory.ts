import { Color } from "@/class/Color";

export type TaskCategoryObject = {
  id: number;
  name: string;
  startColor: string;
  endColor: string;
  createTimestamp: number;
  updateTimestamp: number;
};

export class TaskCategory implements TaskCategoryObject {
  id: TaskCategoryObject["id"];
  name: TaskCategoryObject["name"];
  startColor: TaskCategoryObject["startColor"];
  endColor: TaskCategoryObject["endColor"];
  createTimestamp: TaskCategoryObject["createTimestamp"];
  updateTimestamp: TaskCategoryObject["updateTimestamp"];

  constructor(arg: TaskCategoryObject) {
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
