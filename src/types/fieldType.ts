export enum FieldTypes {
  STRING = "string",
  NUMBER = "number",
  SELECT = "select",
  MULTI_SELECT = "multi-select",
  TIME = "time",
  DURATION = "duration",
}

export type FieldTypeMap<T> = Partial<Record<keyof T, FieldTypes>>;
