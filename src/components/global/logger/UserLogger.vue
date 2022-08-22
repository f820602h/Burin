<script setup lang="ts">
import { computed, ref } from "vue";
import type { ScreenConfig, ScreenConfigModesMap } from "./types";
import ModeLogIn from "./ModeLogIn.vue";
import ModeSignUp from "./ModeSignUp.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";

withDefaults(defineProps<{ show?: boolean }>(), { show: false });
const emit = defineEmits<{ (e: "close"): void }>();

type ModeInstance = InstanceType<typeof ModeLogIn | typeof ModeSignUp>;
const currentMode = ref<keyof ScreenConfigModesMap>("LogIn");
const currentModeInstance = ref<ModeInstance | null>(null);

const screenConfigModesMap: ScreenConfigModesMap = {
  LogIn: {
    component: ModeLogIn,
    confirmButtonText: "登入",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "取消",
    cancelButtonCallback: () => emit("close"),
  },
  SignUp: {
    component: ModeSignUp,
    confirmButtonText: "註冊",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "返回",
    cancelButtonCallback: () => changeMode("LogIn"),
  },
};

const currentScreenConfig = computed<ScreenConfig>(() => {
  return screenConfigModesMap[currentMode.value];
});

const changeMode: (mode: keyof ScreenConfigModesMap) => void = (mode) => {
  currentMode.value = mode;
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed-layer flex-center-center bg-black/30 backdrop-blur-[2px]"
    >
      <div class="logger pb-8 rounded-2xl bg-zinc-700">
        <div class="flex-center-center pb-5 rounded-2xl bg-zinc-600">
          <div class="monitor-fixture">
            <div v-for="i in 5" :key="i" class="groove" />
          </div>

          <div class="relative">
            <div class="monitor-frame">
              <div class="monitor-screen">
                <div class="stripe" />
                <component
                  ref="currentModeInstance"
                  :is="currentScreenConfig.component"
                  @change-mode="changeMode"
                />
              </div>
            </div>

            <div class="button-module">
              <div class="rounded-t-2xl rounded-b-md bg-zinc-600">
                <div class="flex-between-center px-5 pt-3 pb-3">
                  <ButtonNormal
                    theme="confirm"
                    :text="currentScreenConfig.confirmButtonText"
                    :width="100"
                    :height="35"
                    class="font-bold"
                    @click="currentScreenConfig.confirmButtonCallback"
                  />
                  <ButtonNormal
                    theme="cancel"
                    :text="currentScreenConfig.cancelButtonText"
                    :width="100"
                    :height="35"
                    class="font-bold"
                    @click="currentScreenConfig.cancelButtonCallback"
                  />
                </div>
                <div class="flex-center-center">
                  <div
                    v-for="i in 7"
                    :key="i"
                    class="w-[10px] h-5 mx-2 -mb-2 rounded-t-full bg-black/20 shadow-inner-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="monitor-fixture">
            <div v-for="i in 5" :key="i" class="groove" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.monitor-frame {
  @apply -mt-6 p-5 border-8 border-zinc-600 rounded-xl bg-zinc-700 shadow-light;
  box-shadow: theme("boxShadow.inner-lg"), theme("boxShadow.md");
}

.monitor-screen {
  @apply relative w-[300px] h-[280px] p-3 rounded-xl bg-[#213821] text-[#13fc5c] overflow-hidden;

  .stripe {
    background-image: repeating-linear-gradient(
      transparent,
      transparent 8px,
      rgba(0, 0, 0, 0.08) 8px,
      rgba(0, 0, 0, 0.08) 11px
    );
    animation: a infinite 10s linear;
    @apply absolute-default w-full h-[200%] shadow-inner-sm pointer-events-none;
  }
}

.monitor-fixture {
  @apply flex justify-between flex-col w-8 h-[100px] -mx-1 py-4 px-1 rounded-md bg-zinc-700 shadow-md;

  .groove {
    @apply h-1 rounded-full shadow-inner-md;
  }
}

.button-module {
  @apply relative w-[260px] mx-auto -mt-10 pb-2 rounded-t-2xl rounded-b-md bg-zinc-700 shadow-sm shadow-dark;
}

@keyframes a {
  0% {
    top: 0;
  }
  100% {
    top: -100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;

  :deep(.logger) {
    @apply transition-transform duration-500;
  }
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;

  :deep(.logger) {
    @apply -translate-y-10;
  }
}
</style>
