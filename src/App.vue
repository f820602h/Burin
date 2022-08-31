<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { templateRef, useElementSize } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import GlobalHeader from "@/components/global/GlobalHeader.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import LoadingLayer from "./components/global/LoadingLayer.vue";

const head = templateRef<HTMLElement | null>("head", null);
const { height: headerHeight } = useElementSize(head);

const userStore = useUserStore();
const isUserLoggerShow = ref<boolean>(false);
</script>

<template>
  <div class="root flex flex-col w-full min-h-screen">
    <div
      ref="head"
      class="header-container sticky top-0 z-global-4 flex-shrink-0"
    >
      <GlobalHeader @toggle-logger="isUserLoggerShow = !isUserLoggerShow" />
    </div>
    <div class="view-container relative flex-1 flex">
      <div class="view-wrapper w-full">
        <router-view />
      </div>
    </div>
    <div class="footer-container"></div>

    <UserLogger
      :show="isUserLoggerShow && !userStore.user"
      @close="isUserLoggerShow = false"
    />
    <LoadingLayer class="z-global-5" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  --headerHeight: v-bind(headerHeight + "px");

  :deep(.fixed-layer) {
    @apply fixed left-0 w-full z-global-1;
    top: var(--headerHeight);
    height: calc(100vh - var(--headerHeight));
  }
}
</style>
