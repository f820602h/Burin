<script setup lang="ts">
import type { Task } from "@/class/Task";
import { ref, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import TaskCard from "@/components/TaskCard.vue";
import PunchCardMachineClock from "@/components/PunchCardMachineClock.vue";
import ButtonNormal from "@/components/common/ButtonNormal.vue";

const taskStore = useTaskStore();
const leaveTask = ref<Task>();

watch(
  () => taskStore.currentTask,
  (newTask, oldTask) => {
    leaveTask.value = oldTask;
  }
);
</script>

<template>
  <div
    class="punch-card-machine relative w-[264px] pb-6 rounded-2xl shadow-md-light"
  >
    <Transition name="unplug" @after-enter="leaveTask = undefined">
      <TaskCard
        v-if="leaveTask"
        :task="leaveTask"
        class="absolute -top-11 left-8 opacity-0 -translate-y-full"
      />
    </Transition>

    <Transition name="insert">
      <TaskCard
        v-if="!leaveTask && taskStore.currentTask"
        :task="taskStore.currentTask"
        class="absolute -top-11 left-8"
      />
    </Transition>

    <div class="relative z-10 flex flex-col full rounded-2xl overflow-hidden">
      <div class="pt-11 bg-gray-200"></div>
      <div class="flex">
        <div class="flex-1 bg-gray-200"></div>
        <div class="window rounded-md" />
        <div class="flex-1 bg-gray-200"></div>
      </div>

      <div class="flex-1 pt-8 pb-11 bg-gray-200">
        <PunchCardMachineClock />
        <div class="text-center mt-8">
          <ButtonNormal
            theme="cancel"
            :disabled="!taskStore.currentTask"
            @click="taskStore.removeCurrentTask"
          >
            <div class="flex-center-center">
              <span class="icon-cancel mr-1"></span>
              <span class="text-md">退卡</span>
            </div>
          </ButtonNormal>
        </div>
      </div>

      <div class="screw top-3 left-3" />
      <div class="screw top-3 right-3" />
      <div class="screw bottom-3 left-3" />
      <div class="screw bottom-3 right-3" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.punch-card-machine {
  background: linear-gradient(
    to top,
    theme("colors.gray.500") 50px,
    theme("colors.gray.300") 50px
  );
  .window {
    box-shadow: inset 0 2px 4px 0 rgba(black, 0.5),
      0 0 0 4px theme("colors.gray.200");
    width: 176px;
    height: 100px;
  }
}

.screw {
  @apply absolute;
  @apply w-2;
  @apply h-2;
  @apply rounded-full;
  @apply bg-gray-300;
  @apply shadow-inner-sm;
}

.unplug-enter-active {
  transition: all 0.3s;
}
.unplug-enter-from {
  opacity: 1;
  transform: translateY(0);
}

.insert-enter-active {
  transition: all 0.6s;
}
.insert-enter-from {
  opacity: 0;
  transform: translateY(-120%);
}
</style>
