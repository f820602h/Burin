import { BaseAxiosRequestor } from "../axios/index";
import type { TaskInfo, TaskCompleteInfo } from "@/class/Task";

export const axiosTaskGetList: (
  payload: Pick<TaskInfo, "categoryId">
) => Promise<TaskCompleteInfo[]> = (payload) => {
  return BaseAxiosRequestor.get({
    url: `/task/list/${payload.categoryId}`,
    showLoading: false,
  });
};
