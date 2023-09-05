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

export const logPanelFieldsValidation: FieldValidation = {
  [LogPanelFieldsName.TITLE]: string()
    .max(40, "max 40 characters allowed")
    .required("required fields"),
  [LogPanelFieldsName.FILTERS]: array().max(5, "max 5 filters allowed"),
  [LogPanelFieldsName.SORTERS]: array().max(2, "max 2 filters allowed"),
};
