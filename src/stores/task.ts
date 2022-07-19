import { defineStore } from "pinia";
import { Task } from "@/class/Task";
import type { TaskObject } from "@/class/Task";

export type TaskState = {
  tasks: Task[];
};

export const useTaskStore = defineStore({
  id: "task",
  state: () =>
    ({
      tasks: [],
    } as TaskState),
  actions: {
    addTask(arg: TaskObject): void {
      this.tasks.push(new Task(arg));
    },
  },
});
