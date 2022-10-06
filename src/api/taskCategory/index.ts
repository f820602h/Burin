import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type {
  TaskCategoryId,
  TaskCategoryInfo,
  TaskCategoryCompleteInfo,
} from "@/class/TaskCategory";

export const axiosTaskCategoryGetList: () => Promise<
  TaskCategoryCompleteInfo[]
> = () => {
  return BaseAxiosRequestor.get({
    url: "/taskCategory/list",
  });
};

export const axiosTaskCategoryCreate: (
  payload: Omit<TaskCategoryInfo, "id">
) => Promise<TaskCategoryId["id"]> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/taskCategory/create",
    data: payload,
  });
};

export const axiosTaskCategoryUpdate: (
  payload: TaskCategoryInfo
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/taskCategory/update",
    data: payload,
  });
};

export const axiosTaskCategoryDelete: (
  payload: TaskCategoryId
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.delete({
    url: "/taskCategory/delete",
    params: payload,
  });
};
