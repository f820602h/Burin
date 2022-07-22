import type { BackgroundColor } from "@/class/BackgroundColor";

export interface TaskCategoryObject {
  name: string;
  color: BackgroundColor;
}

export class TaskCategory implements TaskCategoryObject {
  name: TaskCategoryObject["name"];
  color: TaskCategoryObject["color"];

  constructor(arg: TaskCategoryObject) {
    this.name = arg.name;
    this.color = arg.color;
  }
}
