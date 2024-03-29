import type { RouteLocationRaw } from "vue-router";

export type MenuItem = {
  name: string;
  icon?: string | null;
  route?: RouteLocationRaw;
};

export type MenuItemToggle = {
  name: string;
  children: (MenuItem | MenuItemToggle)[];
};
