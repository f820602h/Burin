<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import SliderKnob from "./SliderKnob.vue";

const props = withDefaults(
  defineProps<{
    width?: number;
    minValue?: number;
    maxValue?: number;
    modelValue?: number;
  }>(),
  {
    width: 200,
    minValue: 0,
    maxValue: 100,
    modelValue: 50,
  }
);

const emit = defineEmits<{ (e: "update:modelValue", value: number): void }>();

const smooth = 1.15;

const isActive = ref<boolean>(false);
const originX = ref<number>(0);
const offsetX = ref<number>(0);
const lastLeftRatio = ref<number>(
  (props.modelValue - props.minValue) / (props.maxValue - props.minValue)
);

const currentLeftRatio = computed<number>(() => {
  const offset = (offsetX.value / props.width) * smooth;
  return Math.min(Math.max(lastLeftRatio.value + offset, 0), 1);
});

watch(currentLeftRatio, (ratio) => {
  const value = Math.round(
    ratio * (props.maxValue - props.minValue) + props.minValue
  );
  emit("update:modelValue", value);
});

onMounted(() => {
  document.body.addEventListener("mousemove", onBodyMousemove);
  document.body.addEventListener("mouseup", onBodyMouseup);
  document.body.addEventListener("mouseleave", onBodyMouseleave);
});

const onRodMousedown: (e: MouseEvent) => void = (e) => {
  isActive.value = true;
  originX.value = e.clientX;
};
const onGrooveClick: (e: MouseEvent) => void = (e) => {
  lastLeftRatio.value = e.offsetX / props.width;
};
const onBodyMousemove: (e: MouseEvent) => void = (e) => {
  if (!isActive.value) return;
  e.preventDefault();
  offsetX.value = e.clientX - originX.value;
};
const onBodyMouseup: () => void = () => {
  if (!isActive.value) return;
  isActive.value = false;
  lastLeftRatio.value = currentLeftRatio.value;
  offsetX.value = 0;
};
const onBodyMouseleave: () => void = () => {
  if (!isActive.value) return;
  isActive.value = false;
};
</script>

<template>
  <div class="relative px-4" :style="{ width: width + 'px' }">
    <div class="absolute-default full pt-[5px]" @click="onGrooveClick">
      <div class="h-2 rounded-full bg-stone-400 shadow-inner-sm" />
    </div>

    <SliderKnob
      class="relative -translate-x-1/2 cursor-ew-resize"
      :style="{ left: currentLeftRatio * 100 + '%' }"
      theme="dark"
      @mousedown="onRodMousedown"
    />
  </div>
</template>

<style scoped></style>
