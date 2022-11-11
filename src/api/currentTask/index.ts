import { BaseAxiosRequestor } from "../axios/index";
import type { TaskId, TaskCompleteInfo } from "@/class/Task";

export function axiosCurrentTaskGet(): Promise<TaskCompleteInfo | null> {
  return BaseAxiosRequestor.get({
    url: "/currentTask",
    showLoading: true,
  });
}

export function axiosPunch(payload: TaskId["id"] | null): Promise<number> {
  return BaseAxiosRequestor.post({
    url: "/punch",
    data: { id: payload },
    showLoading: false,
  });
}
