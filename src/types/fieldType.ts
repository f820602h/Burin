export enum FieldTypes {
  STRING = "string",
  NUMBER = "number",
  SELECT = "select",
  MULTI_SELECT = "multi-select",
  DATE = "date",
  TIME = "time",
}

export type FieldTypeMap<T> = Record<keyof T, FieldTypes>;
