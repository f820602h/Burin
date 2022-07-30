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
    text?: string;
    theme?: BtnThemeName;
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
      class="btn-back p-0 border-0 outline-none text-white shadow-md shadow-black/25 cursor-pointer"
      :class="[
        `${btnTheme[calcTheme].back}`,
        circle ? 'rounded-full' : 'rounded-lg',
      ]"
      :style="btnSize"
    >
      <span
        class="btn-front relative flex-center-center full transition-all duration-200"
        :class="[
          `${btnTheme[calcTheme].front}`,
          circle ? 'rounded-full' : 'rounded-lg',
        ]"
      >
        <slot>{{ text }}</slot>
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
  @apply group-enabled:-top-1;
  // @apply group-enabled:group-hover:-top-[6px];
  @apply group-enabled:group-active:-top-0;
  @apply group-enabled:group-active:duration-[10ms];
  @apply group-disabled:shadow-inner-sm;
  @apply group-disabled:shadow-black/50;
  @apply group-enabled:group-active:shadow-inner;
  @apply group-enabled:group-active:shadow-black/50;
}
</style>
