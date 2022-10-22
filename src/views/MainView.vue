<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useTaskStore } from "@/stores/task";
import PunchCardMachine from "@/components/PunchCardMachine.vue";
import AlarmMachine from "@/components/AlarmMachine.vue";
import MonitorPanel from "@/components/MonitorPanel.vue";
import TaskDrawer from "@/components/TaskDrawer.vue";
import ToolBar from "@/components/ToolBar.vue";
import BlurMask from "@/components/common/BlurMask.vue";
import type { Action } from "@/components/ToolBar.vue";

const taskStore = useTaskStore();

const isMonitorPanelShow = ref<boolean>(false);
const isTaskDrawerShow = ref<boolean>(false);
const toolBarActions: Action[] = reactive([
  {
    title: "任務",
    icon: "icon-task",
    callback: () => (isTaskDrawerShow.value = true),
  },
  {
    title: "統計",
    icon: "icon-chart",
    callback: () => (isMonitorPanelShow.value = true),
  },
]);

const mainViewBgColor = computed<string>(() => {
  return taskStore._getCurrentTaskCategory?.getColor().styleString || "";
});
</script>

<template>
  <Transition name="mask-collapse-down">
    <BlurMask v-if="isTaskDrawerShow" class="justify-start">
      <TaskDrawer @close="isTaskDrawerShow = false" />
    </BlurMask>
  </Transition>

  <main
    class="background-animate h-full"
    :style="{ backgroundImage: mainViewBgColor }"
  >
    <div class="flex-center-center flex-col h-full pt-[80px] pb-8 bg-black/25">
      <PunchCardMachine />
      <div class="usb-cable relative flex-center-center flex-col -mt-4 sm">
        <div class="usb-cable__head">
          <div class="usb-cable__head-inner full" />
        </div>
        <div class="usb-cable__line" />
      </div>
      <AlarmMachine />
    </div>
  </main>

  <ToolBar :actions="toolBarActions" />

  <Transition name="mask-collapse-up">
    <BlurMask v-if="isMonitorPanelShow" class="justify-center items-end">
      <MonitorPanel @close="isMonitorPanelShow = false" />
    </BlurMask>
  </Transition>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
.background-animate {
  background-size: 300% 300%;
  animation: flow 7s infinite;
}

@keyframes flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.usb-cable {
  &__head {
    @apply w-10 h-12 pb-3 rounded-b-lg bg-gray-300 shadow-xl;
  }

  &__head-inner {
    @apply rounded-b-lg bg-gray-100 shadow-inner-sm;
  }

  &__line {
    @apply w-3 h-8 md:h-15 -mt-2 border border-gray-400/60 rounded-t-3xl bg-gray-100 shadow-inner-md shadow-lighter;
  }
}
</style>
