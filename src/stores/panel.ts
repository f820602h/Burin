import { defineStore } from "pinia";
import type { Log, CurrentLog } from "@/class/Log";
import { FieldTypes } from "@/class/Field/FieldTypeEnum";
import { FilterOperator } from "@/class/Field/Filter";
import { SorterDirection } from "@/class/Field/Sorter";
import { Panel } from "@/class/Panel";
import { LogStatus, LOG_FIELD_TYPE_MAP } from "@/class/Log";

const inProgressPanel: Panel<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP> =
  new Panel({
    id: -2,
    order: -2,
    name: "IN PROGRESS",
    filterConfig: [
      {
        field: "status",
        type: FieldTypes.SELECT,
        condition: FilterOperator.IS,
        value: [LogStatus.IN_PROGRESS],
      },
    ],
    sorterConfig: [],
    updateTimestamp: 0,
    createTimestamp: 0,
  });
const historyPanel: Panel<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP> =
  new Panel({
    id: -1,
    order: -1,
    name: "HISTORY",
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

type Panels = {
  defaultPanels: Panel<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP>[];
  userPanels: Panel<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP>[];
};

export type PanelState = {
  daily: Panels;
};

export const usePanelStore = defineStore({
  id: "panel",
  state: (): PanelState => ({
    daily: {
      defaultPanels: [inProgressPanel, historyPanel],
      userPanels: [],
    },
  }),
  actions: {
    addPanel(panel: Panel<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP>) {
      this.daily.userPanels.push(panel);
    },
  },
});
