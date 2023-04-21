import { defineStore } from "pinia";
import { axiosStampGetList } from "@/api/stamp/index";
import { monthNameGetter } from "@/helper/monthNameGetter";
import type { MenuItemToggle } from "@/components/global/sidebar/types";

export type StampState = {
  stamps: number[];
};

export const useStampStore = defineStore({
  id: "stamp",
  state: (): StampState => ({
    stamps: [],
  }),
  getters: {
    _getYearMonthDateMenuItems(): MenuItemToggle[] {
      return this.stamps.reduce<MenuItemToggle[]>((acc, timestamp) => {
        const year: string = new Date(timestamp).getFullYear().toString();
        const month: string = monthNameGetter(new Date(timestamp).getMonth());
        const date: string = new Date(timestamp).getDate().toString();

        const yearItem = acc.find((item) => item.name === year);
        if (!yearItem) {
          acc.push({
            name: year,
            children: [{ name: month, children: [{ name: date }] }],
          });
          return acc;
        }

        const monthItem = yearItem?.children.find(
          (item) => item.name === month
        );
        if (!monthItem || !("children" in monthItem)) {
          yearItem.children.push({ name: month, children: [{ name: date }] });
          return acc;
        }

        const dateItem = monthItem?.children.find((item) => item.name === date);
        if (!dateItem) {
          monthItem.children.push({ name: date });
          return acc;
        }

        return acc;
      }, []);
    },
  },
  actions: {
    async _actFetchStamps(): Promise<void> {
      const date = await axiosStampGetList();
      this.stamps = date;
    },
  },
});
