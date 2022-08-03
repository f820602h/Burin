<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import {
  buttonColorThemes,
  type ColorThemeObject,
  type ColorThemes,
} from "@/utils/colorTheme";

const props = withDefaults(
  defineProps<{
    text?: string;
    theme?: keyof ColorThemes;
    width?: number;
    height?: number;
    circle?: boolean;
    disabled?: boolean;
  }>(),
  {
    text: "",
    theme: "normal",
    width: 80,
    height: 30,
    circle: false,
    disabled: false,
  }
);

defineEmits<{ (e: "press"): void }>();

const btnSize = computed<StyleValue>(() => {
  return { width: props.width + "px", height: props.height + "px" };
});
const calcTheme = computed<ColorThemeObject>(() => {
  const themeKey = props.disabled ? "disabled" : props.theme;
  return buttonColorThemes[themeKey];
});
</script>

<template>
  <button
    class="group disabled:cursor-not-allowed"
    :disabled="disabled"
    @click="$emit('press')"
  >
    <div
      class="btn-back p-0 border-0 outline-none text-white shadow-md"
      :class="[`${calcTheme.back}`, circle ? 'rounded-full' : 'rounded-lg']"
    >
      <span
        class="btn-front relative flex-center-center transition-transform duration-200"
        :class="[`${calcTheme.front}`, circle ? 'rounded-full' : 'rounded-lg']"
        :style="btnSize"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.btn-back {
  @apply group-disabled:text-gray-100 group-active:shadow-none group-disabled:shadow-none;
}

.btn-front {
  @apply group-enabled:-top-1 group-enabled:group-active:-top-0 group-enabled:group-active:shadow-inner-sm group-disabled:shadow-inner-sm;
}
</style>
