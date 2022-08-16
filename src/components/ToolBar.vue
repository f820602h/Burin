<script setup lang="ts">
import ButtonNormal from "./common/ButtonNormal.vue";

export type Action = {
  title: string;
  icon: string;
  callback: () => void;
};

defineProps<{ actions: Action[] }>();
</script>

<template>
  <div class="fixed top-1/2 z-30 right-0 pr-2 -translate-y-1/2">
    <div class="stand top"></div>
    <div class="relative pb-4 rounded-md bg-gray-400 shadow-lg">
      <div class="px-2 py-2 rounded-md bg-white">
        <template v-for="action in actions" :key="action.title">
          <div class="text-center text-sm font-bold mb-1">
            {{ action.title }}
          </div>
          <ButtonNormal
            :width="35"
            :circle="true"
            theme="dark"
            class="mb-3 last:mb-0"
            @press="action.callback"
          >
            <span :class="action.icon" class="text-white/75"></span>
          </ButtonNormal>
        </template>
      </div>
    </div>
    <div class="stand bottom"></div>
  </div>
</template>

<style lang="scss" scoped>
.stand {
  @apply relative w-[10px] h-7 mx-auto bg-stone-500;

  &:after {
    @apply content-[""] absolute left-0 -z-1 w-14 h-[10px] rounded-full bg-inherit shadow-md;
  }
  &.top {
    @apply -mb-3 rounded-t-full after:top-0;
  }

  &.bottom {
    @apply z-1 -mt-[10px] rounded-full after:bottom-0;
  }
}
</style>
