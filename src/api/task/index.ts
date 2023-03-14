import { BaseAxiosRequestor } from "../axios/index";
import type {
  TaskId,
  TaskInfo,
  TaskBasicInfo,
  TaskCompleteInfo,
} from "@/class/Task";

export function axiosTaskGetList(
  payload: Pick<TaskInfo, "categoryId">
): Promise<TaskCompleteInfo[]> {
  return BaseAxiosRequestor.get({
    url: `/task/list/${payload.categoryId}`,
    showLoading: false,
  });
}

export function axiosTaskCreate(
  payload: Omit<TaskBasicInfo, "id">
): Promise<TaskInfo["id"]> {
  return BaseAxiosRequestor.post({
    url: "/task/create",
    data: payload,
  });
}

export function axiosTaskUpdate(payload: TaskBasicInfo): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/task/update",
    data: payload,
  });
}

export function axiosTaskDelete(payload: TaskId): Promise<never> {
  return BaseAxiosRequestor.delete({
    url: "/task/delete",
    params: payload,
  });
}
