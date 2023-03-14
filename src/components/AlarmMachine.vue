<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import { useServiceWorkerPostMessage } from "@/composables/useServiceWorkerPostMessage";
import DigitalNumber from "@/components/basic/DigitalNumber.vue";
import ToggleSwitch from "@/components/basic/ToggleSwitch.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";

const taskStore = useTaskStore();

const intervalList: number[] = [5, 10, 15, 20, 25, 30, 45, 60, 90];

const alarmSetting = reactive<{
  isAutoRemind: boolean;
  isAutoUnplug: boolean;
  intervalIndex: number;
}>({
  isAutoRemind: true,
  isAutoUnplug: false,
  intervalIndex: 2,
});

const intervalMinutes = computed<number>(() => {
  return intervalList[alarmSetting.intervalIndex];
});

watch(alarmSetting, () => {
  unsubscribeNotification();
  subscribeNotification();
});

watch(
  () => taskStore.currentTask,
  () => {
    unsubscribeNotification();
    subscribeNotification();
  },
  { immediate: true }
);

function subscribeNotification(): void {
  if (!taskStore.currentTask || !alarmSetting.isAutoRemind) return;
  useServiceWorkerPostMessage("subscribeTaskNotification", {
    taskName: taskStore.currentTask.title,
    startTime: taskStore.currentTask.lastStartTimestamp,
    intervalMinutes: intervalMinutes.value,
  });
}

function unsubscribeNotification(): void {
  useServiceWorkerPostMessage("unsubscribeTaskNotification");
}
</script>

<template>
  <div class="alarm-machine">
    <div class="p-5 rounded-2xl bg-white overflow-hidden">
      <div class="flex-center-center">
        <div class="self-end text-sm font-bold text-neutral-900 pb-1">
          <div class="border-b-2 border-gray-800">間隔</div>
          <div>分鐘</div>
        </div>

        <div class="num-group">
          <DigitalNumber
            :num="Math.floor(intervalMinutes / 10)"
            :size="36"
            class="mr-1"
          />
          <DigitalNumber :num="intervalMinutes % 10" :size="36" />
        </div>
        <div class="self-center">
          <ButtonNormal
            theme="dark"
            :circle="true"
            :width="28"
            :height="25"
            :disabled="alarmSetting.intervalIndex === intervalList.length - 1"
            @press="alarmSetting.intervalIndex += 1"
          >
            <span class="icon-top"></span>
          </ButtonNormal>
          <div class="mb-[10px]"></div>
          <ButtonNormal
            theme="dark"
            :circle="true"
            :width="28"
            :height="25"
            :disabled="alarmSetting.intervalIndex === 0"
            @press="alarmSetting.intervalIndex -= 1"
          >
            <span class="icon-down"></span>
          </ButtonNormal>
        </div>

        <div class="ml-5">
          <div class="flex-center-center">
            <div class="flex-center-center text-neutral-600">
              <span class="icon-bell mr-1"></span>
              <span class="text-sm mr-2">提醒</span>
              <ToggleSwitch v-model="alarmSetting.isAutoRemind" />
            </div>
          </div>

          <div class="flex-center-center mt-4">
            <div class="flex-center-center text-neutral-600">
              <span class="icon-cancel mr-1"></span>
              <span class="text-sm mr-2">退卡</span>
              <ToggleSwitch v-model="alarmSetting.isAutoUnplug" />
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
      </div>

      <div class="alarm-machine__horn">
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
  @apply w-[305px] pb-5 rounded-3xl bg-gray-300 shadow-md;
  .num-group {
    @apply text-center font-medium w-[64px] leading-[64px] mx-2 px-1 rounded-md bg-white shadow-inner-sm;
  }

  &__horn {
    @apply h-8 p-2 rounded-full shadow-inner-sm shadow-lighter overflow-hidden;
    background: linear-gradient(
      to bottom,
      theme("colors.gray.200"),
      theme("colors.white")
    );
  }
}
</style>
