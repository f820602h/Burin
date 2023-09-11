import { BaseAxiosRequestor } from "../axios/index";
import type {
  PanelId,
  LogPanelInfo,
  LogPanelCompleteInfo,
} from "@/class/Panel";

export const axiosDailyPanelGetList: () => Promise<
  {
    id: LogPanelCompleteInfo["id"];
    title: LogPanelCompleteInfo["title"];
    next: LogPanelCompleteInfo["id"];
    filters: LogPanelInfo["filters"][number]["config"][];
    sorters: LogPanelInfo["sorters"][number]["config"][];
    createTimestamp: LogPanelCompleteInfo["createTimestamp"];
    updateTimestamp: LogPanelCompleteInfo["updateTimestamp"];
  }[]
> = () => {
  return BaseAxiosRequestor.get({
    url: "/daily-panel",
    showLoading: true,
  });
};

export const axiosDailyPanelCreate: (payload: {
  title: LogPanelInfo["title"];
  next: LogPanelInfo["id"];
  filters: LogPanelInfo["filters"][number]["config"][];
  sorters: LogPanelInfo["sorters"][number]["config"][];
}) => Promise<PanelId> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/daily-panel",
    data: payload,
  });
};
