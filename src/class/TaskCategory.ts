import type { BackgroundColor } from "@/class/BackgroundColor";

export type TaskCategoryArgument = {
  name: string;
  color: BackgroundColor;
};

export class TaskCategory {
  name: string;
  color: BackgroundColor;

  constructor(arg: TaskCategoryArgument) {
    this.name = arg.name;
    this.color = arg.color;
  }
}
