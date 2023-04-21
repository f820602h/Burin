<script setup lang="ts">
import type { MenuItemToggle as MenuItemToggleType } from "./types";
import { useLogStore } from "@/stores/log";
import { useStampStore } from "@/stores/stamp";
import MenuItem from "./MenuItem.vue";
import MenuItemToggle from "./MenuItemToggle.vue";

const logStore = useLogStore();
const stampStore = useStampStore();
</script>

<template>
  <div class="menu-sidebar">
    <div class="menu-sidebar__progress">
      <template v-if="logStore.currentLog">
        <div class="font-bold">{{ logStore.currentLog.title }}</div>
        <div class="text-sm text-gray-400">
          {{ logStore.currentLog.duringTime.hoursText }}:{{
            logStore.currentLog.duringTime.minutesText
          }}:{{ logStore.currentLog.duringTime.secondsText }}
        </div>
      </template>
      <template v-else>
        <div class="text-sm">Nothing In Progress...</div>
      </template>
    </div>

    <div class="menu-sidebar__group-title">CALENDAR</div>
    <ul class="mb-3">
      <MenuItem :item="{ name: 'TODAY', icon: 'icon-task' }" />
      <MenuItemToggle
        v-for="(item, index) in stampStore._getYearMonthDateMenuItems"
        :key="index"
        :item="item"
      />
    </ul>

    <div class="menu-sidebar__group-title">TAG</div>
  </div>
</template>

<style scoped lang="scss">
.menu-sidebar {
  @apply px-2 py-3 bg-gray-800;

  &__progress {
    @apply mb-5 px-2 py-1 rounded bg-slate-700 cursor-pointer duration-200 hover:bg-slate-600;
  }

  &__group-title {
    @apply text-gray-500 mb-2 text-xs px-1;
  }
}
</style>
