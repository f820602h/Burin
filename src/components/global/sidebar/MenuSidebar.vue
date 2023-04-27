<script setup lang="ts">
import type { MenuItemToggle as MenuItemToggleType } from "./types";
import { computed } from "vue";
import { useLogStore } from "@/stores/log";
import { useStampStore } from "@/stores/stamp";
import { monthNameGetter } from "@/helper/monthNameGetter";
import MenuItem from "./MenuItem.vue";
import MenuItemToggle from "./MenuItemToggle.vue";
import { timestampCalculator } from "@/helper/timestampCalculator";
import { useCategoryStore } from "@/stores/category";

const logStore = useLogStore();
const stampStore = useStampStore();
const categoryStore = useCategoryStore();

const todayMenuItem = computed(() => ({
  name: "Today",
  icon: "icon-clock",
  route: { name: "Daily", params: { date: timestampCalculator("today") } },
}));

const calendarMenuItems = computed(() =>
  stampStore.stamps.reduce<MenuItemToggleType[]>((acc, timestamp) => {
    const year: string = new Date(timestamp).getFullYear().toString();
    const month: string = monthNameGetter(new Date(timestamp).getMonth(), {
      mode: "short",
    });
    const date: string = new Date(timestamp).getDate().toString();

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
        name: date,
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
    <router-link :to="{ name: 'Progress' }" class="menu-sidebar__progress">
      <template v-if="logStore.currentLog">
        <div class="font-bold">{{ logStore.currentLog.title }}</div>
        <div class="text-sm text-gray-400">
          {{ logStore.currentLog.duringTime.hoursText }}:{{
            logStore.currentLog.duringTime.minutesText
          }}:{{ logStore.currentLog.duringTime.secondsText }}
        </div>
      </template>
      <template v-else>
        <div class="text-sm p-1">Nothing In Progress...</div>
      </template>
    </router-link>

    <div class="menu-sidebar__group-title">CALENDAR</div>
    <ul class="mb-3">
      <MenuItem :item="todayMenuItem" />
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
</template>

<style scoped lang="scss">
.menu-sidebar {
  @apply px-2 py-3 bg-gray-800;

  &__progress {
    @apply block mb-5 px-2 py-1 rounded bg-slate-700 cursor-pointer duration-200 hover:bg-slate-600;
  }

  &__group-title {
    @apply text-gray-500 mb-2 text-xs px-1;
  }
}
</style>
