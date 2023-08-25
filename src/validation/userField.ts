import { string } from "yup";
import type { FieldValidation } from "./types";

export enum UserFieldsName {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}
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
