<script setup lang="ts">
import { ref } from "vue";
import GraduatedScale from "@/components/GraduatedScale.vue";
import RangeInput from "./common/RangeInput.vue";

const scaleWidthPercent = ref<number>(200);
const clockTickFormatter: (index: number) => string = (index) => {
  return !(index % 3) ? `${index}` : "";
};
</script>

<template>
  <div
    class="w-11/12 max-w-[1024px] min-w-[320px] mx-auto rounded-t-md shadow-xl overflow-hidden"
  >
    <div class="y full pt-3 px-3 rounded-b-md">
      <div class="px-4 py-6 bg-zinc-300 shadow-inner-md">
        <div class="max-w-[800px] mx-auto">
          <div
            class="relative border-[15px] border-zinc-200 rounded-md bg-slate-100 shadow-sm-light overflow-hidden"
          >
            <div class="shadow-mask pointer-events-none" />
            <div class="px-4 py-3 overflow-auto">
              <GraduatedScale
                :tickAmount="25"
                :minorTickAmount="3"
                :tick-formatter="clockTickFormatter"
                :style="{ width: scaleWidthPercent + '%' }"
              />
            </div>
          </div>
          <div class="flex items-center text-gray-600 mt-2">
            <span class="icon-glass-minus"></span>
            <RangeInput
              v-model="scaleWidthPercent"
              :min-value="100"
              :max-value="500"
              :width="150"
              class="mt-1 mx-2"
            />
            <span class="icon-glass-add"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.y {
  background: repeating-linear-gradient(
    45deg,
    theme("colors.yellow.600") 0px,
    theme("colors.yellow.600") 25px,
    theme("colors.stone.800") 25px,
    theme("colors.stone.800") 50px
  );
}

.shadow-mask {
  @apply shadow-inner-sm;
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply z-10;
  @apply w-full;
  @apply h-full;
}
</style>
