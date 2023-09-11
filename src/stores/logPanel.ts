import { defineStore } from "pinia";
import { FieldTypes } from "@/types/fieldType";
import { type LogPanelFields } from "@/validation/logPanelField";
import { FilterOperator } from "@/class/Filter";
import { SorterDirection } from "@/class/Sorter";
import { LogPanel } from "@/class/Panel";
import { LogStatus } from "@/class/Log";
import { Filter } from "@/class/Filter";
import { Sorter } from "@/class/Sorter";
import {
  axiosDailyPanelGetList,
  axiosDailyPanelCreate,
} from "@/api/dailyPanel/index";

const inProgressPanel: LogPanel = new LogPanel({
  id: -2,
  next: -2,
  title: "IN PROGRESS",
  filters: [
    new Filter({
      field: "status",
      type: FieldTypes.SELECT,
      condition: FilterOperator.IS,
      value: { [FieldTypes.SELECT]: LogStatus.IN_PROGRESS },
    }),
  ],
  sorters: [],
  updateTimestamp: 0,
  createTimestamp: 0,
});
const historyPanel: LogPanel = new LogPanel({
  id: -1,
  next: -1,
  title: "HISTORY",
  filters: [
    new Filter({
      field: "status",
      type: FieldTypes.SELECT,
      condition: FilterOperator.IS_NOT,
      value: { [FieldTypes.SELECT]: LogStatus.IN_PROGRESS },
    }),
  ],
  sorters: [
    new Sorter({
      field: "startTimestamp",
      type: FieldTypes.TIME,
      direction: SorterDirection.DESC,
    }),
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
  getters: {
    _getDailyPanels(): LogPanel[] {
      return this.daily.userPanels.length
        ? this.daily.userPanels
        : this.daily.defaultPanels;
    },
  },
  actions: {
    async _actCreateDailyPanel(payload: LogPanelFields): Promise<void> {
      const { id } = await axiosDailyPanelCreate({
        title: payload.title,
        next: 0,
        filters: payload.filters.map((filter) => filter.config),
        sorters: payload.sorters.map((sorter) => sorter.config),
      });
      this.daily.userPanels.push(
        new LogPanel({
          ...payload,
          id,
          next: 0,
          updateTimestamp: Date.now(),
          createTimestamp: Date.now(),
        }),
      );
    },
    async _actFetchDailyPanels(): Promise<void> {
      const data = await axiosDailyPanelGetList();
      this.daily.userPanels = data.map(
        (panel) =>
          new LogPanel({
            ...panel,
            filters: panel.filters.map((filter) => new Filter(filter)),
            sorters: panel.sorters.map((sorter) => new Sorter(sorter)),
          }),
      );
    },
  },
});
