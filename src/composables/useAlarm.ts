import { computed, reactive, watch } from "vue";
import { useLogStore } from "@/stores/log";
import { useServiceWorkerPostMessage } from "@/composables/useServiceWorkerPostMessage";
import { LogStatus } from "@/class/Log";

const intervalList: number[] = [5, 10, 15, 20, 25, 30, 45, 60, 90];

export function useAlarm() {
  const logStore = useLogStore();

  const alarmSetting = reactive<{
    isAlarmOn: boolean;
    intervalIndex: number;
  }>({
    isAlarmOn: false,
    intervalIndex: 2,
  });

  function toggleAlarm() {
    alarmSetting.isAlarmOn = !alarmSetting.isAlarmOn;
  }

  const intervalMinutes = computed<number>(() => {
    return intervalList[alarmSetting.intervalIndex];
  });

  const intervalIncreaseDisabled = computed<boolean>(() => {
    return alarmSetting.intervalIndex >= intervalList.length - 1;
  });

  const intervalDecreaseDisabled = computed<boolean>(() => {
    return alarmSetting.intervalIndex <= 0;
  });

  function increaseIntervalIndex() {
    alarmSetting.intervalIndex += 1;
    if (intervalIncreaseDisabled.value) {
      alarmSetting.intervalIndex = intervalList.length - 1;
    }
  }

  function decreaseIntervalIndex() {
    alarmSetting.intervalIndex -= 1;
    if (intervalDecreaseDisabled.value) {
      alarmSetting.intervalIndex = 0;
    }
  }

  watch(alarmSetting, () => {
    unsubscribeNotification();
    subscribeNotification();
  });

  watch(
    () => logStore.currentLog,
    () => {
      unsubscribeNotification();
      subscribeNotification();
    },
    { immediate: true, deep: true }
  );

  function subscribeNotification(): void {
    if (
      !logStore.currentLog ||
      logStore.currentLog.status !== LogStatus.IN_PROGRESS ||
      !alarmSetting.isAlarmOn
    ) {
      return;
    }
    useServiceWorkerPostMessage("subscribeCurrentLogNotification", {
      title: logStore.currentLog.title,
      startTimestamp: logStore.currentLog.startTimestamp,
      pauseDuration: logStore.currentLog.pauseDuration,
      intervalMinutes: intervalMinutes.value,
    });
  }

  function unsubscribeNotification(): void {
    useServiceWorkerPostMessage("unsubscribeCurrentLogNotification");
  }

  return {
    intervalList,
    alarmSetting,
    toggleAlarm,
    intervalMinutes,
    intervalIncreaseDisabled,
    intervalDecreaseDisabled,
    increaseIntervalIndex,
    decreaseIntervalIndex,
  };
}
