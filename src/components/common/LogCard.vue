<script setup lang="ts">
import { computed } from "vue";
import { useCategoryStore } from "@/stores/category";
import type { Category } from "@/class/Category";
import { type Log, CurrentLog, LogStatus } from "@/class/Log";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";
import TagPill from "@/components/basic/TagPill.vue";
import AlarmSetter from "@/components/common/AlarmSetter.vue";

const props = defineProps<{
  log: Log | CurrentLog;
}>();

const categoryStore = useCategoryStore();

const category = computed<Category[]>(() => {
  return categoryStore.categories.filter((cate) =>
    props.log.categories.includes(cate.id),
  );
});
</script>

<template>
  <div>
    <div
      v-if="log instanceof CurrentLog"
      class="flex justify-between items-end mb-1 bg-violet-900/30"
    >
      <div class="flex">
        <ButtonBasic
          v-if="log.status === LogStatus.IN_PROGRESS"
          class="flex-shrink-0 p-2 !rounded-sm mr-1"
          @click="log?.pause()"
        >
          <div class="icon-pause" />
        </ButtonBasic>

        <ButtonBasic
          v-else-if="log.status === LogStatus.PAUSE"
          class="flex-shrink-0 p-2 !rounded-sm mr-1"
          @click="log?.resume()"
        >
          <div class="icon-play relative left-[2px]" />
        </ButtonBasic>

        <ButtonBasic
          class="flex-shrink-0 p-2 !rounded-sm mr-1"
          @click="log?.finish()"
        >
          <div class="icon-stop" />
        </ButtonBasic>
      </div>

      <AlarmSetter />
    </div>

    <div
      class="log-card relative p-2 rounded-sm overflow-hidden"
      :class="log instanceof CurrentLog ? 'bg-primary' : 'bg-gray-700'"
    >
      <div class="flex justify-between items-center">
        <div
          class="w-full mr-3 px-1 md:text-lg lg:text-3xl lg:leading-10 font-bold truncate"
        >
          {{ log.title }}
        </div>

        <div
          class="flex-shrink-0 flex-center-center px-2 py-[2px] rounded-sm text-sm lg:text-3xl font-bold bg-white/20"
        >
          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime,
            ).hoursText
          }}</span>
          <span class="text-xs lg:text-lg mx-1">:</span>

          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime,
            ).minutesText
          }}</span>
          <span class="text-xs lg:text-lg mx-1">:</span>

          <span>{{
            durationTimeFormatter(
              log instanceof CurrentLog ? log.duringTime : log.durationTime,
            ).secondsText
          }}</span>
          <!-- <span class="text-xs lg:text-xs ml-1">:</span> -->
        </div>
      </div>

      <div class="min-h-[30px] flex flex-wrap mt-1 px-1">
        <TagPill
          v-for="(cate, index) in category"
          :key="index"
          :prefix="'#'"
          :label="cate.category"
          :value="cate.id"
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
