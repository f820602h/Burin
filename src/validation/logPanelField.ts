import { string, array } from "yup";
import type { FieldValidation } from "./types";
import type { LogPanel } from "@/class/Panel";

export enum LogPanelFieldsName {
  TITLE = "title",
  FILTERS = "filters",
  SORTERS = "sorters",
}

export type LogPanelFields = {
  [LogPanelFieldsName.TITLE]: LogPanel["title"];
  [LogPanelFieldsName.FILTERS]: LogPanel["filters"];
  [LogPanelFieldsName.SORTERS]: LogPanel["sorters"];
};

export function createLogPanelSchema(
  filterMaxLength = 5,
  sorterMaxLength = 2,
): FieldValidation {
  return {
    [LogPanelFieldsName.TITLE]: string()
      .max(40, "max 40 characters allowed")
      .required("required fields"),
    [LogPanelFieldsName.FILTERS]: array().max(
      filterMaxLength,
      "max ${max} filters allowed",
    ),
    [LogPanelFieldsName.SORTERS]: array().max(
      sorterMaxLength,
      "max ${min} filters allowed",
    ),
  };
}
