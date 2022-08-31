import { defineStore } from "pinia";
import { TaskCategory, type TaskCategoryInfo } from "@/class/TaskCategory";
import { Task } from "@/class/Task";
import { axiosTaskGetList } from "@/api/task";
import {
  axiosTaskCategoryGetList,
  axiosTaskCategoryCreate,
} from "@/api/taskCategory";

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
    async _actFetchTaskCategoryData(): Promise<void> {
      const res = await axiosTaskCategoryGetList();
      this.categories = res.data.map((cate) => new TaskCategory(cate));
    },
    async _actCreateTaskCategoryData(
      payload: Omit<TaskCategoryInfo, "id">
    ): Promise<void> {
      const res = await axiosTaskCategoryCreate(payload);
      this.categories.push(
        new TaskCategory({
          ...payload,
          id: res.data.id,
          createTimestamp: 0,
          updateTimestamp: 0,
        })
      );
    },
    async _actFetchTaskData(categoryId: Task["categoryId"]): Promise<void> {
      const res = await axiosTaskGetList({ categoryId });
      this.tasks = res.data.map((task) => new Task(task));
    },
    async _actUpdateCurrentTask(task: Task | null): Promise<void> {
      if (this.currentTask === task) return;
      if (this.currentTask) await this.currentTask.setLastEndTimestampToNow();
      if (task) await task.setLastStartTimestampToNow();
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
