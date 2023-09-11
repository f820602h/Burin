import { BaseAxiosRequestor } from "../axios/index";
import type { CurrentLog, LogCompleteInfo, LogId, LogInfo } from "@/class/Log";

export function axiosLogPostPush(
  payload: Pick<LogInfo, "title" | "startTimestamp" | "categories">,
): Promise<LogId> {
  return BaseAxiosRequestor.post({
    url: `/log/push`,
    data: payload,
    showLoading: true,
  });
}

export function axiosLogGetCurrent(): Promise<LogCompleteInfo> {
  return BaseAxiosRequestor.get({
    url: `/log/current`,
    showLoading: true,
  });
}

export function axiosLogPostPause(payload: CurrentLog): Promise<void> {
  return BaseAxiosRequestor.post({
    url: `/log/pause`,
    data: payload,
    showLoading: true,
  });
}

export function axiosLogPostResume(payload: CurrentLog): Promise<void> {
  return BaseAxiosRequestor.post({
    url: `/log/resume`,
    data: payload,
    showLoading: true,
  });
}

export function axiosLogPostFinish(payload: CurrentLog): Promise<void> {
  return BaseAxiosRequestor.post({
    url: `/log/finish`,
    data: payload,
    showLoading: true,
  });
}

export function axiosLogGetListInSpecificDate(payload: {
  start: number;
  end: number;
}): Promise<LogCompleteInfo[]> {
  return BaseAxiosRequestor.get({
    url: `/log/period`,
    params: payload,
    showLoading: true,
  });
}
