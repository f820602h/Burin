<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  num: number;
  size?: number;
}>();

const pathList: string[] = [
  "m957 1180-35 35-35 35H675l-36-35-35-36h71v1-1l141 1 71-1v1-1h70z",
  "m590 1195 35 35 35 35v212l-35 36-35-36v-282z",
  "m970 1194-35 35-36 36v212l36 35 35-35v-283z",
  "m639 1526 35-36h213l35 36-35 35H674z",
  "m590 1857 35-36 35-35v-212l-35-35-35 35v283z",
  "m970 1857-71-71v-212l36-35 35 35v283z",
  "m957 1872-35-36-35-35H675l-36 35-35 36h353z",
];

const numberPathIndexContrast: number[][] = [
  [0, 1, 2, 4, 5, 6],
  [2, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [1, 2, 3, 5],
  [0, 1, 3, 5, 6],
  [0, 1, 3, 4, 5, 6],
  [0, 2, 5],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 5, 6],
];

const showPathList = computed<string[]>(() => {
  const pathIndexList = numberPathIndexContrast[props.num];
  if (!pathIndexList) {
    console.log(props.num);
    return [];
  }
  return pathList.filter((path, index) => pathIndexList.indexOf(index) > -1);
});
</script>

<template>
  <svg
    class="inline-block"
    overflow="hidden"
    viewBox="0 0 400 700"
    :style="{ height: size + 'px' }"
  >
    <g
      transform="translate(-586 -1177)"
      fill="currentColor"
      fill-opacity="0.05"
    >
      <path v-for="(path, index) in pathList" :key="index" :d="path" />
    </g>
    <g transform="translate(-586 -1177)" fill="currentColor">
      <path v-for="(path, index) in showPathList" :key="index" :d="path" />
    </g>
  </svg>
</template>

<style lang="scss" scoped></style>
