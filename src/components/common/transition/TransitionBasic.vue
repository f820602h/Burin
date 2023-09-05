<script setup lang="ts">
type TransitionName =
  | "fade"
  | "slide-from-left"
  | "slide-from-right"
  | "model-fade";

const props = withDefaults(
  defineProps<{
    name: TransitionName;
  }>(),
  { name: "fade" }
);
</script>

<template>
  <Transition mode="out-in" :name="props.name">
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
</style>
