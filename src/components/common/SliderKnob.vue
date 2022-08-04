<script setup lang="ts">
import { computed } from "vue";
import {
  knobColorThemes,
  type ColorThemeObject,
  type ColorThemes,
} from "@/components/common/colorThemes";

const props = withDefaults(defineProps<{ theme?: keyof ColorThemes }>(), {
  theme: "normal",
});

const calcTheme = computed<ColorThemeObject>(() => {
  return knobColorThemes[props.theme] || knobColorThemes.normal;
});
</script>

<template>
  <div
    class="w-8 h-5 p-0 rounded-lg shadow-sm-light"
    :class="[`${calcTheme.back}`]"
  >
    <div
      class="relative -top-1 flex-between-center full px-2 py-[5px] rounded-lg"
      :class="[`${calcTheme.front}`]"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="w-[2px] h-full rounded-full rotate-[10deg] opacity-75"
        :class="[`${calcTheme.back}`]"
      />
    </div>
  </div>
</template>

<style scoped></style>
