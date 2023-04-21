import type { RouteLocationRaw } from "vue-router";

export type MenuItem = {
  name: string;
  icon?: string;
  route?: RouteLocationRaw;
};

export type MenuItemToggle = {
  name: string;
  children: (MenuItem | MenuItemToggle)[];
};
