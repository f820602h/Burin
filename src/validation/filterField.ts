import { string, number, date, array, object, tuple, mixed } from "yup";
import type { StringSchema } from "yup";
import type { SelectOption } from "naive-ui";
import type { KeysHasSameValueInObject } from "@/types/utility";
import { type FilterConfig, FIELD_TYPE_OPERATORS_MAP } from "@/class/Filter";
import { type FieldValidation, MultiSelectFieldsName } from "./types";
import { FieldTypes, type FieldTypeMap } from "@/types/fieldType";

export enum FilterFieldsName {
  FIELD = "field",
  TYPE = "type",
  CONDITION = "condition",
  VALUE = "value",
}

export enum FilterMultiSelectFieldsName {
  BINDING = MultiSelectFieldsName.BINDING,
  ADDING = MultiSelectFieldsName.ADDING,
}

export type FilterFields<T, TypeMap extends FieldTypeMap<T>> = FilterConfig<
  T,
  TypeMap
>;

export type FilterSchemaParams<T, TypeMap extends FieldTypeMap<T>> = {
  targetTypeMap: TypeMap;
  targetTextMap: Partial<Record<keyof T, string>>;
  targetSelectFieldOptionsMap: Record<
    KeysHasSameValueInObject<TypeMap, `${FieldTypes.SELECT}`, keyof T>,
    SelectOption[]
  >;
  targetMultiSelectFieldOptionsMap: Record<
    KeysHasSameValueInObject<TypeMap, `${FieldTypes.MULTI_SELECT}`, keyof T>,
    SelectOption[]
  >;
};

export function createFilterSchema<T, TypeMap extends FieldTypeMap<T>>(
  config: FilterSchemaParams<T, TypeMap>
): FieldValidation {
  const filterFieldSchema: StringSchema = string()
    .oneOf(Object.keys(config.targetTextMap))
    .required("required fields");

  const filterTypeSchema: StringSchema = string()
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTextMap;
      return schema.oneOf([config.targetTypeMap[field]], "invalid type");
    })
    .required("required fields");

  const filterConditionSchema: StringSchema = string()
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTextMap;
      const options = FIELD_TYPE_OPERATORS_MAP[config.targetTypeMap[field]];
      return schema.oneOf(options, "invalid operator");
    })
    .required("required fields");

  const filterValueStringSchema = string()
    .max(40, "max 40 characters allowed")
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      const field = val as keyof typeof config.targetTextMap;
      if (!field || config.targetTypeMap[field] !== FieldTypes.STRING)
        return schema;
      return schema.required("required fields");
    });

  const filterValueNumberSchema = number()
    .integer("must be integer")
    .positive("must be positive")
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      const field = val as keyof typeof config.targetTextMap;
      if (!field || config.targetTypeMap[field] !== FieldTypes.NUMBER)
        return schema;
      return schema.required("required fields");
    });

  const filterValueTimeSchema = tuple([
    number().integer().positive().min(0).max(24).label("hours"),
    number().integer().positive().min(0).max(60).label("minutes"),
    number().integer().positive().min(0).max(60).label("seconds"),
  ]).when([FilterFieldsName.FIELD], ([val], schema) => {
    const field = val as keyof typeof config.targetTextMap;
    if (!field || config.targetTypeMap[field] !== FieldTypes.TIME)
      return schema;
    return schema.required("required fields");
  });

  const filterValueDateSchema = date().when(
    [FilterFieldsName.FIELD],
    ([val], schema) => {
      const field = val as keyof typeof config.targetTextMap;
      if (!field || config.targetTypeMap[field] !== FieldTypes.DATE)
        return schema;
      return schema.required("required fields");
    }
  );

  const filterValueSelectSchema = mixed().when(
    [FilterFieldsName.FIELD],
    ([val], schema) => {
      const field = val as keyof typeof config.targetTextMap;
      if (!field || config.targetTypeMap[field] !== FieldTypes.SELECT)
        return schema;
      const selectField =
        field as keyof typeof config.targetSelectFieldOptionsMap;
      return schema.oneOf(
        config.targetSelectFieldOptionsMap[selectField].map(
          (option) => option.value
        )
      );
    }
  );

  const filterValueMultiSelectSchema = object({
    [FilterMultiSelectFieldsName.BINDING]: array()
      .of(number())
      .max(5, "max 5 tags allowed"),
    [FilterMultiSelectFieldsName.ADDING]: string()
      .trim()
      .max(40, "max 40 characters allowed"),
  }).when([FilterFieldsName.FIELD], ([val], schema) => {
    const field = val as keyof typeof config.targetTextMap;
    if (!field || config.targetTypeMap[field] !== FieldTypes.MULTI_SELECT)
      return schema;
    return schema.required("required fields");
  });

  return {
    [FilterFieldsName.FIELD]: filterFieldSchema,
    [FilterFieldsName.TYPE]: filterTypeSchema,
    [FilterFieldsName.CONDITION]: filterConditionSchema,
    [FilterFieldsName.VALUE]: object({
      [FieldTypes.STRING]: filterValueStringSchema,
      [FieldTypes.NUMBER]: filterValueNumberSchema,
      [FieldTypes.TIME]: filterValueTimeSchema,
      [FieldTypes.DATE]: filterValueDateSchema,
      [FieldTypes.SELECT]: filterValueSelectSchema,
      [FieldTypes.MULTI_SELECT]: filterValueMultiSelectSchema,
    }),
  };
}
