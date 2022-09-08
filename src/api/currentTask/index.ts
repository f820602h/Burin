import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { TaskId, TaskCompleteInfo } from "@/class/Task";

export const axiosCurrentTaskGet: () => Promise<
  AxiosResponse<TaskCompleteInfo | null>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/currentTask",
    showLoading: true,
  });
};

export const axiosPunch: (payload: {
  id: TaskId["id"] | null;
}) => Promise<AxiosResponse<number>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/punch",
    data: payload,
    showLoading: false,
  });
};
