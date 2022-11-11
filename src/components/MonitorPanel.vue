<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type Ref } from "vue";
import { useLogStore } from "@/stores/log";
import { useResizeObserver } from "@vueuse/core";
import type { Range } from "@/components/basic/GraduatedScale.vue";
import GraduatedScale from "@/components/basic/GraduatedScale.vue";
import RangeInput from "@/components/basic/RangeInput.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";
import { timestampCalculator } from "@/helper/timestampCalculator";

defineEmits<{ (e: "close"): void }>();

const historyScroll = ref<HTMLElement | null>(null);
const historyScale = ref<InstanceType<typeof GraduatedScale> | null>(null);

const percentageScroll = ref<HTMLElement | null>(null);
const percentageScale = ref<InstanceType<typeof GraduatedScale> | null>(null);

function setResizeObserver(
  scroll: Ref<HTMLElement | null>,
  scale: Ref<InstanceType<typeof GraduatedScale> | null>
): void {
  let lastClientWidth = 0;
  let lastScrollWidth = 0;

  useResizeObserver(scale.value, () => {
    const clientWidth = scroll.value?.clientWidth || 0;
    const scrollWidth = scroll.value?.scrollWidth || 0;
    const scrollLeft = scroll.value?.scrollLeft || 0;

    if (lastClientWidth && lastScrollWidth) {
      const increasedWidth = scrollWidth - lastScrollWidth;
      const moveRatio = (lastClientWidth / 2 + scrollLeft) / lastScrollWidth;
      const offset = increasedWidth * moveRatio;
      scroll.value?.scrollTo(scrollLeft + offset, 0);
    }

    lastClientWidth = clientWidth;
    lastScrollWidth = scrollWidth;
  });
}

onMounted(async () => {
  await logState._actFetchTodayLog();
  nextTick(() => {
    setResizeObserver(historyScroll, historyScale);
    setResizeObserver(percentageScroll, percentageScale);
  });
});

const oneHour = 1000 * 60 * 60;
const historyScaleWidthPercent = ref<number>(200);
const percentageScaleWidthPercent = ref<number>(100);

function clockTickFormatter(value: number, index: number): string {
  const hour = new Date(value).getHours();
  return !(index % 3) ? `${hour}:00` : "";
}
function percentTickFormatter(value: number): string {
  return value + "%";
}

const logState = useLogStore();
const historyScaleData = computed<Range[]>(() => {
  return logState.today.map((log) => ({
    x1: log.startTimestamp,
    x2: log.endTimestamp,
    name: `${log.categoryName}/${log.taskTitle}`,
    color: log.getColor().styleString,
  }));
});
const percentageScaleData = computed<Range[]>(() => {
  let lastPercent = 0;
  return Object.entries(logState._getCategorizeTodayLog).map(([cate, logs]) => {
    const totalTime = logs.reduce<number>((sum, log) => {
      return sum + log.endTimestamp - log.startTimestamp;
    }, 0);
    const x1 = lastPercent;
    const x2 = Math.round(totalTime / logState._getTotalTodayLogTime) * 100;
    lastPercent = x2;
    return { x1, x2, name: cate, color: logs[0].getColor().styleString };
  });
});
</script>

<template>
  <div class="monitor-panel">
    <div class="shadow-mask shadow-light" />
    <div class="max-h-3/4 px-3 py-6 overflow-auto scrollbar-hide">
      <div class="max-w-[800px] mx-auto">
        <!-- history -->
        <div class="flex-between-end">
          <div class="monitor-panel__scale-tag">
            <span class="font-bold text-gray-600">任務歷程記錄</span>
          </div>

          <div class="flex items-center text-gray-600 mb-1 ml-1">
            <span class="icon-glass-minus"></span>
            <RangeInput
              v-model="historyScaleWidthPercent"
              :min-value="100"
              :max-value="500"
              :width="100"
              class="mt-1 mx-2"
            />
            <span class="icon-glass-add"></span>
          </div>
        </div>

        <div class="monitor-panel__scale">
          <div class="shadow-mask" />
          <div
            ref="historyScroll"
            class="px-5 py-3 bg-slate-100 overflow-auto scrollbar-hide"
          >
            <GraduatedScale
              ref="historyScale"
              :data="historyScaleData"
              :startValue="timestampCalculator('today')"
              :tickInterval="oneHour"
              :tickAmount="24"
              :minorTickAmount="3"
              :tick-formatter="clockTickFormatter"
              class="min-w-[500px]"
              :style="{ width: historyScaleWidthPercent + '%' }"
            />
          </div>
        </div>

        <!-- percentage -->
        <div class="flex-between-end mt-8">
          <div class="monitor-panel__scale-tag">
            <span class="font-bold text-gray-600">任務分類佔比</span>
          </div>

          <div class="flex items-center text-gray-600 mb-1 ml-1">
            <span class="icon-glass-minus"></span>
            <RangeInput
              v-model="percentageScaleWidthPercent"
              :min-value="100"
              :max-value="500"
              :width="100"
              class="mt-1 mx-2"
            />
            <span class="icon-glass-add"></span>
          </div>
        </div>

        <div class="monitor-panel__scale">
          <div class="shadow-mask" />
          <div
            ref="percentageScroll"
            class="px-5 py-3 bg-slate-100 overflow-auto scrollbar-hide"
          >
            <GraduatedScale
              ref="percentageScale"
              :data="percentageScaleData"
              :startValue="0"
              :tickInterval="10"
              :tickAmount="10"
              :minorTickAmount="4"
              :tick-formatter="percentTickFormatter"
              class="min-w-[500px]"
              :style="{ width: percentageScaleWidthPercent + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="monitor-panel__controller">
      <ButtonNormal
        :width="32"
        theme="cancel"
        :circle="true"
        @press="$emit('close')"
      >
        <span class="icon-cancel text-white/75"></span>
      </ButtonNormal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.monitor-panel {
  @apply relative w-full sm:w-11/12 max-w-[855px] min-w-[320px] border-t-12 border-b-0 sm:border-x-12 border-x-0 bg-zinc-300 shadow-xl shadow-darker;
  border-image: repeating-linear-gradient(
      -45deg,
      theme("colors.yellow.600"),
      theme("colors.yellow.600") 24px,
      theme("colors.stone.800") 25px,
      theme("colors.stone.800") 50px
    )
    13;

  &__scale-tag {
    @apply px-3 pt-2 rounded-t-md bg-gray-200 shadow-md shadow-light;
  }

  &__scale {
    @apply relative border-8 rounded-md rounded-tl-none shadow-md shadow-light;
  }

  &__controller {
    @apply absolute -top-3 right-0 py-[6px] px-2 border-4 border-b-0 border-gray-200 rounded-t-md bg-gray-200 shadow-inner-sm shadow-light -translate-y-full;
  }
}

.shadow-mask {
  @apply absolute -top-[1px] left-0 z-1 w-full h-full shadow-inner-md  pointer-events-none;
}
</style>
