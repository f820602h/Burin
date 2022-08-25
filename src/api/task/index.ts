import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { Task, TaskObject } from "@/class/Task";

export const axiosTaskGetList: (
  payload: Pick<Task, "categoryId">
) => Promise<AxiosResponse<TaskObject[]>> = (payload) => {
  return BaseAxiosRequestor.get({
    url: "/task/list",
    params: payload,
  });
};

export const axiosTaskUpdateStart: (
  payload: Pick<Task, "id" | "lastStartTimestamp">
) => Promise<AxiosResponse<boolean>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/task/update/start",
    data: payload,
  });
};

export const axiosTaskUpdateEnd: (
  payload: Pick<Task, "id" | "lastEndTimestamp">
) => Promise<AxiosResponse<boolean>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/task/update/end",
    data: payload,
  });
};
