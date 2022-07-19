import type { TaskCategory } from "@/class/TaskCategory";

export type TaskAddition = {
  content: string;
  isLink: boolean;
  url?: string;
};

export type TaskObject = {
  id: string;
  category: TaskCategory;
  task: string;
  addition: TaskAddition;
  lastUseDate: number;
  lastUseSpendTime: number;
};

export class Task {
  id: string;
  category: TaskCategory;
  task: string;
  addition: TaskAddition;
  lastUseDate: number;
  lastUseSpendTime: number;

  constructor(arg: TaskObject) {
    this.id = arg.id;
    this.category = arg.category;
    this.task = arg.task;
    this.addition = arg.addition;
    this.lastUseDate = arg.lastUseDate;
    this.lastUseSpendTime = arg.lastUseSpendTime;
  }
}
