import { Filter, type FilterConfig } from "./Field/Filter";
import { Sorter, type SorterConfig } from "./Field/Sorter";

interface PanelId {
  id: number;
}

interface PanelInfo<T> extends PanelId {
  name: string;
  order: number;
  filterConfig: FilterConfig<T>[];
  sorterConfig: SorterConfig<T>[];
}

export interface PanelCompleteInfo<T> extends PanelInfo<T> {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Panel<T> {
  id: number;
  name: string;
  order: number;
  filterConfig: FilterConfig<T>[];
  sorterConfig: SorterConfig<T>[];
  createTimestamp: number;
  updateTimestamp: number;
  Filter: Filter<T>;
  Sorter: Sorter<T>;

  constructor(panel: PanelCompleteInfo<T>) {
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

class PanelManager {
  private panels: PanelCompleteInfo<any>[];

  constructor() {
    this.panels = [];
  }

  addPanel<T>(panel: PanelInfo<T>): Panel<T> {
    const panelCompleteInfo = {
      ...panel,
      createTimestamp: Date.now(),
      updateTimestamp: Date.now(),
    };
    this.panels.push(panelCompleteInfo);
    return new Panel(panelCompleteInfo);
  }

  getPanel<T>(id: number): Panel<T> | null {
    const panel = this.panels.find((panel) => panel.id === id);
    if (!panel) return null;
    return new Panel(panel);
  }

  getPanels<T>(): Panel<T>[] {
    return this.panels.map((panel) => new Panel(panel));
  }

  updatePanel<T>(panel: PanelCompleteInfo<T>): Panel<T> {
    const index = this.panels.findIndex((p) => p.id === panel.id);
    if (index === -1) throw new Error("Panel not found");
    this.panels[index] = {
      ...panel,
      updateTimestamp: Date.now(),
    };
    return new Panel(this.panels[index]);
  }

  deletePanel(id: number): boolean {
    const index = this.panels.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.panels.splice(index, 1);
    return true;
  }
}
