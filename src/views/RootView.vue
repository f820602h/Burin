<script setup lang="ts">
import { templateRef, useElementSize } from "@vueuse/core";
import GlobalHeader from "@/components/global/GlobalHeader.vue";
import LoginMachine from "../components/LoginMachine.vue";

const head = templateRef<HTMLElement | null>("head", null);
const { height: headerHeight } = useElementSize(head);
</script>

<template>
  <div class="root flex flex-col w-full min-h-screen">
    <div
      ref="head"
      class="header-container sticky top-0 z-global-1 flex-shrink-0"
    >
      <GlobalHeader />
    </div>
    <div class="view-container relative flex-1 flex">
      <div class="view-wrapper w-full">
        <router-view />
      </div>
    </div>
    <div class="footer-container"></div>

    <LoginMachine class="z-50" />
  </div>
</template>

<style scoped lang="scss">
.root {
  --headerHeight: v-bind(headerHeight + "px");

  :deep(.fixed-layer) {
    @apply fixed left-0 w-full;
    top: var(--headerHeight);
    height: calc(100vh - var(--headerHeight));
  }
}
</style>
