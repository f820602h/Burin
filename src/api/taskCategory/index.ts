import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type {
  TaskCategoryId,
  TaskCategoryInfo,
  TaskCategoryCompleteInfo,
} from "@/class/TaskCategory";

export const axiosTaskCategoryGetList: () => Promise<
  AxiosResponse<TaskCategoryCompleteInfo[]>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/TaskCategory/list",
  });
};

export const axiosTaskCategoryCreate: (
  payload: Omit<TaskCategoryInfo, "id">
) => Promise<AxiosResponse<TaskCategoryId>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/TaskCategory/create",
    data: payload,
  });
};

export const axiosTaskCategoryUpdate: (
  payload: TaskCategoryInfo
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/TaskCategory/update",
    data: payload,
  });
};
