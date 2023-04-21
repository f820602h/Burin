import { object, string, array, number, type AnySchema } from "yup";
import type { UserInfo } from "@/class/User";
import type { Log } from "@/class/Log";
import type { Category } from "@/class/Category";

interface FieldValidation {
  [field: string]: AnySchema;
}

export enum UserFieldsName {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}

export type UserFields = {
  [UserFieldsName.NAME]: UserInfo["name"];
  [UserFieldsName.EMAIL]: UserInfo["email"];
  [UserFieldsName.PASSWORD]: UserInfo["password"];
};

export const userFieldsValidation: FieldValidation = {
  [UserFieldsName.NAME]: string()
    .max(40, "max 40 characters allowed")
    .required("required fields"),
  [UserFieldsName.EMAIL]: string()
    .email("is not a valid email format")
    .required("required fields"),
  [UserFieldsName.PASSWORD]: string()
    .min(8, "at least 8 characters")
    .required("required fields"),
};

export enum WorkFieldsName {
  TITLE = "title",
  TAGS = "tags",
}

export enum WorkTagsFieldsName {
  BINDING = "binding",
  ADDING = "adding",
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
    [WorkTagsFieldsName.BINDING]: array()
      .of(number())
      .max(5, "max 5 tags allowed"),
    [WorkTagsFieldsName.ADDING]: string()
      .trim()
      .max(40, "max 40 characters allowed"),
  }),
};
