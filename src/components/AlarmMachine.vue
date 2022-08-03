<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import { useCurrentTaskDuration } from "@/composables/useCurrentTaskDuration";
import DigitalNumber from "@/components/common/DigitalNumber.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import ButtonNormal from "@/components/common/ButtonNormal.vue";

const taskStore = useTaskStore();
const { duration } = useCurrentTaskDuration();

const intervalList: number[] = [5, 10, 15, 20, 25, 30, 45, 60, 90];

const isAutoRemind = ref<boolean>(true);
const isAutoUnplug = ref<boolean>(false);
const isRepeat = ref<boolean>(false);
const intervalIndex = ref<number>(2);

const intervalMinutes = computed<number>(() => {
  return intervalList[intervalIndex.value];
});
const afterIntervalTimes = computed<number>(() => {
  return Math.floor(duration.value / (intervalMinutes.value * 1000));
});

watch(isAutoUnplug, (status) => {
  if (status) isRepeat.value = false;
});
watch(isRepeat, (status) => {
  if (status) {
    isAutoUnplug.value = false;
    unWatchAfterIntervalTimes();
    startWatchAfterIntervalTimes();
  }
});
watch(
  () => taskStore.currentTask,
  () => {
    unWatchAfterIntervalTimes();
    startWatchAfterIntervalTimes();
  }
);

let unWatchAfterIntervalTimes: () => void = () => {
  return;
};
const startWatchAfterIntervalTimes: () => void = () => {
  if (!taskStore.currentTask) return;
  unWatchAfterIntervalTimes = watch(afterIntervalTimes, (times) => {
    if (!times) return;
    if (isAutoRemind.value) console.log("time out!");
    if (isAutoUnplug.value) taskStore.removeCurrentTask();
    if (!isRepeat.value) unWatchAfterIntervalTimes();
  });
};
const onIntervalBtnPress: (direction: number) => void = (direction) => {
  unWatchAfterIntervalTimes();
  intervalIndex.value += direction;
  startWatchAfterIntervalTimes();
};
</script>

<template>
  <div class="alarm-machine w-[305px] pb-5 rounded-3xl bg-gray-300 shadow-md">
    <div class="p-5 rounded-2xl bg-white overflow-hidden">
      <div class="flex-center-center">
        <div class="self-end text-sm font-bold text-neutral-900 pb-1">
          <div class="border-b-2 border-gray-800">間隔</div>
          <div>分鐘</div>
        </div>

        <div class="num-group mt-1 mx-2">
          <DigitalNumber
            :num="Math.floor(intervalMinutes / 10)"
            :size="36"
            class="mr-1"
          />
          <DigitalNumber :num="intervalMinutes % 10" :size="36" />
        </div>
        <div>
          <ButtonNormal
            theme="dark"
            :circle="true"
            :width="28"
            :height="25"
            :disabled="intervalIndex === intervalList.length - 1"
            @press="onIntervalBtnPress(1)"
          >
            <span class="icon-top"></span>
          </ButtonNormal>
          <div class="mb-2"></div>
          <ButtonNormal
            theme="dark"
            :circle="true"
            :width="28"
            :height="25"
            :disabled="intervalIndex === 0"
            @press="onIntervalBtnPress(-1)"
          >
            <span class="icon-down"></span>
          </ButtonNormal>
        </div>

        <div class="ml-5">
          <div class="flex-center-center">
            <div class="flex-center-center text-neutral-600">
              <span class="icon-bell mr-1"></span>
              <span class="text-sm mr-2">提醒</span>
              <ToggleSwitch v-model="isAutoRemind" />
            </div>
          </div>

          <div class="flex-center-center mt-4">
            <div class="flex-center-center text-neutral-600">
              <span class="icon-cancel mr-1"></span>
              <span class="text-sm mr-2">退卡</span>
              <ToggleSwitch v-model="isAutoUnplug" />
            </div>
          </div>
        </div>
      </div>

      <hr
        class="h-[3px] my-3 border-0 rounded-full bg-gray-50 shadow-[inset_1px_1px_0px_0px_rgba(0,0,0,0.1)]"
      />

      <div class="flex justify-between items-center mb-4">
        <div class="text-lg leading-5 font-black italic text-orange-700">
          TOMATO
        </div>
        <div class="flex-center-center text-neutral-600">
          <span class="icon-repeat mr-1"></span>
          <span class="text-sm mr-2">重複</span>
          <ToggleSwitch v-model="isRepeat" />
        </div>
      </div>

      <div
        class="alarm-machine__horn h-8 p-2 rounded-full shadow-inner-sm-lighter overflow-hidden"
      >
        <div v-for="i in 3" :key="i" class="flex-center-center w-full mb-1">
          <div
            v-for="j in 1 - Math.abs(2 - i) + 19"
            :key="j"
            class="flex-shrink-0 w-1 h-1 mx-1 rounded-full bg-zinc-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alarm-machine {
  .num-group {
    @apply bg-white rounded-md px-1 shadow-inner-sm text-center font-medium;
    width: 64px;
    line-height: 64px;
  }

  &__timing,
  &__action {
    box-shadow: inset 0 2px 2px 0 rgba(#ccc, 0.5), 0 1px 4px 0 rgba(#aaa, 0.5);
  }

  &__horn {
    background: linear-gradient(
      to bottom,
      theme("colors.gray.200"),
      theme("colors.white")
    );
  }
}
</style>
