<script setup lang="ts">
import { useRouter } from "vue-router";
import type { MenuItem } from "./types";

const router = useRouter();

const props = withDefaults(defineProps<{ item: MenuItem; layer?: number }>(), {
  layer: 1,
});

function onItemClick(): void {
  if (props.item.route) router.push(props.item.route);
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
        <span v-if="item.icon" :class="item.icon" />
        <span v-else>．</span>
      </div>

      <span>{{ item.name }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss"></style>
