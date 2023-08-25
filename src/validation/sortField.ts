import { string, type StringSchema } from "yup";
import type { FieldValidation } from "./types";
import type { FieldTypeMap } from "@/types/fieldType";
import { type SorterConfig, SorterDirection } from "@/class/Sorter";

export enum SortFieldsName {
  FIELD = "field",
  TYPE = "type",
  DIRECTION = "direction",
}

export type SortFields<T, TypeMap extends FieldTypeMap<T>> = SorterConfig<
  T,
  TypeMap
>;

export type SortSchemaParams<T, TypeMap extends FieldTypeMap<T>> = {
  targetTypeMap: TypeMap;
  targetTextMap: Partial<Record<keyof T, string>>;
};

export function createSortSchema<T, TypeMap extends FieldTypeMap<T>>(
  config: SortSchemaParams<T, TypeMap>
): FieldValidation {
  const sortTypeSchema: StringSchema = string()
    .when([SortFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTextMap;
      return schema.oneOf([config.targetTypeMap[field]], "invalid type");
    })
    .required("required fields");

  return {
    [SortFieldsName.FIELD]: string()
      .oneOf(Object.keys(config.targetTextMap))
      .required("required fields"),
    [SortFieldsName.TYPE]: sortTypeSchema,
    [SortFieldsName.DIRECTION]: string()
      .oneOf(Object.values(SorterDirection))
      .required("required fields"),
  };
}
