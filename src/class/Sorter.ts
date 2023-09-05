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

type DurationSorterConfig<T, TypeMap extends FieldTypeMap<T>> = {
  field: KeysHasSameValueInObject<TypeMap, `${FieldTypes.DURATION}`, keyof T>;
  type: FieldTypes.DURATION;
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
  | DurationSorterConfig<T, TypeMap>
  | TimeSorterConfig<T, TypeMap>;

export class Sorter<T, TypeMap extends FieldTypeMap<T>> {
  private sorterConfig: SorterConfig<T, TypeMap>;
  cb: (memberA: T, memberB: T) => number;

  constructor(sorterConfig: SorterConfig<T, TypeMap>) {
    this.sorterConfig = sorterConfig;
    this.cb = (memberA, memberB) => {
      const { field, type, direction } = this.sorterConfig;

      switch (type) {
        case FieldTypes.STRING: {
          const aValue = memberA[field];
          const bValue = memberB[field];
          if (typeof aValue !== "string" || typeof bValue !== "string") {
            return 0;
          }
          return direction === SorterDirection.ASC
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        case FieldTypes.NUMBER:
        case FieldTypes.DURATION:
        case FieldTypes.TIME: {
          const aValue = memberA[field];
          const bValue = memberB[field];
          if (typeof aValue !== "number" || typeof bValue !== "number") {
            return 0;
          }
          return direction === SorterDirection.ASC
            ? aValue - bValue
            : bValue - aValue;
        }
      }
    };
  }
}
