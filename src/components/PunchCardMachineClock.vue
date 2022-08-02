<script setup lang="ts">
import { computed } from "vue";
import { useCurrentTaskDuration } from "@/composables/useCurrentTaskDuration";
import {
  durationTimeFormatter,
  type durationTimeObject,
} from "@/helper/durationTimeFormatter";
import DigitalNumber from "../components/common/DigitalNumber.vue";

const { duration } = useCurrentTaskDuration();

const formattedDuration = computed<durationTimeObject>(() => {
  return durationTimeFormatter(duration.value);
});
</script>

<template>
  <div class="punch-card-machine-clock flex-center-center">
    <div class="num-group">
      <DigitalNumber
        :num="Math.floor(formattedDuration.hours / 10)"
        :size="28"
        class="mr-1"
      />
      <DigitalNumber :num="formattedDuration.hours % 10" :size="28" />
    </div>
    <div class="w-[10px] text-center font-bold">:</div>
    <div class="num-group">
      <DigitalNumber
        :num="Math.floor(formattedDuration.minutes / 10)"
        :size="28"
        class="mr-1"
      />
      <DigitalNumber :num="formattedDuration.minutes % 10" :size="28" />
    </div>
    <div class="w-[10px] text-center font-bold">:</div>
    <div class="num-group">
      <DigitalNumber
        :num="Math.floor(formattedDuration.seconds / 10)"
        :size="28"
        class="mr-1"
      />
      <DigitalNumber :num="formattedDuration.seconds % 10" :size="28" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.num-group {
  @apply bg-white;
  @apply rounded-md;
  @apply px-1;
  @apply shadow-inner;
  @apply shadow-black/50;
  @apply text-center;
  @apply font-medium;
  width: 52px;
  line-height: 48px;
}
</style>
