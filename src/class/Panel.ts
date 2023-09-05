import type { FieldTypeMap } from "@/types/fieldType";
import { Filter } from "./Filter";
import { Sorter } from "./Sorter";
import type { Log, CurrentLog, LOG_FIELD_TYPE_MAP } from "./Log";

interface PanelId {
  id: number;
}

interface PanelInfo<T, TypeMap extends FieldTypeMap<T>> extends PanelId {
  title: string;
  order: number;
  filters: Filter<T, TypeMap>[];
  sorters: Sorter<T, TypeMap>[];
}

export interface PanelCompleteInfo<T, TypeMap extends FieldTypeMap<T>>
  extends PanelInfo<T, TypeMap> {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Panel<T, TypeMap extends FieldTypeMap<T>> {
  id: number;
  title: string;
  order: number;
  filters: Filter<T, TypeMap>[];
  sorters: Sorter<T, TypeMap>[];
  createTimestamp: number;
  updateTimestamp: number;

  constructor(panel: PanelCompleteInfo<T, TypeMap>) {
    this.id = panel.id;
    this.title = panel.title;
    this.order = panel.order;
    this.filters = panel.filters;
    this.sorters = panel.sorters;
    this.createTimestamp = panel.createTimestamp;
    this.updateTimestamp = panel.updateTimestamp;
  }

  calculator(list: T[]): T[] {
    if (!list.length) return list;

    return list
      .filter((member) => {
        if (!this.filters.length) return true;
        return this.filters.every((filter) => {
          return filter.cb(member);
        });
      })
      .sort((memberA, memberB) => {
        if (!this.sorters.length) return 0;
        return this.sorters.reduce((result, sorter) => {
          return result || sorter.cb(memberA, memberB);
        }, 0);
      });
  }
}

export class LogPanel extends Panel<
  Log | CurrentLog,
  typeof LOG_FIELD_TYPE_MAP
> {
  constructor(
    panel: PanelCompleteInfo<Log | CurrentLog, typeof LOG_FIELD_TYPE_MAP>
  ) {
    super(panel);
  }
}
