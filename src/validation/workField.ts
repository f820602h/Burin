import { object, string, array, number } from "yup";
import { type FieldValidation, MultiSelectFieldsName } from "./types";
import type { Log } from "@/class/Log";
import type { Category } from "@/class/Category";

export enum WorkFieldsName {
  TITLE = "title",
  TAGS = "tags",
}

export enum WorkTagsFieldsName {
  BINDING = MultiSelectFieldsName.BINDING,
  ADDING = MultiSelectFieldsName.ADDING,
}

export type WorkFields = {
  [WorkFieldsName.TITLE]: Log["title"];
  [WorkFieldsName.TAGS]: {
    [WorkTagsFieldsName.BINDING]: Category["id"][];
    [WorkTagsFieldsName.ADDING]: Category["category"];
  };
};

export const workFieldsValidation: FieldValidation = {
  [WorkFieldsName.TITLE]: string()
    .max(40, "max 40 characters allowed")
    .required("required fields"),
  [WorkFieldsName.TAGS]: object({
    [MultiSelectFieldsName.BINDING]: array()
      .of(number())
      .max(5, "max 5 tags allowed"),
    [MultiSelectFieldsName.ADDING]: string()
      .trim()
      .max(40, "max 40 characters allowed"),
  }),
};
