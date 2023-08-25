<script setup lang="ts">
const emit = defineEmits<{ (e: "close"): void }>();

const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="model">
    <div class="min-w-0 h-full pt-9 border-2 border-gray-400 rounded-lg">
      <div class="model__title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>

      <slot />
    </div>

    <div class="model__close-btn" @click="emit('close')">
      <div class="icon-cancel" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/animation.scss";

.model {
  @apply relative w-full h-full md:h-auto md:max-w-[500px] md:mt-[10vh] p-2 rounded-xl bg-black;

  &__title {
    @apply absolute top-0 md:-top-3 left-1/2 text-center text-3xl text-gray-300 font-bold -translate-x-1/2;

    &::before {
      @apply absolute top-0 md:top-auto md:bottom-0 -left-3 -z-1 h-1/2 bg-black;
      width: calc(100% + 24px);
      content: "";
    }
  }

  &__close-btn {
    @apply absolute top-0 right-0 w-8 h-8 rounded-full flex-center-center text-white bg-black text-lg cursor-pointer;
  }
}
</style>
