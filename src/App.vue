<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useElementSize } from "@vueuse/core";
import { useLoadingStore } from "./stores/loading";
import MenuSidebar from "@/components/global/sidebar/MenuSidebar.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import BlurMask from "./components/common/BlurMask.vue";
import { NSpin } from "naive-ui";

const route = useRoute();

const loadingStore = useLoadingStore();
const isUserLoggerShow = ref<boolean>(false);

const titleRef = ref<HTMLElement | null>(null);
const { height: titleHeight } = useElementSize(titleRef);

const pageTitle = computed<string>(() => {
  if (typeof route.meta?.title === "string") {
    return route.meta.title;
  } else if (typeof route.meta?.title === "function") {
    return route.meta.title(route);
  } else return "";
});
</script>

<template>
  <div class="root min-w-[360px]">
    <div class="view-container relative flex">
      <aside>
        <MenuSidebar class="h-full overflow-auto" />
      </aside>

      <main>
        <n-spin
          size="medium"
          :show="loadingStore._getIsLoading"
          stroke="#7c3aed"
        >
          <!-- <div @click="isUserLoggerShow = true">123</div> -->
          <div v-if="pageTitle" ref="titleRef" class="main__title">
            <h2>{{ pageTitle }}</h2>
          </div>

          <router-view class="main__content" />
        </n-spin>
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
  --titleHeight: v-bind(titleHeight + "px");

  :deep(.fixed-layer) {
    @apply fixed left-0 w-full z-global-1;
    top: 0;
  }
}

aside {
  @apply sticky top-0 flex-shrink-0 hidden lg:block w-[240px] h-screen bg-gray-800 overflow-auto scrollbar-hide;
}

main {
  @apply flex-grow bg-gray-900;

  .main__title {
    @apply sticky top-0 z-10 flex items-center h-[66px] px-5 bg-gray-900;

    h2 {
      @apply text-lg pl-3 border-l-4 border-violet-500 font-bold;
    }
  }

  .main__content {
    @apply max-w-[560px] md:max-w-[768px] lg:max-w-[1024px] mx-auto px-5;
    height: calc(100vh - var(--titleHeight));
  }
}
</style>
