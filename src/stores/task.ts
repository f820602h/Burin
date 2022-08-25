import { defineStore } from "pinia";
import { TaskCategory } from "@/class/TaskCategory";
import { Task } from "@/class/Task";
import { axiosTaskGetList } from "@/api/task";

import { mockTaskCategoryApiData } from "./mock/task";

const defaultCategory = new TaskCategory({
  id: 0,
  name: "未分類",
  startColor: "#DDDDDD",
  endColor: "#DDDDDD",
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
    async _actFetchTaskData(categoryId: Task["categoryId"]): Promise<void> {
      const res = await axiosTaskGetList({ categoryId });
      this.tasks = res.data.map((task) => new Task(task));
    },
    _actUpdateCurrentTask(task: Task | null): void {
      if (this.currentTask === task) return;
      if (this.currentTask) this.currentTask.setLastEndTimestampToNow();
      if (task) task.setLastStartTimestampToNow();
      this.currentTask = task;
    },
  },
  getters: {
    _getCurrentTaskCategory(): TaskCategory | undefined {
      return this.categories.find(
        (cate) => cate.id === this.currentTask?.categoryId
      );
    },
  },
});
