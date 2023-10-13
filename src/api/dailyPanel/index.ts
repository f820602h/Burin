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
    visibility: LogPanelCompleteInfo["visibility"];
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
  visibility: LogPanelInfo["visibility"];
  filters: LogPanelInfo["filters"][number]["config"][];
  sorters: LogPanelInfo["sorters"][number]["config"][];
}) => Promise<PanelId> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/daily-panel",
    data: payload,
  });
};

export const axiosDailyPanelUpdate: (payload: {
  id: LogPanelCompleteInfo["id"];
  title: LogPanelInfo["title"];
  visibility: LogPanelInfo["visibility"];
  filters: LogPanelInfo["filters"][number]["config"][];
  sorters: LogPanelInfo["sorters"][number]["config"][];
}) => Promise<boolean> = (payload) => {
  return BaseAxiosRequestor.patch({
    url: "/daily-panel",
    data: payload,
  });
};

export const axiosDailyPanelDelete: (payload: {
  id: LogPanelCompleteInfo["id"];
}) => Promise<boolean> = (payload) => {
  return BaseAxiosRequestor.delete({
    url: "/daily-panel",
    params: payload,
  });
};
