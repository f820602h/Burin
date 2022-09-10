import { BaseAxiosRequestor } from "../axios/index";
import type { TaskId, TaskCompleteInfo } from "@/class/Task";

export const axiosCurrentTaskGet: () => Promise<TaskCompleteInfo | null> =
  () => {
    return BaseAxiosRequestor.get({
      url: "/currentTask",
      showLoading: true,
    });
  };

export const axiosPunch: (payload: TaskId["id"] | null) => Promise<number> = (
  payload
) => {
  return BaseAxiosRequestor.post({
    url: "/punch",
    data: { id: payload },
    showLoading: false,
  });
};
