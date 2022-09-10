import { defineStore } from "pinia";
import { TaskCategory, type TaskCategoryInfo } from "@/class/TaskCategory";
import { Task } from "@/class/Task";
import { axiosCurrentTaskGet, axiosPunch } from "@/api/currentTask";
import {
  axiosTaskCategoryGetList,
  axiosTaskCategoryCreate,
  axiosTaskCategoryUpdate,
  axiosTaskCategoryDelete,
} from "@/api/taskCategory";
import { axiosTaskGetList } from "@/api/task";

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
    async _actFetchTaskCategoryList(): Promise<void> {
      const list = await axiosTaskCategoryGetList();
      this.categories = list.map((cate) => new TaskCategory(cate));
    },
    async _actCreateTaskCategory(
      payload: Omit<TaskCategoryInfo, "id">
    ): Promise<void> {
      const id = await axiosTaskCategoryCreate(payload);
      const newCategory = new TaskCategory({
        ...payload,
        id,
        createTimestamp: 0,
        updateTimestamp: 0,
      });
      this.categories.push(newCategory);
    },
    async _actUpdateTaskCategory(payload: TaskCategoryInfo): Promise<void> {
      await axiosTaskCategoryUpdate(payload);
      const updateCategory = this.categories.find((c) => c.id === payload.id);
      if (updateCategory) {
        updateCategory.name = payload.name;
        updateCategory.startColor = payload.startColor;
        updateCategory.endColor = payload.endColor;
      }
    },
    async _actDeleteTaskCategory(id: TaskCategory["id"]): Promise<void> {
      await axiosTaskCategoryDelete({ id });
      this.categories = this.categories.filter((c) => c.id !== id);
    },
    async _actFetchTaskList(categoryId: Task["categoryId"]): Promise<void> {
      const list = await axiosTaskGetList({ categoryId });
      this.tasks = list.map((task) => new Task(task));
    },
    async _actFetchCurrentTask(): Promise<void> {
      const currentTask = await axiosCurrentTaskGet();
      this.currentTask = currentTask ? new Task(currentTask) : null;
    },
    async _actUpdateCurrentTask(task: Task | null): Promise<void> {
      if (this.currentTask?.id === task?.id) return;
      const updateTime = await axiosPunch(task ? task.id : null);
      if (task) task.lastStartTimestamp = updateTime;
      if (this.currentTask) this.currentTask.lastEndTimestamp = updateTime;
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
