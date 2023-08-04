import { FieldTypes } from "./FieldTypeEnum";

export enum SorterDirection {
  ASC = "Ascending",
  DESC = "Descending",
}

type StringSorterConfig<T> = {
  field: keyof T;
  type: FieldTypes.STRING;
  direction: SorterDirection;
};

type NumberSorterConfig<T> = {
  field: keyof T;
  type: FieldTypes.NUMBER;
  direction: SorterDirection;
};

type DateSorterConfig<T> = {
  field: keyof T;
  type: FieldTypes.DATE;
  direction: SorterDirection;
};

type TimeSorterConfig<T> = {
  field: keyof T;
  type: FieldTypes.TIME;
  direction: SorterDirection;
};

export type SorterConfig<T> =
  | StringSorterConfig<T>
  | NumberSorterConfig<T>
  | DateSorterConfig<T>
  | TimeSorterConfig<T>;

export class Sorter<T> {
  private sorterConfig: SorterConfig<T>[];

  constructor(sorterConfig: SorterConfig<T>[]) {
    this.sorterConfig = sorterConfig;
  }

  execute(list: T[]): T[] {
    if (!this.sorterConfig.length || !list.length) return list;

    const listShallowCopy = [...list];
    const sorterFn: ((memberA: T, memberB: T) => number)[] = [];

    this.sorterConfig.forEach((config) => {
      const { field, type, direction } = config;
      switch (type) {
        case FieldTypes.STRING:
          sorterFn.push((memberA: T, memberB: T) => {
            const aValue = memberA[field];
            const bValue = memberB[field];
            if (typeof aValue !== "string" || typeof bValue !== "string") {
              return 0;
            }
            return direction === SorterDirection.ASC
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          });
          break;
        case FieldTypes.NUMBER:
        case FieldTypes.TIME:
        case FieldTypes.DATE:
          sorterFn.push((memberA: T, memberB: T) => {
            const aValue = memberA[field];
            const bValue = memberB[field];
            if (typeof aValue !== "number" || typeof bValue !== "number") {
              return 0;
            }
            return direction === SorterDirection.ASC
              ? aValue - bValue
              : bValue - aValue;
          });
          break;
      }
    });

    listShallowCopy.sort((a, b) => {
      const compareFn = sorterFn.find((fn) => fn(a, b));
      return compareFn ? compareFn(a, b) : 0;
    });

    return listShallowCopy;
  }
}
