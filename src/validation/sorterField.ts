import { string, type StringSchema } from "yup";
import type { FieldValidation } from "./types";
import type { FieldTypeMap } from "@/types/fieldType";
import { type SorterConfig, SorterDirection } from "@/class/Sorter";

export enum SorterFieldsName {
  FIELD = "field",
  TYPE = "type",
  DIRECTION = "direction",
}

export type SorterFields<T, TypeMap extends FieldTypeMap<T>> = SorterConfig<
  T,
  TypeMap
>;

export type SorterSchemaParams<T, TypeMap extends FieldTypeMap<T>> = {
  targetTypeMap: TypeMap;
  targetTextMap: Partial<Record<keyof T, string>>;
};

export function createSorterSchema<T, TypeMap extends FieldTypeMap<T>>(
  config: SorterSchemaParams<T, TypeMap>,
): FieldValidation {
  const sortTypeSchema: StringSchema = string()
    .when([SorterFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTextMap;
      return schema.oneOf([config.targetTypeMap[field]], "invalid type");
    })
    .required("required fields");

  return {
    [SorterFieldsName.FIELD]: string()
      .oneOf(Object.keys(config.targetTextMap))
      .required("required fields"),
    [SorterFieldsName.TYPE]: sortTypeSchema,
    [SorterFieldsName.DIRECTION]: string()
      .oneOf(Object.values(SorterDirection))
      .required("required fields"),
  };
}
