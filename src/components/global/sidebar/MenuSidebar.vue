<script setup lang="ts">
import type {
  MenuItem as MenuItemType,
  MenuItemToggle as MenuItemToggleType,
} from "./types";
import { computed } from "vue";
import { useStampStore } from "@/stores/stamp";
import { useCategoryStore } from "@/stores/category";
import { monthNameGetter } from "@/helper/monthNameGetter";
import { dayNameGetter } from "@/helper/dayNameGetter";
import MenuItem from "./MenuItem.vue";
import MenuItemToggle from "./MenuItemToggle.vue";
import CalendarIcon from "@/components/basic/CalendarIcon.vue";

const stampStore = useStampStore();
const categoryStore = useCategoryStore();

const todayMenuItem = computed<MenuItemType>(() => ({
  name: "Today",
  icon: null,
  route: { name: "Today" },
}));

const calendarMenuItems = computed<MenuItemToggleType[]>(() =>
  stampStore.stamps.reduce<MenuItemToggleType[]>((acc, timestamp) => {
    const year: string = new Date(timestamp).getFullYear().toString();
    const month: string = monthNameGetter(new Date(timestamp).getMonth(), {
      mode: "short",
    });
    const date: string = new Date(timestamp).getDate().toString();
    const day: string = dayNameGetter(new Date(timestamp).getDay(), {
      mode: "short",
    });

    const yearItem =
      acc.find((item) => item.name === year) ||
      acc[acc.push({ name: year, children: [] }) - 1];

    const monthItem =
      yearItem.children.find((item) => item.name === month) ||
      yearItem.children[
        yearItem.children.push({ name: month, children: [] }) - 1
      ];

    if ("children" in monthItem) {
      monthItem.children.push({
        name: `${date.padStart(2, "0")}, ${day}`,
        icon: "icon-file",
        route: { name: "Daily", params: { date: timestamp } },
      });
    }

    return acc;
  }, [])
);

const tagMenuItems = computed(() =>
  categoryStore.categories.map((cate) => ({
    name: cate.category,
    icon: "icon-hash",
  }))
);
</script>

<template>
  <div class="menu-sidebar">
    <div class="p-3">
      <div class="menu-sidebar__group-title">CALENDAR</div>
      <ul class="mb-3">
        <MenuItem :item="todayMenuItem">
          <div class="flex items-center">
            <CalendarIcon class="w-[14px] h-[14px] mr-2" />
            Today
          </div>
        </MenuItem>

        <MenuItemToggle
          v-for="(item, index) in calendarMenuItems"
          :key="index"
          :item="item"
        />
      </ul>

      <div class="menu-sidebar__group-title">TAG</div>
      <ul class="mb-3">
        <MenuItem
          v-for="(item, index) in tagMenuItems"
          :key="index"
          :item="item"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-sidebar {
  min-width: calc(var(--asideWidth) - 1px);

  &__group-title {
    @apply text-gray-500 mb-2 text-xs px-1;
  }
}
</style>
