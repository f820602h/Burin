import type { FieldTypeMap } from "@/types/fieldType";
import { Filter, type FilterConfig } from "./Filter";
import { Sorter, type SorterConfig } from "./Sorter";
import type { Log, CurrentLog, LOG_FIELD_TYPE_MAP } from "./Log";

interface PanelId {
  id: number;
}

interface PanelInfo<T, TypeMap extends FieldTypeMap<T>> extends PanelId {
  title: string;
  order: number;
  filterConfig: FilterConfig<T, TypeMap>[];
  sorterConfig: SorterConfig<T, TypeMap>[];
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
  filterConfig: FilterConfig<T, TypeMap>[];
  sorterConfig: SorterConfig<T, TypeMap>[];
  createTimestamp: number;
  updateTimestamp: number;
  Filter: Filter<T, TypeMap>;
  Sorter: Sorter<T, TypeMap>;

  constructor(panel: PanelCompleteInfo<T, TypeMap>) {
    this.id = panel.id;
    this.title = panel.title;
    this.order = panel.order;
    this.filterConfig = panel.filterConfig;
    this.sorterConfig = panel.sorterConfig;
    this.createTimestamp = panel.createTimestamp;
    this.updateTimestamp = panel.updateTimestamp;
    this.Filter = new Filter(this.filterConfig);
    this.Sorter = new Sorter(this.sorterConfig);
  }

  calculator(list: T[]): T[] {
    return this.Sorter.execute(this.Filter.execute(list));
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
