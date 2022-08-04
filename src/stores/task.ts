import { defineStore } from "pinia";
import { TaskCategory } from "@/class/TaskCategory";
import { Task } from "@/class/Task";

import { mockTaskCategoryApiData, mockTaskApiData } from "./mock/task";

const defaultCategory = new TaskCategory({
  id: "default",
  name: "未分類",
  colorName: "default",
  createTimestamp: 0,
  updateTimestamp: 0,
});

export type TaskState = {
  categories: TaskCategory[];
  defaultCategory: TaskCategory;
  tasks: Task[];
  currentTask: Task | null;
};

export const useTaskStore = defineStore({
  id: "task",
  state: (): TaskState => ({
    categories: [],
    defaultCategory,
    tasks: [],
    currentTask: null,
  }),
  actions: {
    _actFetchTaskCategoryData(): void {
      this.categories = mockTaskCategoryApiData.map(
        (cate) => new TaskCategory(cate)
      );
    },
    _actFetchTaskData(): void {
      this.tasks = mockTaskApiData.map((task) => new Task(task));
    },
    _actUpdateCurrentTask(task: Task | null): void {
      if (this.currentTask === task) return;
      if (this.currentTask) this.currentTask.setLastEndTimestampToNow();
      if (task) task.setLastStartTimestampToNow();
      this.currentTask = task;
    },
  },
  getters: {
    currentTaskCategory(): TaskCategory {
      return (
        this.categories.find(
          (cate) => cate.id === this.currentTask?.categoryId
        ) || this.defaultCategory
      );
    },
  },
});
