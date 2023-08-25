import type { AnySchema } from "yup";

export interface FieldValidation {
  [field: string]: AnySchema;
}

export enum MultiSelectFieldsName {
  BINDING = "binding",
  ADDING = "adding",
}
