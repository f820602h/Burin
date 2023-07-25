<script setup lang="ts">
import { useAlarm } from "@/composables/useAlarm";
import CollapseHTransition from "@/components/common/transition/CollapseHTransition.vue";

const {
  alarmSetting,
  toggleAlarm,
  intervalMinutes,
  intervalIncreaseDisabled,
  intervalDecreaseDisabled,
  increaseIntervalIndex,
  decreaseIntervalIndex,
} = useAlarm();
</script>

<template>
  <div class="flex overflow-hidden">
    <button class="btn btn p-2 rounded-sm" @click="toggleAlarm">
      <div :class="alarmSetting.isAlarmOn ? 'icon-bell-off' : 'icon-bell'" />
    </button>

    <CollapseHTransition
      :duration="150"
      :easing-enter="'linear'"
      :easing-leave="'linear'"
    >
      <div v-if="alarmSetting.isAlarmOn" class="flex items-center">
        <div class="flex-shrink-0 mx-2 text-xs text-center">
          rings<br />every
        </div>

        <div class="flex-shrink-0 flex font-bold">
          <button
            class="flex-shrink-0 btn p-2 rounded-sm"
            :disabled="intervalDecreaseDisabled"
            @click="decreaseIntervalIndex"
          >
            <div class="icon-down" />
          </button>

          <div class="flex-shrink-0 flex items-center px-2 text-xs">
            {{ intervalMinutes }} mins
          </div>

          <button
            class="flex-shrink-0 btn p-2 rounded-sm"
            :disabled="intervalIncreaseDisabled"
            @click="increaseIntervalIndex"
          >
            <div class="icon-top" />
          </button>
        </div>
      </div>
    </CollapseHTransition>
  </div>
</template>

<style scoped></style>
