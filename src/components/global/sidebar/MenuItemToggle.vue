<script setup lang="ts">
import { ref } from "vue";
import type { MenuItemToggle as MenuItemToggleType } from "./types";
import MenuItem from "./MenuItem.vue";
import MenuItemToggle from "./MenuItemToggle.vue";

withDefaults(defineProps<{ item: MenuItemToggleType; layer?: number }>(), {
  layer: 1,
});

const isOpen = ref<boolean>(false);

function onItemClick(): void {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <li class="text-sm text-gray-400">
    <div
      class="flex items-center mb-[1px] px-3 py-1 rounded cursor-pointer duration-200 hover:bg-white/10"
      @click="onItemClick"
    >
      <template v-if="layer > 1">
        <span v-for="i in layer" :key="i" class="mr-4" />
      </template>

      <div class="w-[14px] mr-2 text-center duration-150">
        <span class="icon-down" :class="{ 'rotate-[-90deg]': !isOpen }" />
      </div>

      <span>{{ item.name }}</span>
    </div>

    <template v-if="isOpen">
      <template v-for="(child, index) in item.children" :key="index">
        <template v-if="'children' in child">
          <MenuItemToggle :key="index" :item="child" :layer="layer + 1" />
        </template>
        <template v-else>
          <MenuItem :item="child" :layer="layer + 1" />
        </template>
      </template>
    </template>
  </li>
</template>

<style scoped lang="scss"></style>
