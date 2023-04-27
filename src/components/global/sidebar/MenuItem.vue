<script setup lang="ts">
import type { MenuItem } from "./types";

const props = withDefaults(defineProps<{ item: MenuItem; layer?: number }>(), {
  layer: 1,
});
</script>

<template>
  <li class="text-sm text-gray-400">
    <component
      :is="props.item.route ? 'router-link' : 'dev'"
      :to="props.item.route ? props.item.route : undefined"
      class="flex items-center mb-[1px] px-3 py-1 rounded cursor-pointer duration-200 hover:bg-white/10"
    >
      <template v-if="layer > 1">
        <span v-for="i in layer" :key="i" class="mr-4" />
      </template>

      <div class="mr-2">
        <div v-if="item.icon" :class="item.icon" />
        <div v-else>．</div>
      </div>

      <span>{{ item.name }}</span>
    </component>
  </li>
</template>

<style scoped lang="scss">
.router-link-active {
  @apply bg-white/5 hover:bg-white/10;
}
</style>
