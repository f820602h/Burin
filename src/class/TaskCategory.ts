import type { Color } from "@/class/Color";
import { taskCategoryColors } from "@/system/taskCategoryColors";

export type TaskCategoryObject = {
  id: string;
  name: string;
  colorName: string;
  createTimestamp: number;
  updateTimestamp: number;
};

export class TaskCategory implements TaskCategoryObject {
  id: TaskCategoryObject["id"];
  name: TaskCategoryObject["name"];
  colorName: TaskCategoryObject["colorName"];
  color: Color;
  createTimestamp: TaskCategoryObject["createTimestamp"];
  updateTimestamp: TaskCategoryObject["updateTimestamp"];

  constructor(arg: TaskCategoryObject) {
    this.id = arg.id;
    this.name = arg.name;
    this.colorName = arg.colorName;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;

    this.color = Object.keys(taskCategoryColors).includes(this.colorName)
      ? taskCategoryColors[this.colorName]
      : taskCategoryColors.default;
  }
}
