import { string, array } from "yup";

import type { FieldValidation } from "./types";
import type { LogPanel } from "@/class/Panel";

export enum LogPanelFieldsName {
  TITLE = "title",
  FILTER = "filter",
  SORT = "sort",
}

export type LogPanelFields = {
  [LogPanelFieldsName.TITLE]: LogPanel["title"];
  [LogPanelFieldsName.FILTER]: LogPanel["filterConfig"];
  [LogPanelFieldsName.SORT]: LogPanel["sorterConfig"];
};

export const logPanelFieldsValidation: FieldValidation = {
  [LogPanelFieldsName.TITLE]: string()
    .max(40, "max 40 characters allowed")
    .required("required fields"),
  [LogPanelFieldsName.FILTER]: array().max(5, "max 5 filters allowed"),
  [LogPanelFieldsName.SORT]: array().max(2, "max 2 filters allowed"),
};
