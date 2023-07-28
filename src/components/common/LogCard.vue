<script setup lang="ts">
import { type Log, CurrentLog } from "@/class/Log";
import CategoryTag from "@/components/common/CategoryTag.vue";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

defineProps<{
  log: Log | CurrentLog;
}>();
</script>

<template>
  <div>
    <div
      class="log-card relative p-2 rounded-sm bg-gray-700 overflow-hidden"
      :class="{ 'bg-primary': log instanceof CurrentLog }"
    >
      <div class="flex justify-between items-center">
        <div
          class="w-full mr-3 px-1 md:text-lg lg:text-3xl lg:leading-10 font-bold truncate"
        >
          {{ log.title }}
        </div>

        <div
          class="flex-shrink-0 px-2 py-[2px] rounded-sm text-sm lg:text-3xl font-bold bg-white/20"
        >
          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime
            ).hoursText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">hour</span>
          <span class="inline lg:hidden mx-1">:</span>

          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime
            ).minutesText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">min</span>
          <span class="inline lg:hidden mx-1">:</span>

          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime
            ).secondsText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">sec</span>
        </div>
      </div>

      <div class="min-h-[30px] flex flex-wrap mt-1 px-1">
        <CategoryTag
          v-for="(cate, index) in log.categories"
          :key="index"
          :category-id="cate"
          class="flex-shrink-0 mr-2 my-1"
        />
      </div>

      <div v-if="'duringTime' in log" class="log-card__lighting"></div>
    </div>

    <div
      class="flex justify-end items-center px-1 mt-[2px] whitespace-nowrap text-gray-500"
    >
      <div class="flex justify-between text-xs">
        <div class="mr-2 font-bold">Started at:</div>
        <div>{{ log.startTimeText }}</div>
      </div>

      <div class="text-sm">｜</div>

      <div class="flex justify-between text-xs">
        <div class="mr-2 font-bold">Finished at:</div>
        <div>{{ log.finishTimeText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/mixin.scss";
.log-card {
  * {
    z-index: 2;
  }

  &__lighting {
    z-index: 1;
    left: -100%;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 33%,
      theme("colors.primary.500"),
      rgba(0, 0, 0, 0) 66%
    );
    animation: shine 2.5s infinite linear;
    @apply absolute full top-0 opacity-50;

    @keyframes shine {
      65% {
        left: 100%;
      }
      100% {
        left: 100%;
      }
    }
  }
}
</style>
