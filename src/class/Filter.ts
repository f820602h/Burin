import type { KeysHasSameValueInObject } from "@/types/utility";
import { FieldTypes, type FieldTypeMap } from "../types/fieldType";

export enum FilterOperator {
  IS = "is",
  IS_NOT = "isNot",
  CONTAINS = "contains",
  NOT_CONTAIN = "notContain",
  BEFORE = "before",
  AFTER = "after",
  BETWEEN = "between",
  EQUAL = "equal",
  NOT_EQUAL = "notEqual",
  GREATER_THAN = "greaterThan",
  LESS_THAN = "lessThan",
  GREATER_THAN_OR_EQUAL = "greaterThanOrEqual",
  LESS_THAN_OR_EQUAL = "lessThanOrEqual",
}

export const FILTER_OPERATORS_TEXT_MAP = {
  [FilterOperator.IS_NOT]: "IS NOT",
  [FilterOperator.IS]: "IS",
  [FilterOperator.CONTAINS]: "CONTAINS",
  [FilterOperator.NOT_CONTAIN]: "NOT CONTAIN",
  [FilterOperator.BEFORE]: "BEFORE",
  [FilterOperator.AFTER]: "AFTER",
  [FilterOperator.BETWEEN]: "BETWEEN",
  [FilterOperator.EQUAL]: "=",
  [FilterOperator.NOT_EQUAL]: "≠",
  [FilterOperator.GREATER_THAN]: ">",
  [FilterOperator.LESS_THAN]: "<",
  [FilterOperator.GREATER_THAN_OR_EQUAL]: "≥",
  [FilterOperator.LESS_THAN_OR_EQUAL]: "≤",
};

export const FIELD_TYPE_OPERATORS_MAP = {
  [FieldTypes.STRING]: [
    FilterOperator.IS,
    FilterOperator.IS_NOT,
    FilterOperator.CONTAINS,
    FilterOperator.NOT_CONTAIN,
  ],
  [FieldTypes.NUMBER]: [
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
  [FieldTypes.DATE]: [
    FilterOperator.IS,
    FilterOperator.IS_NOT,
    FilterOperator.BEFORE,
    FilterOperator.AFTER,
    FilterOperator.BETWEEN,
  ],
  [FieldTypes.SELECT]: [FilterOperator.IS, FilterOperator.IS_NOT],
  [FieldTypes.MULTI_SELECT]: [
    FilterOperator.CONTAINS,
    FilterOperator.NOT_CONTAIN,
  ],
} as const;

type StringFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.STRING}`, keyof T>;
  type: FieldTypes.STRING;
  condition: typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.STRING][number];
  value: string;
};

type NumberFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.NUMBER}`, keyof T>;
  type: FieldTypes.NUMBER;
  condition: typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.NUMBER][number];
  value: number;
};

type DateFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.DATE}`, keyof T>;
  type: FieldTypes.DATE;
} & (
  | {
      condition: Exclude<
        typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.DATE][number],
        FilterOperator.BETWEEN
      >;
      value: number;
    }
  | {
      condition: FilterOperator.BETWEEN;
      value: number[];
    }
);

type TimeFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.TIME}`, keyof T>;
  type: FieldTypes.TIME;
  condition: typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.TIME][number];
  value: number;
};

type SelectFilterConfig<
  T,
  TypeMap extends FieldTypeMap<T>,
  K extends keyof T = KeysHasSameValueInObject<
    TypeMap,
    `${FieldTypes.SELECT}`,
    keyof T
  >
> = {
  field: K;
  type: FieldTypes.SELECT;
  condition: typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.SELECT][number];
  value: T[K][];
};

type MultiSelectFilterConfig<
  T,
  TypeMap extends FieldTypeMap<T>,
  K extends keyof T = KeysHasSameValueInObject<
    TypeMap,
    `${FieldTypes.MULTI_SELECT}`,
    keyof T
  >
> = {
  field: K;
  type: FieldTypes.MULTI_SELECT;
  condition: typeof FIELD_TYPE_OPERATORS_MAP[FieldTypes.MULTI_SELECT][number];
  value: T[K] extends any[] ? T[K] : T[K][];
};

export type FilterConfig<T, TypeMap extends FieldTypeMap<T>> =
  | StringFilterConfig<T, TypeMap>
  | NumberFilterConfig<T, TypeMap>
  | DateFilterConfig<T, TypeMap>
  | TimeFilterConfig<T, TypeMap>
  | SelectFilterConfig<T, TypeMap>
  | MultiSelectFilterConfig<T, TypeMap>;

export class Filter<T, TypeMap extends FieldTypeMap<T>> {
  private filterConfig: FilterConfig<T, TypeMap>[];

  constructor(filterConfig: FilterConfig<T, TypeMap>[]) {
    this.filterConfig = filterConfig;
  }

  execute(list: T[]): T[] {
    if (!this.filterConfig.length || !list.length) return list;

    const filterFn: ((member: T, index: number, arr: T[]) => boolean)[] = [];

    this.filterConfig.forEach((config) => {
      const { field, type, condition, value } = config;

      switch (type) {
        case FieldTypes.STRING:
          switch (condition) {
            case FilterOperator.IS:
              filterFn.push((member) => member[field] === value);
              break;
            case FilterOperator.IS_NOT:
              filterFn.push((member) => member[field] !== value);
              break;
            case FilterOperator.CONTAINS:
              filterFn.push((member) => {
                const str = member[field];
                if (typeof str !== "string") return false;
                return str.includes(value);
              });
              break;
            case FilterOperator.NOT_CONTAIN:
              filterFn.push((member) => {
                const str = member[field];
                if (typeof str !== "string") return false;
                return !str.includes(value);
              });
              break;
          }
          break;

        case FieldTypes.SELECT:
          switch (condition) {
            case FilterOperator.IS:
              filterFn.push((member) => value.includes(member[field]));
              break;
            case FilterOperator.IS_NOT:
              filterFn.push((member) => !value.includes(member[field]));
              break;
          }
          break;

        case FieldTypes.MULTI_SELECT:
          switch (condition) {
            case FilterOperator.CONTAINS:
              filterFn.push((member) => {
                const options = member[field];
                if (!Array.isArray(options)) return false;
                return options.some((option) => value.indexOf(option) >= 0);
              });
              break;
            case FilterOperator.NOT_CONTAIN:
              filterFn.push((member) => {
                const options = member[field];
                if (!Array.isArray(options)) return false;
                return options.every((option) => value.indexOf(option) < 0);
              });
              break;
          }
          break;

        case FieldTypes.DATE:
          switch (condition) {
            case FilterOperator.IS:
              filterFn.push((member) => member[field] === value);
              break;
            case FilterOperator.IS_NOT:
              filterFn.push((member) => member[field] !== value);
              break;
            case FilterOperator.BEFORE:
              filterFn.push((member) => {
                const date = member[field];
                if (typeof date !== "number") return false;
                return date < value;
              });
              break;
            case FilterOperator.AFTER:
              filterFn.push((member) => {
                const date = member[field];
                if (typeof date !== "number") return false;
                return date > value;
              });
              break;
            case FilterOperator.BETWEEN:
              filterFn.push((member) => {
                const [start, end] = value;
                const date = member[field];
                if (typeof date !== "number") return false;
                return date >= start && date <= end;
              });
              break;
          }
          break;

        case FieldTypes.NUMBER:
          switch (condition) {
            case FilterOperator.EQUAL:
              filterFn.push((member) => member[field] === value);
              break;
            case FilterOperator.NOT_EQUAL:
              filterFn.push((member) => member[field] !== value);
              break;
            case FilterOperator.GREATER_THAN:
              filterFn.push((member) => {
                const num = member[field];
                if (typeof num !== "number") return false;
                return num > value;
              });
              break;
            case FilterOperator.LESS_THAN:
              filterFn.push((member) => {
                const num = member[field];
                if (typeof num !== "number") return false;
                return num < value;
              });
              break;
            case FilterOperator.GREATER_THAN_OR_EQUAL:
              filterFn.push((member) => {
                const num = member[field];
                if (typeof num !== "number") return false;
                return num >= value;
              });
              break;
            case FilterOperator.LESS_THAN_OR_EQUAL:
              filterFn.push((member) => {
                const num = member[field];
                if (typeof num !== "number") return false;
                return num <= value;
              });
              break;
          }
          break;
        case FieldTypes.TIME:
          switch (condition) {
            case FilterOperator.EQUAL:
              filterFn.push((member) => member[field] === value);
              break;
            case FilterOperator.NOT_EQUAL:
              filterFn.push((member) => member[field] !== value);
              break;
            case FilterOperator.GREATER_THAN:
              filterFn.push((member) => {
                const time = member[field];
                if (typeof time !== "number") return false;
                return time > value;
              });
              break;
            case FilterOperator.LESS_THAN:
              filterFn.push((member) => {
                const time = member[field];
                if (typeof time !== "number") return false;
                return time < value;
              });
              break;
            case FilterOperator.GREATER_THAN_OR_EQUAL:
              filterFn.push((member) => {
                const time = member[field];
                if (typeof time !== "number") return false;
                return time >= value;
              });
              break;
            case FilterOperator.LESS_THAN_OR_EQUAL:
              filterFn.push((member) => {
                const time = member[field];
                if (typeof time !== "number") return false;
                return time <= value;
              });
              break;
          }
          break;
      }
    });

    return list.filter((item, index, arr) => {
      return filterFn.every((fn) => fn(item, index, arr));
    });
  }
}
