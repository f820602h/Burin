import { defineStore } from "pinia";
import { FieldTypes } from "@/types/fieldType";
import { FilterOperator } from "@/class/Filter";
import { SorterDirection } from "@/class/Sorter";
import { LogPanel } from "@/class/Panel";
import { LogStatus } from "@/class/Log";

const inProgressPanel: LogPanel = new LogPanel({
  id: -2,
  order: -2,
  title: "IN PROGRESS",
  filterConfig: [
    {
      field: "status",
      type: FieldTypes.SELECT,
      condition: FilterOperator.IS,
      value: [LogStatus.FINISH],
    },
  ],
  sorterConfig: [],
  updateTimestamp: 0,
  createTimestamp: 0,
});
const historyPanel: LogPanel = new LogPanel({
  id: -1,
  order: -1,
  title: "HISTORY",
  filterConfig: [
    {
      field: "status",
      type: FieldTypes.SELECT,
      condition: FilterOperator.IS,
      value: [LogStatus.FINISH],
    },
  ],
  sorterConfig: [
    {
      field: "startTimestamp",
      type: FieldTypes.DATE,
      direction: SorterDirection.DESC,
    },
  ],
  updateTimestamp: 0,
  createTimestamp: 0,
});

export type LogPanelState = {
  daily: {
    defaultPanels: LogPanel[];
    userPanels: LogPanel[];
  };
};

export const useLogPanelStore = defineStore({
  id: "panel",
  state: (): LogPanelState => ({
    daily: {
      defaultPanels: [inProgressPanel, historyPanel],
      userPanels: [],
    },
  }),
  actions: {
    addPanel(panel: LogPanel) {
      this.daily.userPanels.push(panel);
    },
  },
});
