<script setup lang="ts">
import { computed } from "vue";

type BtnThemeName = "normal" | "dark" | "confirm" | "cancel" | "disabled";

type BtnThemes = {
  [prop: string]: { front: string; back: string };
};

const btnTheme: BtnThemes = {
  normal: { front: "bg-stone-200", back: "bg-stone-300" },
  dark: { front: "bg-stone-400", back: "bg-stone-600" },
  confirm: { front: "bg-green-600", back: "bg-green-900" },
  cancel: { front: "bg-red-600", back: "bg-red-900" },
  disabled: { front: "bg-gray-300", back: "bg-gray-400/75" },
};

const props = withDefaults(
  defineProps<{
    text: string;
    theme: BtnThemeName;
    width?: number;
    height?: number;
    disabled: boolean;
  }>(),
  { text: "", theme: "normal", width: 80, height: 30, disabled: false }
);

defineEmits<{ (e: "press"): void }>();

const btnSize = computed(() => {
  return { width: props.width + "px", height: props.height + "px" };
});
const calcTheme = computed(() => {
  return props.disabled ? "disabled" : props.theme;
});
</script>

<template>
  <button class="group pt-1" :disabled="disabled" @click="$emit('press')">
    <div
      class="btn-back p-0 border-0 outline-none rounded-lg text-white shadow-md shadow-black/25 cursor-pointer"
      :class="`${btnTheme[calcTheme].back}`"
      :style="btnSize"
    >
      <span
        class="btn-front flex-center-center full rounded-lg transition duration-300"
        :class="`${btnTheme[calcTheme].front}`"
      >
        {{ text }}
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.btn-back {
  @apply group-disabled:text-gray-100;
  @apply group-disabled:cursor-not-allowed;
  @apply group-active:shadow-none;
  @apply group-disabled:shadow-none;
}

.btn-front {
  @apply group-enabled:-translate-y-1;
  @apply group-enabled:group-hover:-translate-y-[6px];
  @apply group-enabled:group-active:-translate-y-0;
  @apply group-enabled:group-active:duration-[100ms];
  @apply group-disabled:shadow-inner;
  @apply group-enabled:group-active:shadow-inner;
  @apply group-enabled:group-active:shadow-black/50;
}
</style>
