import { BaseAxiosRequestor } from "../axios/index";
import type {
  TaskCategoryId,
  TaskCategoryInfo,
  TaskCategoryCompleteInfo,
} from "@/class/TaskCategory";

export function axiosTaskCategoryGetList(): Promise<
  TaskCategoryCompleteInfo[]
> {
  return BaseAxiosRequestor.get({
    url: "/taskCategory/list",
  });
}

export function axiosTaskCategoryCreate(
  payload: Omit<TaskCategoryInfo, "id">
): Promise<TaskCategoryId["id"]> {
  return BaseAxiosRequestor.post({
    url: "/taskCategory/create",
    data: payload,
  });
}

export function axiosTaskCategoryUpdate(
  payload: TaskCategoryInfo
): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/taskCategory/update",
    data: payload,
  });
}

export function axiosTaskCategoryDelete(
  payload: TaskCategoryId
): Promise<never> {
  return BaseAxiosRequestor.delete({
    url: "/taskCategory/delete",
    params: payload,
  });
}
