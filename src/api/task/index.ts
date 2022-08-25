import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { Task, TaskObject } from "@/class/Task";

export const axiosTaskGetList: (payload: {
  categoryId: Task["categoryId"];
}) => Promise<AxiosResponse<TaskObject[]>> = ({ categoryId }) => {
  return BaseAxiosRequestor.get({
    url: "/task/list",
    params: { categoryId },
  });
};
