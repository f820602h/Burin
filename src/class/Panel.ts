import type { Log } from "./Log";
import type { Category } from "@/class/Category";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

enum FieldTypes {
  STRING = "string",
  CATEGORIES = "categories",
  DATE = "date",
  TIMES = "times",
  TIME = "time",
}

enum SorterDirection {
  ASC = "Ascending",
  DESC = "Descending",
}

enum FilterOperator {
  IS = "IS",
  IS_NOT = "IS NOT",
  CONTAINS = "CONTAINS",
  NOT_CONTAIN = "NOT CONTAIN",
  BEFORE = "BEFORE",
  AFTER = "AFTER",
  BETWEEN = "BETWEEN",
  EQUAL = "=",
  NOT_EQUAL = "≠",
  GREATER_THAN = ">",
  LESS_THAN = "<",
  GREATER_THAN_OR_EQUAL = "≥",
  LESS_THAN_OR_EQUAL = "≤",
}

export const LOG_FIELD_TYPE_MAP: Omit<
  Record<keyof Log, FieldTypes>,
  "id" | "status" | "startTimeText" | "finishTimeText" | "pauseTimestamp"
> = {
  title: FieldTypes.STRING,
  categories: FieldTypes.CATEGORIES,
  startTimestamp: FieldTypes.DATE,
  finishTimestamp: FieldTypes.DATE,
  pauseTimes: FieldTypes.TIMES,
  pauseDurationTime: FieldTypes.TIME,
  durationTime: FieldTypes.TIME,
  createTimestamp: FieldTypes.DATE,
  updateTimestamp: FieldTypes.DATE,
};

export const FIELD_TYPE_CONDITION_OPERATORS_MAP = {
  [FieldTypes.STRING]: [
    FilterOperator.IS,
    FilterOperator.IS_NOT,
    FilterOperator.CONTAINS,
    FilterOperator.NOT_CONTAIN,
  ],
  [FieldTypes.CATEGORIES]: [
    FilterOperator.CONTAINS,
    FilterOperator.NOT_CONTAIN,
  ],
  [FieldTypes.DATE]: [
    FilterOperator.IS,
    FilterOperator.IS_NOT,
    FilterOperator.BEFORE,
    FilterOperator.AFTER,
    FilterOperator.BETWEEN,
  ],
  [FieldTypes.TIMES]: [
    FilterOperator.EQUAL,
    FilterOperator.NOT_EQUAL,
    FilterOperator.GREATER_THAN,
    FilterOperator.LESS_THAN,
    FilterOperator.GREATER_THAN_OR_EQUAL,
    FilterOperator.LESS_THAN_OR_EQUAL,
  ],
  [FieldTypes.TIME]: [
    FilterOperator.EQUAL,
    FilterOperator.NOT_EQUAL,
    FilterOperator.GREATER_THAN,
    FilterOperator.LESS_THAN,
    FilterOperator.GREATER_THAN_OR_EQUAL,
    FilterOperator.LESS_THAN_OR_EQUAL,
  ],
} as const;

type ColumnCount = 0.33 | 0.66 | 0.5 | 1;

class Panel {
  private column: ColumnCount = 1;

  constructor() {
    this.resize(1);
  }

  resize(col: ColumnCount) {
    this.column = col;
  }

  calculator(logs: Log[]): Log[] | string {
    return logs;
  }
}

type ListPanelSorterConfig = {
  direction: SorterDirection;
} & (
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "title">;
      type: FieldTypes.STRING;
    }
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "pauseTimes">;
      type: FieldTypes.TIMES;
    }
  | {
      field: keyof Pick<
        typeof LOG_FIELD_TYPE_MAP,
        | "startTimestamp"
        | "finishTimestamp"
        | "createTimestamp"
        | "updateTimestamp"
      >;
      type: FieldTypes.DATE;
    }
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "pauseDurationTime">;
      type: FieldTypes.TIME;
    }
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "categories">;
      type: FieldTypes.CATEGORIES;
    }
);

type ListPanelFilterConfig =
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "title">;
      type: FieldTypes.STRING;
      condition: typeof FIELD_TYPE_CONDITION_OPERATORS_MAP[FieldTypes.STRING][number];
      value: string;
    }
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "pauseTimes">;
      type: FieldTypes.TIMES;
      condition: typeof FIELD_TYPE_CONDITION_OPERATORS_MAP[FieldTypes.TIMES][number];
      value: number;
    }
  | ({
      field: keyof Pick<
        typeof LOG_FIELD_TYPE_MAP,
        | "startTimestamp"
        | "finishTimestamp"
        | "createTimestamp"
        | "updateTimestamp"
      >;
      type: FieldTypes.DATE;
    } & (
      | {
          condition: Exclude<
            typeof FIELD_TYPE_CONDITION_OPERATORS_MAP[FieldTypes.DATE][number],
            FilterOperator.BETWEEN
          >;
          value: number;
        }
      | {
          condition: FilterOperator.BETWEEN;
          value: number[];
        }
    ))
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "pauseDurationTime">;
      type: FieldTypes.TIME;
      condition: typeof FIELD_TYPE_CONDITION_OPERATORS_MAP[FieldTypes.TIME][number];
      value: number;
    }
  | {
      field: keyof Pick<typeof LOG_FIELD_TYPE_MAP, "categories">;
      type: FieldTypes.CATEGORIES;
      condition: typeof FIELD_TYPE_CONDITION_OPERATORS_MAP[FieldTypes.CATEGORIES][number];
      value: Category["id"][];
    };

export class ListPanel extends Panel {
  private filterConfig: ListPanelFilterConfig[];
  private sorterConfig: ListPanelSorterConfig[];

  constructor(config: {
    filterConfig: ListPanelFilterConfig[];
    sorterConfig: ListPanelSorterConfig[];
  }) {
    super();
    this.filterConfig = config.filterConfig;
    this.sorterConfig = config.sorterConfig;
  }

  private filter(logs: Log[]): Log[] {
    if (!this.filterConfig.length) return logs;

    const filterFn: ((log: Log, index: number, arr: Log[]) => boolean)[] = [];

    this.filterConfig.forEach((config) => {
      const { field, type, condition, value } = config;

      switch (type) {
        case FieldTypes.STRING:
          switch (condition) {
            case FilterOperator.IS:
              filterFn.push((log) => log[field] === value);
              break;
            case FilterOperator.IS_NOT:
              filterFn.push((log) => log[field] !== value);
              break;
            case FilterOperator.CONTAINS:
              filterFn.push((log) => {
                const str = log[field];
                return str.includes(value);
              });
              break;
            case FilterOperator.NOT_CONTAIN:
              filterFn.push((log) => {
                const str = log[field];
                return !str.includes(value);
              });
              break;
          }
          break;

        case FieldTypes.CATEGORIES:
          switch (condition) {
            case FilterOperator.CONTAINS:
              filterFn.push((log) => {
                const categories = log[field];
                return categories.some(
                  (category) => value.indexOf(category) >= 0
                );
              });
              break;
            case FilterOperator.NOT_CONTAIN:
              filterFn.push((log) => {
                const categories = log[field];
                return categories.every(
                  (category) => value.indexOf(category) < 0
                );
              });
              break;
          }
          break;

        case FieldTypes.DATE:
          switch (condition) {
            case FilterOperator.IS:
              filterFn.push((log) => log[field] === value);
              break;
            case FilterOperator.IS_NOT:
              filterFn.push((log) => log[field] !== value);
              break;
            case FilterOperator.BEFORE:
              filterFn.push((log) => log[field] < value);
              break;
            case FilterOperator.AFTER:
              filterFn.push((log) => log[field] > value);
              break;
            case FilterOperator.BETWEEN:
              filterFn.push((log) => {
                const [start, end] = value;
                return log[field] >= start && log[field] <= end;
              });
              break;
          }
          break;

        case FieldTypes.TIMES:
          switch (condition) {
            case FilterOperator.EQUAL:
              filterFn.push((log) => log[field] === value);
              break;
            case FilterOperator.NOT_EQUAL:
              filterFn.push((log) => log[field] !== value);
              break;
            case FilterOperator.GREATER_THAN:
              filterFn.push((log) => log[field] > value);
              break;
            case FilterOperator.LESS_THAN:
              filterFn.push((log) => log[field] < value);
              break;
            case FilterOperator.GREATER_THAN_OR_EQUAL:
              filterFn.push((log) => log[field] >= value);
              break;
            case FilterOperator.LESS_THAN_OR_EQUAL:
              filterFn.push((log) => log[field] <= value);
              break;
          }
          break;
        case FieldTypes.TIME:
          switch (condition) {
            case FilterOperator.EQUAL:
              filterFn.push((log) => log[field] === value);
              break;
            case FilterOperator.NOT_EQUAL:
              filterFn.push((log) => log[field] !== value);
              break;
            case FilterOperator.GREATER_THAN:
              filterFn.push((log) => log[field] > value);
              break;
            case FilterOperator.LESS_THAN:
              filterFn.push((log) => log[field] < value);
              break;
            case FilterOperator.GREATER_THAN_OR_EQUAL:
              filterFn.push((log) => log[field] >= value);
              break;
            case FilterOperator.LESS_THAN_OR_EQUAL:
              filterFn.push((log) => log[field] <= value);
              break;
          }
          break;
      }
    });

    return logs.filter((log, index, arr) => {
      return filterFn.every((fn) => fn(log, index, arr));
    });
  }

  private sort(logs: Log[]): Log[] {
    if (!this.sorterConfig.length) return logs;

    const logsShallowCopy = [...logs];
    const sortFn: ((a: Log, b: Log) => number)[] = [];

    this.sorterConfig.forEach((config) => {
      const { field, type, direction } = config;
      switch (type) {
        case FieldTypes.STRING:
          sortFn.push((a: Log, b: Log) => {
            const aValue = a[field];
            const bValue = b[field];
            return direction === SorterDirection.ASC
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          });
          break;
        case FieldTypes.TIMES:
        case FieldTypes.TIME:
        case FieldTypes.DATE:
          sortFn.push((a: Log, b: Log) => {
            const aValue = a[field];
            const bValue = b[field];
            return direction === SorterDirection.ASC
              ? aValue - bValue
              : bValue - aValue;
          });
          break;
      }
    });

    logsShallowCopy.sort((a, b) => {
      const compareFn = sortFn.find((fn) => fn(a, b));
      return compareFn ? compareFn(a, b) : 0;
    });

    return logsShallowCopy;
  }

  calculator(logs: Log[]): Log[] {
    return this.sort(this.filter(logs));
  }
}

type StatisticsPanelField = keyof Pick<
  typeof LOG_FIELD_TYPE_MAP,
  "pauseTimes" | "pauseDurationTime" | "durationTime"
>;

export class StatisticsPanel extends Panel {
  private field: StatisticsPanelField;

  constructor(field: StatisticsPanelField) {
    super();
    this.field = field;
  }

  private reduce(logs: Log[]): number {
    return logs.reduce((acc, log) => acc + log[this.field], 0);
  }

  private format(value: number): string {
    let result = "";
    switch (LOG_FIELD_TYPE_MAP[this.field]) {
      case FieldTypes.TIMES:
        result = String(value) + " times";
        break;
      case FieldTypes.TIME:
        result = durationTimeFormatter(value).completeText;
        break;
    }
    return result;
  }

  calculator(logs: Log[]): string {
    if (!logs.length) return "0";
    return this.format(this.reduce(logs));
  }
}
