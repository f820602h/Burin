<script setup lang="ts">
import { ref } from "vue";
import type { Log, CurrentLog } from "@/class/Log";
import CategoryTag from "@/components/common/CategoryTag.vue";
import CollapseTransition from "@/components/common/transition/CollapseTransition.vue";

defineProps<{
  log: Log | CurrentLog;
}>();

const isCollapse = ref<boolean>(true);
</script>

<template>
  <div class="log-block">
    <div class="flex items-start">
      <div class="w-full lg:flex-grow">
        <div class="log-block__title">{{ log.title }}</div>
        <div class="flex flex-wrap">
          <CategoryTag
            v-for="(cate, index) in log.categories"
            :key="index"
            :category-id="cate"
            class="flex-shrink-0 mr-2 my-1"
          />
        </div>
      </div>

      <div class="flex justify-center px-2 lg:px-3 lg:py-2 rounded bg-white/20">
        <div class="lg:text-4xl font-bold">
          <span>{{
            "duringTime" in log
              ? log.duringTime.hoursText
              : log.durationTime.hoursText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">hour</span>
          <span class="inline lg:hidden">:</span>

          <span>{{
            "duringTime" in log
              ? log.duringTime.minutesText
              : log.durationTime.minutesText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">min</span>
          <span class="inline lg:hidden">:</span>

          <span>{{
            "duringTime" in log
              ? log.duringTime.secondsText
              : log.durationTime.secondsText
          }}</span>
          <span class="hidden lg:inline text-sm mx-1">sec</span>
        </div>
      </div>
    </div>

    <CollapseTransition :duration="200">
      <template v-if="!isCollapse">
        <div class="w-full mt-2 pt-2 py-3 border-t border-gray-500">
          <div class="flex text-gray-300 text-sm mb-1">
            <div class="mr-2 font-bold">Started at:</div>
            <div>{{ log.startTimeText }}</div>
          </div>
          <div class="flex text-gray-300 text-sm">
            <div class="mr-2 font-bold">Finished at:</div>
            <div>{{ log.finishTimeText }}</div>
          </div>
        </div>
      </template>
    </CollapseTransition>

    <div class="log-block__more" @click="isCollapse = !isCollapse">
      <div class="text-xs font-bold text-gray-500">···</div>
    </div>

    <div class="log-block__lighting"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/mixin.scss";
.log-block {
  @apply relative px-4 py-3 rounded bg-gray-700 overflow-hidden;

  * {
    z-index: 2;
  }

  &__title {
    @apply flex-shrink-0  lg:text-2xl font-bold mr-3;
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
      theme("colors.gray.600"),
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
