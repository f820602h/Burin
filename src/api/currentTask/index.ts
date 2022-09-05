import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { TaskInfo, TaskCompleteInfo } from "@/class/Task";

export const axiosCurrentTaskGet: () => Promise<
  AxiosResponse<TaskCompleteInfo | null>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/currentTask",
    showLoading: true,
  });
};

export const axiosPunchIn: (
  payload: Pick<TaskInfo, "id" | "lastStartTimestamp">
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/currentTask/punchIn",
    data: payload,
    showLoading: false,
  });
};

export const axiosPunchOut: (
  payload: Pick<TaskInfo, "id" | "lastEndTimestamp">
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.delete({
    url: "/currentTask/punchOut",
    data: payload,
    showLoading: false,
  });
};
