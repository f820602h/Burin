<script setup lang="ts">
import { ref, toRef } from "vue";
import { useBodyScrollFixed } from "@/composables/useBodyScrollFixed";
import GraduatedScale from "@/components/basic/GraduatedScale.vue";
import RangeInput from "@/components/basic/RangeInput.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";

const props = withDefaults(defineProps<{ show?: boolean }>(), { show: false });
defineEmits<{ (e: "close"): void }>();

const refShow = toRef(props, "show");
useBodyScrollFixed(refShow);

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
  <Transition name="collapse">
    <div
      v-if="show"
      class="fixed-layer flex-center-end bg-black/30 backdrop-blur-[2px]"
    >
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
              <div class="monitor-panel__scale-tag">
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

            <div class="monitor-panel__scale">
              <div class="shadow-mask" />
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

        <div class="monitor-panel__controller">
          <ButtonNormal
            :width="50"
            theme="cancel"
            text="關閉"
            @press="$emit('close')"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.mask {
  @apply w-screen h-screen flex-center-end bg-black/30 backdrop-blur-[2px];
}
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
    @apply absolute -top-3 right-0 pt-[10px] pb-2 px-3 border-4 border-b-0 border-gray-200 rounded-t-md bg-gray-200 shadow-inner-sm shadow-light -translate-y-full;
  }
}

.shadow-mask {
  @apply absolute -top-[1px] left-0 z-1 w-full h-full shadow-inner-md  pointer-events-none;
}

.collapse-enter-active,
.collapse-leave-active {
  @apply transition-opacity duration-500;

  :deep(.monitor-panel) {
    @apply transition-transform duration-300;
  }
}

.collapse-enter-from,
.collapse-leave-to {
  @apply opacity-0;

  :deep(.monitor-panel) {
    @apply translate-y-full;
  }
}
</style>
