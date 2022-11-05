import { BaseAxiosRequestor } from "../axios/index";
import type { TaskInfo, TaskBasicInfo, TaskCompleteInfo } from "@/class/Task";

export const axiosTaskGetList: (
  payload: Pick<TaskInfo, "categoryId">
) => Promise<TaskCompleteInfo[]> = (payload) => {
  return BaseAxiosRequestor.get({
    url: `/task/list/${payload.categoryId}`,
    showLoading: false,
  });
};

export const axiosTaskCreate: (
  payload: Omit<TaskBasicInfo, "id">
) => Promise<TaskInfo["id"]> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/task/create",
    data: payload,
  });
};

export const axiosTaskUpdate: (payload: TaskBasicInfo) => Promise<never> = (
  payload
) => {
  return BaseAxiosRequestor.post({
    url: "/task/update",
    data: payload,
  });
};
