<script setup lang="ts">
import { ref, watch } from "vue";
import { useElementSize } from "@vueuse/core";
import { useLoadingStore } from "@/stores/loading";
import { useBreakPoint } from "@/composables/useBreakPoint";
import { vOnClickOutside } from "@vueuse/components";
import CollapseHTransition from "@/components/common/transition/CollapseHTransition.vue";
import HeaderToolBar from "@/components/global/header/HeaderToolBar.vue";
import MenuSidebar from "@/components/global/sidebar/MenuSidebar.vue";
import UserLogger from "@/components/global/logger/UserLogger.vue";
import NewWorkLauncher from "@/components/global/NewWorkLauncher.vue";
import { NConfigProvider, NSpin, darkTheme } from "naive-ui";

const loadingStore = useLoadingStore();
const breakpoints = useBreakPoint();

const headerRef = ref<HTMLElement | null>(null);
const { height: headerHeight } = useElementSize(headerRef);
const viewHeaderRef = ref<HTMLElement | null>(null);
const { height: viewHeaderHeight } = useElementSize(viewHeaderRef);

const isUserLoggerShow = ref<boolean>(false);
const isNewWorkLauncherShow = ref<boolean>(false);
const isSidebarShow = ref<boolean>(false);

watch(
  () => breakpoints.greaterOrEqual("lg").value,
  (value) => (isSidebarShow.value = value),
  { immediate: true },
);

function closeSidebarOnClickOutside(): void {
  if (!breakpoints.greaterOrEqual("lg").value) {
    isSidebarShow.value = false;
  }
}

const themeOverrides = {
  Input: {
    color: "rgb(55 65 81)",
    colorFocus: "rgb(55 65 81)",
    colorActive: "rgb(55 65 81)",
    borderHover: "1px solid #866cd1",
    borderFocus: "1px solid #866cd1",
    borderActive: "1px solid #866cd1",
    boxShadowActive: "0 0 8px 0 rgba(134, 108, 209, 0.4)",
    boxShadowFocus: "0 0 8px 0 rgba(134, 108, 209, 0.4)",
  },
  Select: {
    peers: {
      InternalSelection: {
        color: "rgb(55 65 81)",
        colorActive: "rgb(55 65 81)",
        borderHover: "1px solid #866cd1",
        borderFocus: "1px solid #866cd1",
        borderActive: "1px solid #866cd1",
        boxShadowActive: "0 0 8px 0 rgba(134, 108, 209, 0.4)",
        boxShadowFocus: "0 0 8px 0 rgba(134, 108, 209, 0.4)",
      },
    },
  },
};
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
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
          <aside
            v-if="isSidebarShow"
            v-on-click-outside="[
              closeSidebarOnClickOutside,
              { ignore: [`[aria-label='toggle-sidebar-button']`] },
            ]"
          >
            <nav><MenuSidebar /></nav>
          </aside>
        </CollapseHTransition>

        <section>
          <n-spin
            :show="loadingStore._getIsLoading"
            size="medium"
            stroke="#7c3aed"
          >
            <div ref="viewHeaderRef" class="view-header">
              <div class="flex items-center">
                <div class="view-header__deco" />
                <h2 id="view-header__title"></h2>
                <p id="view-header__subtitle"></p>
              </div>

              <div id="view-header__extra" class="ml-auto"></div>
            </div>

            <router-view v-slot="{ Component }">
              <component
                :is="Component"
                class="view-body"
                @toggle-launcher="
                  isNewWorkLauncherShow! = !isNewWorkLauncherShow
                "
              />
            </router-view>
          </n-spin>
        </section>
      </main>

      <footer></footer>

      <UserLogger :show="isUserLoggerShow" @close="isUserLoggerShow = false" />

      <NewWorkLauncher
        :show="isNewWorkLauncherShow"
        @close="isNewWorkLauncherShow = false"
      />
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.root {
  --rootBackgroundColor: theme("colors.gray.900");
  --headerHeight: v-bind(headerHeight + "px");
  --viewHeaderHeight: v-bind(viewHeaderHeight + "px");
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

  .view-header {
    @apply sticky z-10 flex justify-between items-center min-h-14 px-3 md:px-5 py-3 empty:hidden;
    top: var(--headerHeight);
    background-color: var(--rootBackgroundColor);

    &:has(#view-header__title:empty) {
      @apply hidden;
    }

    &__deco {
      @apply border-l-4 border-primary-400 h-6;
    }

    #view-header__title {
      @apply pl-3 font-bold text-lg empty:hidden;
    }

    #view-header__subtitle {
      @apply ml-3 px-[6px] py-[2px] rounded-sm text-xs font-bold bg-primary-500 empty:hidden;
    }
  }

  .view-body {
    @apply max-w-[560px] md:max-w-[768px] lg:max-w-[1024px] mx-auto px-3 pt-15 md:px-5 overflow-hidden;
  }
}
</style>
