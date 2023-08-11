import type { KeysHasSameValueInObject } from "@/types";
import { FieldTypes } from "./FieldTypeEnum";

export enum SorterDirection {
  ASC = "Ascending",
  DESC = "Descending",
}

type StringSorterConfig<T, Map extends Record<keyof T, FieldTypes>> = {
  field: KeysHasSameValueInObject<Map, `${FieldTypes.STRING}`, keyof T>;
  type: FieldTypes.STRING;
  direction: SorterDirection;
};

type NumberSorterConfig<T, Map extends Record<keyof T, FieldTypes>> = {
  field: KeysHasSameValueInObject<Map, `${FieldTypes.NUMBER}`, keyof T>;
  type: FieldTypes.NUMBER;
  direction: SorterDirection;
};

type DateSorterConfig<T, Map extends Record<keyof T, FieldTypes>> = {
  field: KeysHasSameValueInObject<Map, `${FieldTypes.DATE}`, keyof T>;
  type: FieldTypes.DATE;
  direction: SorterDirection;
};

type TimeSorterConfig<T, Map extends Record<keyof T, FieldTypes>> = {
  field: KeysHasSameValueInObject<Map, `${FieldTypes.TIME}`, keyof T>;
  type: FieldTypes.TIME;
  direction: SorterDirection;
};

export type SorterConfig<T, Map extends Record<keyof T, FieldTypes>> =
  | StringSorterConfig<T, Map>
  | NumberSorterConfig<T, Map>
  | DateSorterConfig<T, Map>
  | TimeSorterConfig<T, Map>;

export class Sorter<T, Map extends Record<keyof T, FieldTypes>> {
  private sorterConfig: SorterConfig<T, Map>[];

  constructor(sorterConfig: SorterConfig<T, Map>[]) {
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
