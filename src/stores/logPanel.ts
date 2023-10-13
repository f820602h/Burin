import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
import { FieldTypes } from "@/types/fieldType";
import { type LogPanelFields } from "@/validation/logPanelField";
import { FilterOperator } from "@/class/Filter";
import { SorterDirection } from "@/class/Sorter";
import { type LogPanelInfo, LogPanel } from "@/class/Panel";
import { LogStatus } from "@/class/Log";
import { Filter } from "@/class/Filter";
import { Sorter } from "@/class/Sorter";
import {
  axiosDailyPanelGetList,
  axiosDailyPanelCreate,
  axiosDailyPanelUpdate,
  axiosDailyPanelDelete,
} from "@/api/dailyPanel/index";

const DEFAULT_PANEL_NAME = {
  IN_PROGRESS: "IN PROGRESS",
  HISTORY: "HISTORY",
};
const DEFAULT_PANEL_COOKIES_NAME = {
  [DEFAULT_PANEL_NAME.IN_PROGRESS]: "inProgressPanelVisibility",
  [DEFAULT_PANEL_NAME.HISTORY]: "historyPanelVisibility",
};

const cookies = useCookies();
const inProgressPanelVisibility = cookies.get(
  DEFAULT_PANEL_COOKIES_NAME[DEFAULT_PANEL_NAME.IN_PROGRESS],
);
const historyPanelVisibility = cookies.get(
  DEFAULT_PANEL_COOKIES_NAME[DEFAULT_PANEL_NAME.HISTORY],
);

const inProgressPanel: LogPanel = new LogPanel({
  id: -2,
  title: DEFAULT_PANEL_NAME.IN_PROGRESS,
  visibility:
    inProgressPanelVisibility === undefined
      ? true
      : !!Number(inProgressPanelVisibility),
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
  title: DEFAULT_PANEL_NAME.HISTORY,
  visibility:
    historyPanelVisibility === undefined
      ? true
      : !!Number(historyPanelVisibility),
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
      return [...this.daily.defaultPanels, ...this.daily.userPanels];
    },
  },
  actions: {
    async _actCreateDailyPanel(payload: LogPanelFields): Promise<void> {
      const { id } = await axiosDailyPanelCreate({
        title: payload.title,
        visibility: true,
        filters: payload.filters.map((filter) => filter.config),
        sorters: payload.sorters.map((sorter) => sorter.config),
      });
      this.daily.userPanels.push(
        new LogPanel({
          ...payload,
          id,
          visibility: true,
          updateTimestamp: Date.now(),
          createTimestamp: Date.now(),
        }),
      );
    },
    async _actUpdateDailyPanel(
      id: LogPanel["id"],
      payload: Partial<LogPanelInfo>,
    ): Promise<void> {
      const panel = this.daily.userPanels.find((panel) => panel.id === id);
      if (!panel) return;

      const isSuccess = await axiosDailyPanelUpdate({
        id,
        title: payload.title || panel.title,
        visibility: payload.visibility || panel.visibility,
        filters: (payload.filters || panel.filters).map((f) => f.config),
        sorters: (payload.sorters || panel.sorters).map((s) => s.config),
      });

      if (isSuccess) await this._actFetchDailyPanels();
    },
    async _actDeleteDailyPanel(id: LogPanel["id"]): Promise<void> {
      const isSuccess = await axiosDailyPanelDelete({ id: id });
      if (isSuccess) await this._actFetchDailyPanels();
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
    _actUpdateDefaultPanelVisibilityCookies(
      panelTitle: string,
      visibility: boolean,
    ): void {
      cookies.set(DEFAULT_PANEL_COOKIES_NAME[panelTitle], visibility ? 1 : 0);
    },
  },
});
