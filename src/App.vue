<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterView } from "vue-router";
import { templateRef, useElementSize } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores/loading";
import GlobalHeader from "@/components/global/GlobalHeader.vue";
import BlurMask from "@/components/common/BlurMask.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import LoadingHourglass from "@/components/basic/LoadingHourglass.vue";

const head = templateRef<HTMLElement | null>("head", null);
const { height: headerHeight } = useElementSize(head);

const userStore = useUserStore();
const loadingStore = useLoadingStore();

const isUserLoggerShow = ref<boolean>(false);
const show = computed<boolean>(() => {
  return !!loadingStore.show || !!loadingStore.queue.size;
});
</script>

<template>
  <div class="root flex flex-col w-full min-h-screen">
    <div
      ref="head"
      class="header-container sticky top-0 z-global-4 flex-shrink-0"
    >
      <GlobalHeader @toggle-logger="isUserLoggerShow = !isUserLoggerShow" />
    </div>
    <div class="view-container relative flex-1 flex bg-gray-700">
      <div class="view-wrapper w-full">
        <router-view />
      </div>
    </div>
    <div class="footer-container"></div>

    <Transition name="fade">
      <BlurMask
        v-if="isUserLoggerShow && !userStore.user"
        class="justify-center items-center"
      >
        <UserLogger @close="isUserLoggerShow = false" />
      </BlurMask>
    </Transition>

    <BlurMask v-if="show" class="justify-center items-center z-global-5">
      <LoadingHourglass></LoadingHourglass>
    </BlurMask>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
.root {
  --headerHeight: v-bind(headerHeight + "px");

  :deep(.fixed-layer) {
    @apply fixed left-0 w-full z-global-1;
    top: var(--headerHeight);
    height: calc(100vh - var(--headerHeight));
  }
}
</style>
