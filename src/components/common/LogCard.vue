<script setup lang="ts">
import { type Log, CurrentLog } from "@/class/Log";
import { LogStatus } from "@/class/Log";
import CategoryTag from "@/components/common/CategoryTag.vue";

defineProps<{
  log: Log | CurrentLog;
}>();
</script>

<template>
  <div class="log-card" :class="{ current: log instanceof CurrentLog }">
    <div class="flex">
      <div class="flex flex-col justify-between w-full">
        <div class="log-card__title">{{ log.title }}</div>
        <div class="flex flex-wrap mt-2">
          <CategoryTag
            v-for="(cate, index) in log.categories"
            :key="index"
            :category-id="cate"
            class="flex-shrink-0 mr-2 my-1"
          />
        </div>
      </div>

      <div>
        <div
          class="w-[120px] md:w-[245px] md:py-1 text-center rounded bg-white/20"
        >
          <div class="text-lg md:text-3xl font-bold">
            <span>{{
              log instanceof CurrentLog
                ? log.duringTime.hoursText
                : log.durationTime.hoursText
            }}</span>
            <span class="hidden md:inline text-sm mx-1">hour</span>
            <span class="inline md:hidden mx-1">:</span>

            <span>{{
              log instanceof CurrentLog
                ? log.duringTime.minutesText
                : log.durationTime.minutesText
            }}</span>
            <span class="hidden md:inline text-sm mx-1">min</span>
            <span class="inline md:hidden mx-1">:</span>

            <span>{{
              log instanceof CurrentLog
                ? log.duringTime.secondsText
                : log.durationTime.secondsText
            }}</span>
            <span class="hidden md:inline text-sm mx-1">sec</span>
          </div>
        </div>

        <div class="md:flex md:items-center w-full mt-2 px-1 whitespace-nowrap">
          <div class="flex justify-between text-gray-300 text-xs mb-1 md:mb-0">
            <div class="mr-2 font-bold">Started at:</div>
            <div>{{ log.startTimeText }}</div>
          </div>
          <div class="hidden md:block mx-1">｜</div>
          <div class="flex justify-between text-gray-300 text-xs">
            <div v-if="log.status === LogStatus.FINISH" class="mr-2 font-bold">
              Finished at:
            </div>
            <div>{{ log.finishTimeText.toLocaleUpperCase() }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="'duringTime' in log" class="log-card__lighting"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/mixin.scss";
.log-card {
  @apply relative px-4 py-3 rounded bg-gray-700 overflow-hidden;

  &.current {
    @apply bg-[#2c1c5b];
  }

  * {
    z-index: 2;
  }

  &__title {
    @apply flex-shrink-0 text-lg md:text-2xl font-bold mr-3;
    @include text-overflow(64, 2);
  }

  &__more {
    @apply absolute bottom-[6px] left-1/2 px-[6px] rounded bg-gray-400/10 hover:bg-gray-400/20 -translate-x-1/2 duration-200 cursor-pointer;
  }

  &__lighting {
    z-index: 1;
    left: -100%;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 33%,
      theme("colors.violet.900"),
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
