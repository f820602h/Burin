import type { FieldTypes } from "./Field/FieldTypeEnum";
import { Filter, type FilterConfig } from "./Field/Filter";
import { Sorter, type SorterConfig } from "./Field/Sorter";

interface PanelId {
  id: number;
}

interface PanelInfo<T, Map extends Record<keyof T, FieldTypes>>
  extends PanelId {
  name: string;
  order: number;
  filterConfig: FilterConfig<T, Map>[];
  sorterConfig: SorterConfig<T, Map>[];
}

export interface PanelCompleteInfo<T, Map extends Record<keyof T, FieldTypes>>
  extends PanelInfo<T, Map> {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Panel<T, Map extends Record<keyof T, FieldTypes>> {
  id: number;
  name: string;
  order: number;
  filterConfig: FilterConfig<T, Map>[];
  sorterConfig: SorterConfig<T, Map>[];
  createTimestamp: number;
  updateTimestamp: number;
  Filter: Filter<T, Map>;
  Sorter: Sorter<T, Map>;

  constructor(panel: PanelCompleteInfo<T, Map>) {
    this.id = panel.id;
    this.name = panel.name;
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
