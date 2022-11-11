<script setup lang="ts">
import { computed, type StyleValue } from "vue";

export type Range = {
  x1: number;
  x2: number;
  name: string;
  color: string;
};

const props = withDefaults(
  defineProps<{
    data: Range[];
    startValue?: number;
    tickInterval?: number;
    tickAmount?: number;
    minorTickAmount?: number;
    tickFormatter?: (value: number, index: number) => string | number;
  }>(),
  {
    startValue: 0,
    tickInterval: 10,
    tickAmount: 10,
    minorTickAmount: 4,
    tickFormatter: (value: number) => value,
  }
);

const endValue = computed<number>(() => {
  return props.startValue + props.tickInterval * props.tickAmount;
});

function getRangeStyle(range: Range): StyleValue {
  const r = (range.x2 - props.startValue) / (endValue.value - props.startValue);
  const l = (range.x1 - props.startValue) / (endValue.value - props.startValue);
  return {
    right: 100 - r * 100 + "%",
    left: l * 100 + "%",
    background: range.color,
  };
}
</script>

<template>
  <div class="pt-4">
    <div class="flex mb-[2px] border-l border-gray-500">
      <div
        v-for="i in tickAmount"
        :key="i"
        class="relative flex-1 flex items-end h-2 border-r border-gray-500"
      >
        <div v-if="i === 1" class="tick-number left-0">
          {{ tickFormatter(startValue, 0) }}
        </div>
        <div class="tick-number left-full truncate">
          {{ tickFormatter(startValue + tickInterval * i, i) }}
        </div>

        <div
          v-for="j in minorTickAmount + 1"
          :key="j"
          class="flex-1 h-1 border-r border-gray-400 last:border-r-0"
        />
      </div>
    </div>

    <div class="relative rounded-md bg-white overflow-hidden">
      <div class="shadow-mask pointer-events-none" />
      <div class="relative h-5">
        <div
          v-for="(range, index) in data"
          :key="index"
          :style="getRangeStyle(range)"
          class="absolute top-0 h-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tick-number {
  @apply absolute top-0 text-xs text-gray-500 -translate-x-1/2 -translate-y-full;
}
.shadow-mask {
  @apply shadow-inner-sm shadow-light absolute top-0 left-0 z-1 w-full h-full;
}
</style>
