import type { KeysHasSameValueInObject } from "@/types/utility";
import { type FieldTypeMap, FieldTypes } from "../types/fieldType";

export enum FilterOperator {
  IS = "is",
  IS_NOT = "isNot",
  CONTAINS = "contains",
  NOT_CONTAIN = "notContain",
  INCLUDES = "includes",
  NOT_INCLUDES = "notIncludes",
  BEFORE = "before",
  AFTER = "after",
  BETWEEN = "between",
  EQUAL = "equal",
  NOT_EQUAL = "notEqual",
  GREATER_THAN = "greaterThan",
  LESS_THAN = "lessThan",
  GREATER_THAN_OR_EQUAL = "greaterThanOrEqual",
  LESS_THAN_OR_EQUAL = "lessThanOrEqual",
  LONGER_THAN = "longerThan",
  SHORTER_THAN = "shorterThan",
}

export const FILTER_OPERATORS_TEXT_MAP = {
  [FilterOperator.IS_NOT]: "is not",
  [FilterOperator.IS]: "is",
  [FilterOperator.CONTAINS]: "contains",
  [FilterOperator.NOT_CONTAIN]: "does not contains",
  [FilterOperator.INCLUDES]: "includes",
  [FilterOperator.NOT_INCLUDES]: "does not includes",
  [FilterOperator.BEFORE]: "is before",
  [FilterOperator.AFTER]: "is after",
  [FilterOperator.BETWEEN]: "is between",
  [FilterOperator.EQUAL]: "=",
  [FilterOperator.NOT_EQUAL]: "≠",
  [FilterOperator.GREATER_THAN]: ">",
  [FilterOperator.LESS_THAN]: "<",
  [FilterOperator.GREATER_THAN_OR_EQUAL]: "≥",
  [FilterOperator.LESS_THAN_OR_EQUAL]: "≤",
  [FilterOperator.LONGER_THAN]: "longer than",
  [FilterOperator.SHORTER_THAN]: "shorter than",
} satisfies Record<FilterOperator, string>;

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
  [FieldTypes.DURATION]: [
    FilterOperator.LONGER_THAN,
    FilterOperator.SHORTER_THAN,
  ],
  [FieldTypes.TIME]: [
    FilterOperator.BEFORE,
    FilterOperator.AFTER,
    FilterOperator.BETWEEN,
  ],
  [FieldTypes.SELECT]: [FilterOperator.IS, FilterOperator.IS_NOT],
  [FieldTypes.MULTI_SELECT]: [
    FilterOperator.CONTAINS,
    FilterOperator.INCLUDES,
    FilterOperator.NOT_INCLUDES,
  ],
} satisfies Record<FieldTypes, FilterOperator[]>;

type StringFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.STRING}`, keyof T>;
  type: `${FieldTypes.STRING}`;
  condition: (typeof FIELD_TYPE_OPERATORS_MAP)[FieldTypes.STRING][number];
  value: {
    [FieldTypes.STRING]: string;
  };
};

type NumberFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.NUMBER}`, keyof T>;
  type: `${FieldTypes.NUMBER}`;
  condition: (typeof FIELD_TYPE_OPERATORS_MAP)[FieldTypes.NUMBER][number];
  value: {
    [FieldTypes.NUMBER]: number;
  };
};

type DurationFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.DURATION}`, keyof T>;
  type: `${FieldTypes.DURATION}`;
  condition: (typeof FIELD_TYPE_OPERATORS_MAP)[FieldTypes.DURATION][number];
  value: {
    [FieldTypes.DURATION]: [number, number, number];
  };
};

type TimeFilterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.TIME}`, keyof T>;
  type: `${FieldTypes.TIME}`;
} & (
  | {
      condition: FilterOperator.BEFORE;
      value: {
        [FieldTypes.TIME]: {
          [FilterOperator.BEFORE]: [number, number];
        };
      };
    }
  | {
      condition: FilterOperator.AFTER;
      value: {
        [FieldTypes.TIME]: {
          [FilterOperator.AFTER]: [number, number];
        };
      };
    }
  | {
      condition: FilterOperator.BETWEEN;
      value: {
        [FieldTypes.TIME]: {
          [FilterOperator.BETWEEN]: [[number, number], [number, number]];
        };
      };
    }
);

type SelectFilterConfig<
  T,
  TypeMap extends FieldTypeMap<T>,
  K extends keyof T = KeysHasSameValueInObject<
    TypeMap,
    `${FieldTypes.SELECT}`,
    keyof T
  >,
> = {
  field: K;
  type: `${FieldTypes.SELECT}`;
  condition: (typeof FIELD_TYPE_OPERATORS_MAP)[FieldTypes.SELECT][number];
  value: {
    [FieldTypes.SELECT]: T[K];
  };
};

type MultiSelectFilterConfig<
  T,
  TypeMap extends FieldTypeMap<T>,
  K extends keyof T = KeysHasSameValueInObject<
    TypeMap,
    `${FieldTypes.MULTI_SELECT}`,
    keyof T
  >,
> = {
  field: K;
  type: `${FieldTypes.MULTI_SELECT}`;
  condition: (typeof FIELD_TYPE_OPERATORS_MAP)[FieldTypes.MULTI_SELECT][number];
  value: {
    [FieldTypes.MULTI_SELECT]: T[K] extends any[] ? T[K] : T[K][];
  };
};

export type FilterConfig<T, TypeMap extends FieldTypeMap<T>> =
  | StringFilterConfig<T, TypeMap>
  | NumberFilterConfig<T, TypeMap>
  | DurationFilterConfig<T, TypeMap>
  | TimeFilterConfig<T, TypeMap>
  | SelectFilterConfig<T, TypeMap>
  | MultiSelectFilterConfig<T, TypeMap>;

export class Filter<T, TypeMap extends FieldTypeMap<T>> {
  config: FilterConfig<T, TypeMap>;
  cb: (member: T, index?: number, arr?: T[]) => boolean;

  constructor(config: FilterConfig<T, TypeMap>) {
    this.config = config;
    this.cb = (member) => {
      const { field, type, condition, value } = this.config;

      switch (type) {
        case FieldTypes.STRING:
          switch (condition) {
            case FilterOperator.IS:
              return (
                String(member[field]).toLowerCase() ===
                value[FieldTypes.STRING].toLowerCase()
              );

            case FilterOperator.IS_NOT:
              return (
                String(member[field]).toLowerCase() !==
                value[FieldTypes.STRING].toLowerCase()
              );

            case FilterOperator.CONTAINS: {
              const str = String(member[field]).toLowerCase();
              if (typeof str !== "string") return false;
              return str.includes(value[FieldTypes.STRING].toLowerCase());
            }
            case FilterOperator.NOT_CONTAIN: {
              const str = String(member[field]).toLowerCase();
              if (typeof str !== "string") return false;
              return !str.includes(value[FieldTypes.STRING].toLowerCase());
            }
            default:
              return false;
          }
          break;

        case FieldTypes.NUMBER:
          switch (condition) {
            case FilterOperator.EQUAL:
              return member[field] === value;

            case FilterOperator.NOT_EQUAL:
              return member[field] !== value;

            case FilterOperator.GREATER_THAN: {
              const num = member[field];
              if (typeof num !== "number") return false;
              return num > value[FieldTypes.NUMBER];
            }
            case FilterOperator.LESS_THAN: {
              const num = member[field];
              if (typeof num !== "number") return false;
              return num < value[FieldTypes.NUMBER];
            }
            case FilterOperator.GREATER_THAN_OR_EQUAL: {
              const num = member[field];
              if (typeof num !== "number") return false;
              return num >= value[FieldTypes.NUMBER];
            }
            case FilterOperator.LESS_THAN_OR_EQUAL: {
              const num = member[field];
              if (typeof num !== "number") return false;
              return num <= value[FieldTypes.NUMBER];
            }
            default:
              return false;
          }
          break;

        case FieldTypes.DURATION:
          switch (condition) {
            case FilterOperator.LONGER_THAN: {
              const duration = member[field];
              if (typeof duration !== "number") return false;
              const [hour, min, sec] = value[FieldTypes.DURATION];
              const valueDurationMillisecond =
                (hour * (60 * 60) + min * 60 + sec) * 1000;
              return duration >= valueDurationMillisecond;
            }
            case FilterOperator.SHORTER_THAN: {
              const duration = member[field];
              if (typeof duration !== "number") return false;
              const [hour, min, sec] = value[FieldTypes.DURATION];
              const valueDurationMillisecond =
                (hour * (60 * 60) + min * 60 + sec) * 1000;
              return duration <= valueDurationMillisecond;
            }
            default:
              return false;
          }
          break;

        case FieldTypes.TIME:
          switch (condition) {
            case FilterOperator.BEFORE: {
              const time = member[field];
              if (typeof time !== "number") return false;
              const targetH = new Date(time).getHours();
              const targetM = new Date(time).getMinutes();
              const [h, m] = value[FieldTypes.TIME][FilterOperator.BEFORE];
              return targetH < h || (targetH === h && targetM < m);
            }
            case FilterOperator.AFTER: {
              const time = member[field];
              if (typeof time !== "number") return false;
              const targetH = new Date(time).getHours();
              const targetM = new Date(time).getMinutes();
              const [h, m] = value[FieldTypes.TIME][FilterOperator.AFTER];
              return targetH > h || (targetH === h && targetM > m);
            }
            case FilterOperator.BETWEEN: {
              const time = member[field];
              if (typeof time !== "number") return false;
              const targetH = new Date(time).getHours();
              const targetM = new Date(time).getMinutes();
              const [[startH, startM], [endH, endM]] =
                value[FieldTypes.TIME][FilterOperator.BETWEEN];
              const isAfterStart =
                targetH > startH || (targetH === startH && targetM >= startM);
              const isBeforeEnd =
                targetH < endH || (targetH === endH && targetM <= endM);
              return isAfterStart && isBeforeEnd;
            }
            default:
              return false;
          }
          break;

        case FieldTypes.SELECT:
          switch (condition) {
            case FilterOperator.IS:
              return value[FieldTypes.SELECT] === member[field];

            case FilterOperator.IS_NOT:
              return value[FieldTypes.SELECT] !== member[field];
            default:
              return false;
          }
          break;

        case FieldTypes.MULTI_SELECT:
          switch (condition) {
            case FilterOperator.CONTAINS: {
              const options = member[field];
              if (!Array.isArray(options)) return false;
              return value[FieldTypes.MULTI_SELECT].every((val) =>
                options.includes(val),
              );
            }

            case FilterOperator.INCLUDES: {
              const options = member[field];
              if (!Array.isArray(options)) return false;
              return value[FieldTypes.MULTI_SELECT].some((val) =>
                options.includes(val),
              );
            }

            case FilterOperator.NOT_INCLUDES: {
              const options = member[field];
              if (!Array.isArray(options)) return false;
              return value[FieldTypes.MULTI_SELECT].every(
                (val) => !options.includes(val),
              );
            }
            default:
              return false;
          }
          break;

        default:
          return false;
      }
    };
  }
}
