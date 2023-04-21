<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import MenuSidebar from "@/components/global/sidebar/MenuSidebar.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import BlurMask from "./components/common/BlurMask.vue";

const isUserLoggerShow = ref<boolean>(false);
</script>

<template>
  <div class="root min-w-[360px]">
    <div class="view-container relative flex">
      <aside
        class="flex-shrink-0 hidden lg:block w-[240px] h-screen border-r border-stone-900 bg-gray-800"
      >
        <MenuSidebar class="h-full overflow-auto" />
      </aside>

      <main class="flex-grow bg-gray-900">
        <!-- <div @click="isUserLoggerShow = true">123</div> -->
        <router-view class="min-h-screen overflow-auto" />
      </main>
    </div>

    <div class="footer-container"></div>

    <Transition name="fade">
      <BlurMask v-if="isUserLoggerShow" class="justify-center items-center">
        <UserLogger @close="isUserLoggerShow = false" />
      </BlurMask>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";

.root {
  :deep(.fixed-layer) {
    @apply fixed left-0 w-full z-global-1;
    top: 0;
    height: calc(100vh - var(--headerHeight));
  }
}
</style>
