<script setup lang="ts">
import { ref } from "vue";
import GraduatedScale from "@/components/common/GraduatedScale.vue";
import RangeInput from "@/components/common/RangeInput.vue";
import ButtonNormal from "@/components/common/ButtonNormal.vue";

const isPanelShow = ref<boolean>(false);
const historyScaleWidthPercent = ref<number>(200);
const proportionScaleWidthPercent = ref<number>(200);

const clockTickFormatter: (index: number) => string = (index) => {
  return !(index % 3) ? `${index}:00` : "";
};
const percentTickFormatter: (index: number) => string = (index) => {
  return `${index * 10}%`;
};
</script>

<template>
  <div
    class="fixed bottom-0 left-0 w-full transition-transform duration-500"
    :class="{ 'translate-y-full': !isPanelShow }"
  >
    <div class="monitor-panel relative">
      <div class="shadow-mask shadow-inner-md-light pointer-events-none" />
      <div class="relative max-h-screen-75 px-3 py-6 overflow-auto">
        <div class="max-w-[800px] mx-auto">
          <!-- history -->
          <div class="flex-between-end">
            <div class="px-3 pt-2 rounded-t-md bg-gray-200 shadow-md-light">
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

          <div
            class="relative border-8 rounded-md rounded-tl-none shadow-md-light"
          >
            <div class="shadow-mask shadow-inner-sm pointer-events-none" />
            <div class="px-5 py-3 bg-slate-100 overflow-auto">
              <GraduatedScale
                :tickAmount="25"
                :minorTickAmount="3"
                :tick-formatter="clockTickFormatter"
                class="min-w-[500px]"
                :style="{ width: historyScaleWidthPercent + '%' }"
              />
            </div>
          </div>

          <!-- proportion -->
          <div class="flex-between-end mt-8">
            <div class="px-3 pt-2 rounded-t-md bg-gray-200 shadow-md-light">
              <span class="font-bold text-gray-600">任務分類佔比</span>
            </div>

            <div class="flex items-center text-gray-600 mb-1 ml-1">
              <span class="icon-glass-minus"></span>
              <RangeInput
                v-model="proportionScaleWidthPercent"
                :min-value="100"
                :max-value="500"
                :width="100"
                class="mt-1 mx-2"
              />
              <span class="icon-glass-add"></span>
            </div>
          </div>

          <div
            class="relative border-8 rounded-md rounded-tl-none shadow-md-light"
          >
            <div class="shadow-mask shadow-inner-sm pointer-events-none" />
            <div class="px-5 py-3 bg-slate-100 overflow-auto">
              <GraduatedScale
                :tickAmount="11"
                :minorTickAmount="4"
                :tick-formatter="percentTickFormatter"
                class="min-w-[500px]"
                :style="{ width: proportionScaleWidthPercent + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute -top-3 right-0 pt-[10px] pb-2 px-4 border-4 border-b-0 border-gray-100 rounded-t-md bg-gray-100 shadow-inner-sm-light -translate-y-full"
      >
        <span class="font-bold mr-2">監控面板</span>
        <ButtonNormal
          :width="35"
          theme="confirm"
          class="mx-1"
          :disabled="isPanelShow"
          @press="isPanelShow = true"
        >
          <span class="icon-top"></span>
        </ButtonNormal>
        <ButtonNormal
          :width="35"
          theme="confirm"
          class="mx-1"
          :disabled="!isPanelShow"
          @press="isPanelShow = false"
        >
          <span class="icon-down"></span
        ></ButtonNormal>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.monitor-panel {
  border-image: repeating-linear-gradient(
      -45deg,
      theme("colors.yellow.600"),
      theme("colors.yellow.600") 24px,
      theme("colors.stone.800") 25px,
      theme("colors.stone.800") 50px
    )
    13;

  @apply w-full sm:w-11/12 max-w-[855px] min-w-[320px] mx-auto border-t-12 border-b-0 sm:border-x-12 border-x-0 bg-zinc-300;
}

.shadow-mask {
  @apply absolute -top-[1px] left-0 z-10 w-full h-full;
}
</style>
