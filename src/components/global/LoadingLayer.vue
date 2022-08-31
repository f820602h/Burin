<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { useInterval } from "@vueuse/core";
import { computed, watch } from "vue";

const loadingStore = useLoadingStore();
const { counter, pause, resume } = useInterval(500, { controls: true });

const frame: number[][][] = [
  [
    [],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [4, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [5, 7, 8, 9, 11],
    [6, 8, 10],
    [5, 8, 11],
    [4, 8, 12],
    [4, 7, 8, 9, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [],
  ],
  [
    [],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [4, 12],
    [4, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [5, 7, 8, 9, 11],
    [6, 8, 10],
    [5, 8, 11],
    [4, 7, 8, 9, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [],
  ],
  [
    [],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [4, 12],
    [4, 12],
    [4, 12],
    [5, 11],
    [6, 10],
    [5, 7, 8, 9, 11],
    [4, 6, 7, 8, 9, 10, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [4, 6, 7, 8, 9, 10, 12],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [],
  ],
];

const show = computed<boolean>(() => {
  return !!loadingStore.show || !!loadingStore.queue.size;
});

watch(show, (value) => {
  if (value) resume();
  else pause();
});
</script>

<template>
  <div
    v-if="show"
    class="fixed-default full flex-center-center bg-black/30 backdrop-blur-[1px]"
  >
    <div class="bg-black border-8 border-zinc-700 rounded-md shadow-md p-[1px]">
      <div v-for="i in 15" :key="i" class="flex mb-[1px] last:mb-0">
        <div
          v-for="j in 15"
          :key="j"
          class="w-[3px] h-[3px] bg-[#213821] mr-[1px] last:mr-0"
          :class="{ 'bg-[#13fc5c]': frame[counter % 3][i - 1].indexOf(j) > -1 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
