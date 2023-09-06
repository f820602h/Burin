import { string, number, object, tuple, mixed, array } from "yup";
import type { StringSchema } from "yup";
import type { SelectOption } from "naive-ui";
import type { KeysHasSameValueInObject } from "@/types/utility";
import {
  type FilterConfig,
  FIELD_TYPE_OPERATORS_MAP,
  FilterOperator,
} from "@/class/Filter";
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
  targetTextMap: Partial<Record<keyof TypeMap, string>>;
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
  config: FilterSchemaParams<T, TypeMap>,
): FieldValidation {
  const filterFieldSchema: StringSchema = string()
    .required("required fields")
    .oneOf(Object.keys(config.targetTextMap));

  const filterTypeSchema: StringSchema = string()
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTypeMap;
      return schema.oneOf([config.targetTypeMap[field]], "invalid type");
    })
    .required("required fields");

  const filterConditionSchema: StringSchema = string()
    .when([FilterFieldsName.FIELD], ([val], schema) => {
      if (!val) return schema;
      const field = val as keyof typeof config.targetTypeMap;
      const fieldType = config.targetTypeMap[field] as FieldTypes;
      const options = FIELD_TYPE_OPERATORS_MAP[fieldType];
      return schema.oneOf(options, "invalid operator");
    })
    .required("required fields");

  const filterValueSchema = object().when(
    [FilterFieldsName.FIELD, FilterFieldsName.CONDITION],
    ([fieldVal, conditionVal], schema) => {
      if (!fieldVal || !conditionVal) return schema;
      const field = fieldVal as keyof typeof config.targetTypeMap;
      const condition = conditionVal as FilterOperator;
      const positiveIntegerSchema = number()
        .required("required fields")
        .integer("must be integer")
        .positive("must be positive");

      if (config.targetTypeMap[field] === FieldTypes.STRING) {
        return schema.shape({
          [FieldTypes.STRING]: string()
            .required("required fields")
            .max(40, "max 40 characters allowed"),
        });
      } else if (config.targetTypeMap[field] === FieldTypes.NUMBER) {
        return schema.shape({
          [FieldTypes.NUMBER]: positiveIntegerSchema,
        });
      } else if (config.targetTypeMap[field] === FieldTypes.DURATION) {
        return schema.shape({
          [FieldTypes.DURATION]: tuple([
            positiveIntegerSchema.min(0).max(23).label("hours"),
            positiveIntegerSchema.min(0).max(59).label("minutes"),
            positiveIntegerSchema.min(0).max(59).label("seconds"),
          ]).required("required fields"),
        });
      } else if (config.targetTypeMap[field] === FieldTypes.TIME) {
        const timeSetSchema = tuple([
          positiveIntegerSchema
            .min(0)
            .max(23)
            .label("hour")
            .required("required fields"),
          positiveIntegerSchema
            .min(0)
            .max(59)
            .label("minute")
            .required("required fields"),
        ]).required("required fields");

        if (condition === FilterOperator.BETWEEN) {
          return schema.shape({
            [FieldTypes.TIME]: object({
              [FilterOperator.BETWEEN]: tuple([
                timeSetSchema.label("start"),
                timeSetSchema.label("end"),
              ])
                .required("required fields")
                .test(
                  "range",
                  "invalid date range",
                  ([[sh, sm], [eh, em]]) => sh < eh || (sh === eh && sm < em),
                ),
            }),
          });
        } else {
          return schema.shape({
            [FieldTypes.TIME]: object({
              [condition]: timeSetSchema,
            }),
          });
        }
      } else if (config.targetTypeMap[field] === FieldTypes.SELECT) {
        const selectField =
          field as keyof typeof config.targetSelectFieldOptionsMap;
        const options = config.targetSelectFieldOptionsMap[selectField].map(
          (option) => option.value,
        );

        return schema.shape({
          [FieldTypes.SELECT]: mixed().oneOf(options),
        });
      } else if (config.targetTypeMap[field] === FieldTypes.MULTI_SELECT) {
        const multiSelectField =
          field as keyof typeof config.targetMultiSelectFieldOptionsMap;
        const options = config.targetMultiSelectFieldOptionsMap[
          multiSelectField
        ].map((option) => option.value);

        return schema.shape({
          [FieldTypes.MULTI_SELECT]: object({
            [FilterMultiSelectFieldsName.BINDING]: array()
              .of(mixed().oneOf(options))
              .min(1, "min 1 tag required")
              .max(5, "max 5 tags allowed"),
            [FilterMultiSelectFieldsName.ADDING]: string()
              .trim()
              .max(40, "max 40 characters allowed"),
          }),
        });
      }
      return schema;
    },
  );

  return {
    [FilterFieldsName.FIELD]: filterFieldSchema,
    [FilterFieldsName.TYPE]: filterTypeSchema,
    [FilterFieldsName.CONDITION]: filterConditionSchema,
    [FilterFieldsName.VALUE]: filterValueSchema,
  };
}
