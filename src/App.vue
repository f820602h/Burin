<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useElementSize } from "@vueuse/core";
import { useLoadingStore } from "./stores/loading";
import { useBreakPoint } from "./composables/useBreakPoint";
import CollapseHTransition from "./components/common/transition/CollapseHTransition.vue";
import BlurMask from "@/components/common/BlurMask.vue";
import HeaderToolBar from "./components/global/header/HeaderToolBar.vue";
import MenuSidebar from "@/components/global/sidebar/MenuSidebar.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import NewWorkLauncher from "./components/global/NewWorkLauncher.vue";
import { NSpin } from "naive-ui";

const route = useRoute();
const loadingStore = useLoadingStore();
const breakpoints = useBreakPoint();

const headerRef = ref<HTMLElement | null>(null);
const { height: headerHeight } = useElementSize(headerRef);
const titleRef = ref<HTMLElement | null>(null);
const { height: titleHeight } = useElementSize(titleRef);

const isUserLoggerShow = ref<boolean>(false);
const isNewWorkLauncherShow = ref<boolean>(false);
const isSidebarShow = breakpoints.greaterOrEqual("lg");

const pageTitle = computed<string>(() => {
  if (typeof route.meta?.title === "string") {
    return route.meta.title;
  } else if (typeof route.meta?.title === "function") {
    return route.meta.title(route);
  } else return "";
});
</script>

<template>
  <div class="root">
    <header ref="headerRef">
      <HeaderToolBar
        @toggle-sidebar="isSidebarShow = !isSidebarShow"
        @toggle-logger="isUserLoggerShow = !isUserLoggerShow"
        @toggle-launcher="isNewWorkLauncherShow! = !isNewWorkLauncherShow"
      />
    </header>

    <main class="relative flex">
      <CollapseHTransition>
        <aside v-if="isSidebarShow">
          <nav><MenuSidebar /></nav>
        </aside>
      </CollapseHTransition>

      <section>
        <n-spin
          :show="loadingStore._getIsLoading"
          size="medium"
          stroke="#7c3aed"
        >
          <div v-if="pageTitle" ref="titleRef" class="main__title">
            <h2 class="pl-3 border-l-4 border-primary-400 font-bold text-lg">
              {{ pageTitle }}
            </h2>
          </div>

          <router-view class="main__content" />
        </n-spin>
      </section>
    </main>

    <footer></footer>

    <Transition name="fade">
      <BlurMask v-if="isUserLoggerShow" class="justify-center items-center">
        <UserLogger @close="isUserLoggerShow = false" />
      </BlurMask>
    </Transition>

    <Transition name="fade">
      <BlurMask
        v-if="isNewWorkLauncherShow"
        class="justify-center items-start pt-[160px]"
      >
        <NewWorkLauncher @close="isNewWorkLauncherShow = false" />
      </BlurMask>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
.root {
  --rootBackgroundColor: theme("colors.gray.900");
  --headerHeight: v-bind(headerHeight + "px");
  --titleHeight: v-bind(titleHeight + "px");
  --asideWidth: 240px;

  min-width: 360px;
  background-color: var(--rootBackgroundColor);
}

header {
  @apply sticky top-0 z-global-2 border-b border-slate-600 shadow-md shadow-black/30;
}

aside {
  @apply absolute lg:static z-global-1 flex-shrink-0 h-full lg:h-auto border-r border-slate-600;
  top: 0;
  left: 0;
  width: var(--asideWidth);
  background-color: var(--rootBackgroundColor);

  nav {
    position: sticky;
    top: var(--headerHeight);
  }
}

section {
  @apply min-w-full lg:min-w-0 flex-1;
  min-height: calc(100vh - var(--headerHeight));

  .main__title {
    @apply sticky z-10 flex items-center px-5 pt-3 pb-2 mb-2;
    top: var(--headerHeight);
    background-color: var(--rootBackgroundColor);
  }

  .main__content {
    @apply max-w-[560px] md:max-w-[768px] lg:max-w-[1024px] mx-auto px-5 overflow-hidden;
  }
}
</style>
