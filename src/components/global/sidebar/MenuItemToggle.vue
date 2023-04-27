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
        <span v-for="i in layer" :key="i" class="mr-3" />
      </template>

      <div
        class="icon-down duration-150 mr-2"
        :class="{ 'rotate-[-90deg]': !isOpen }"
      />

      <span>{{ item.name }}</span>
    </div>

    <ul v-show="isOpen">
      <template v-for="(child, index) in item.children" :key="index">
        <template v-if="'children' in child">
          <MenuItemToggle :key="index" :item="child" :layer="layer + 1" />
        </template>
        <template v-else>
          <MenuItem :item="child" :layer="layer + 1" />
        </template>
      </template>
    </ul>
  </li>
</template>

<style scoped lang="scss"></style>
