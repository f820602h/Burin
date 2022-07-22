import { defineStore } from "pinia";
import { BackgroundColor } from "@/class/BackgroundColor";
import { TaskCategory } from "@/class/TaskCategory";
import { Task } from "@/class/Task";

const mockTask1 = new Task({
  id: "123",
  category: new TaskCategory({
    name: "工作",
    color: new BackgroundColor("#355C7D", "#6C5B7B", "#C06C84"),
  }),
  title: "功能開發",
  addition: {
    content: "不具有初始化函式並且之前的列舉成員是常數",
    isLink: false,
  },
  lastStartTimestamp: new Date().getTime(),
  lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
});

const mockTask2 = new Task({
  id: "123",
  category: new TaskCategory({
    name: "工作2",
    color: new BackgroundColor("#355C7D", "#6C5B7B", "#C06C84"),
  }),
  title: "功能開發2",
  addition: {
    content: "不具有初始化函式並且之前的列舉成員是常數",
    isLink: false,
  },
  lastStartTimestamp: new Date().getTime(),
  lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
});

export type TaskState = {
  tasks: Task[];
  currentTask: Task | null;
};

export const useTaskStore = defineStore({
  id: "task",
  state: (): TaskState => ({
    tasks: [mockTask1, mockTask2],
    currentTask: null,
  }),
  actions: {
    setCurrentTask(task: Task): void {
      this.currentTask = task;
    },
    removeCurrentTask(): void {
      this.currentTask = null;
    },
    addTask(arg: Task): void {
      console.log(arg);
    },
  },
});
