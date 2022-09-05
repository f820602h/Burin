import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { TaskInfo, TaskCompleteInfo } from "@/class/Task";

export const axiosTaskGetList: (
  payload: Pick<TaskInfo, "categoryId">
) => Promise<AxiosResponse<TaskCompleteInfo[]>> = (payload) => {
  return BaseAxiosRequestor.get({
    url: "/task/list",
    params: payload,
    showLoading: false,
  });
};
