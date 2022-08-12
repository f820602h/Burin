<script setup lang="ts">
withDefaults(
  defineProps<{
    tickAmount?: number;
    minorTickAmount?: number;
    tickFormatter?: (index: number) => string | number;
  }>(),
  {
    tickAmount: 11,
    minorTickAmount: 4,
    tickFormatter: (index: number) => index,
  }
);
</script>

<template>
  <div class="pt-4">
    <div class="flex mb-[2px] border-l border-gray-500">
      <div
        v-for="i in tickAmount - 1"
        :key="i"
        class="relative flex-1 flex items-end h-2 border-r border-gray-500"
      >
        <div v-if="i === 1" class="tick-number left-0">
          {{ tickFormatter(i - 1) }}
        </div>
        <div class="tick-number left-full truncate">
          {{ tickFormatter(i) }}
        </div>

        <div
          v-for="j in minorTickAmount + 1"
          :key="j"
          class="flex-1 h-1 border-r border-gray-400 last:border-r-0"
        />
      </div>
    </div>

    <div class="relative rounded-md bg-white overflow-hidden">
      <div class="shadow-mask" />
      <div class="flex">
        <div class="w-[15%] h-5 bg-red-400"></div>
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
