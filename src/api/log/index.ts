import { BaseAxiosRequestor } from "../axios/index";
import type { LogCompleteInfo, LogInfo } from "@/class/Log";

export const axiosLogGetListBetweenPeriod: (payload: {
  start: LogInfo["startTimestamp"];
  end: LogInfo["endTimestamp"];
}) => Promise<LogCompleteInfo[]> = (payload) => {
  return BaseAxiosRequestor.get({
    url: `/log/period`,
    params: payload,
    showLoading: false,
  });
};
