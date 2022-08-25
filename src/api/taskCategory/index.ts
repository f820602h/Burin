import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { TaskCategoryObject } from "@/class/TaskCategory";

export const axiosTaskCategoryGetList: () => Promise<
  AxiosResponse<TaskCategoryObject[]>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/TaskCategory/list",
  });
};

export const axiosTaskCategoryUpdate: (
  payload: TaskCategoryObject
) => Promise<AxiosResponse<boolean>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/TaskCategory/update",
    data: payload,
  });
};
