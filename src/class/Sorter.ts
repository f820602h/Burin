import type { KeysHasSameValueInObject } from "@/types/utility";
import { type FieldTypeMap, FieldTypes } from "@/types/fieldType";

export enum SorterDirection {
  ASC = "asc",
  DESC = "desc",
}

export const SORTER_DIRECTION_TEXT_MAP = {
  [SorterDirection.ASC]: "Ascending",
  [SorterDirection.DESC]: "Descending",
};

type StringSorterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.STRING}`, keyof T>;
  type: FieldTypes.STRING;
  direction: SorterDirection;
};

type NumberSorterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.NUMBER}`, keyof T>;
  type: FieldTypes.NUMBER;
  direction: SorterDirection;
};

type DateSorterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.DATE}`, keyof T>;
  type: FieldTypes.DATE;
  direction: SorterDirection;
};

type TimeSorterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.TIME}`, keyof T>;
  type: FieldTypes.TIME;
  direction: SorterDirection;
};

export type SorterConfig<T, TypeMap extends FieldTypeMap<T>> =
  | StringSorterConfig<T, TypeMap>
  | NumberSorterConfig<T, TypeMap>
  | DateSorterConfig<T, TypeMap>
  | TimeSorterConfig<T, TypeMap>;

export class Sorter<T, TypeMap extends FieldTypeMap<T>> {
  private sorterConfig: SorterConfig<T, TypeMap>[];

  constructor(sorterConfig: SorterConfig<T, TypeMap>[]) {
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
