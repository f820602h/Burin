<script setup lang="ts">
type ButtonTheme = "primary" | "primary-outline";
type ButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    text?: string;
    theme?: ButtonTheme;
    size?: ButtonSize;
    disabled?: boolean;
  }>(),
  {
    text: "click me",
    theme: "primary",
    size: "md",
    disabled: false,
  },
);
</script>

<template>
  <button :class="[props.theme, props.size]" :disabled="disabled" type="button">
    <slot>{{ text }}</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply flex justify-center items-center border outline-none cursor-pointer transition duration-200;
  padding-right: 8px;
  padding-left: 8px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  &.sm {
    @apply text-sm font-bold min-h-7;
  }

  &.md {
    @apply text-base font-bold min-h-8;
  }

  &.lg {
    @apply text-lg font-bold min-h-9;
  }

  &.primary {
    @apply border-primary bg-primary text-white;
    @apply hover:border-primary-400 hover:bg-primary-400;
    @apply disabled:border-gray-500/0 disabled:bg-gray-500/75 disabled:text-gray-400/75 disabled:cursor-not-allowed;
  }

  &.primary-outline {
    @apply border-primary-400 bg-transparent text-primary-400;
    @apply hover:border-primary-300 hover:bg-primary-200/20 hover:text-primary-300;
    @apply disabled:border-gray-500/0 disabled:text-gray-400/75 disabled:cursor-not-allowed;
  }
}
</style>
