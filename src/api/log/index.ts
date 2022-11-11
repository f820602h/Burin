import { BaseAxiosRequestor } from "../axios/index";
import type { LogCompleteInfo, LogInfo } from "@/class/Log";

export function axiosLogGetListBetweenPeriod(payload: {
  start: LogInfo["startTimestamp"];
  end: LogInfo["endTimestamp"];
}): Promise<LogCompleteInfo[]> {
  return BaseAxiosRequestor.get({
    url: `/log/period`,
    params: payload,
    showLoading: false,
  });
}
