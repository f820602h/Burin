<script setup lang="ts">
import { ref } from "vue";

const date = ref<number>(new Date().getDate());
</script>

<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M1.985 7.19v20.92c0 1.052 0.853 1.905 1.905 1.905h24.28c1.052 0 1.905-0.853 1.905-1.905v-20.888h-27.932zM3.525-0.030h25.011c1.93 0 3.494 1.564 3.494 3.494v25.011c0 1.93-1.564 3.494-3.494 3.494h-25.011c-1.93 0-3.494-1.564-3.494-3.494v-25.011c0-1.93 1.565-3.494 3.494-3.494z"
    ></path>
    <text
      fill="currentColor"
      font-family="Arial,Arial_MSFontService,sans-serif"
      font-size="20"
      font-weight="500"
      x="49%"
      y="26"
      text-anchor="middle"
    >
      {{ date }}
    </text>
  </svg>
</template>

<style scoped></style>
