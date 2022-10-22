<script setup lang="ts">
import BlurMask from "@/components/common/BlurMask.vue";

type DialogTheme = "info" | "warning" | "danger";
type DialogThemeColor = string;
const dialogThemeMap: Record<DialogTheme, DialogThemeColor> = {
  info: "bg-cyan-500",
  warning: "bg-orange-500",
  danger: "bg-red-500",
};

type DialogBtnTheme = "normal" | "positive" | "negative";
type DialogBtnThemeColor = string;
const dialogBtnThemeMap: Record<DialogBtnTheme, DialogBtnThemeColor> = {
  normal: "bg-zinc-300 hover:bg-zinc-400 active:bg-zinc-500",
  positive: "bg-green-500 hover:bg-green-400 active:bg-green-600",
  negative: "bg-red-500 hover:bg-red-400 active:bg-red-600",
};

withDefaults(
  defineProps<{
    show: boolean;
    theme: DialogTheme;
    title?: string;
    content?: string;
    rightBtnType: DialogBtnTheme;
    rightBtnText: string;
    leftBtnType?: DialogBtnTheme;
    leftBtnText?: string;
  }>(),
  {
    show: false,
    theme: "warning",
    title: "",
    content: "",
    rightBtnType: "positive",
    rightBtnText: "確定",
  }
);

defineEmits<{ (e: "right"): void; (e: "left"): void }>();
</script>

<template>
  <teleport to="#app > .root">
    <Transition name="fade">
      <BlurMask v-if="show" class="justify-center items-center">
        <div class="w-[400px] p-2 rounded-lg bg-zinc-300 shadow-md shadow-dark">
          <div class="border-4 rounded-lg border-black overflow-hidden">
            <div
              class="py-2 border-b-4 border-black"
              :class="dialogThemeMap[theme]"
            >
              <h2 class="text-center text-black text-3xl font-bold">
                {{ theme.toUpperCase() }}
              </h2>
            </div>

            <div class="min-h-[160px] p-3 text-black bg-white">
              <slot name="title">
                <h3 class="text-2xl font-bold mb-4">{{ title }}</h3>
              </slot>
              <slot name="content">
                <p>{{ content }}</p>
              </slot>
            </div>

            <div class="border-t-4 border-black text-black text-lg font-bold">
              <button
                v-if="leftBtnType && leftBtnText"
                class="w-1/2 py-1 border-r-2 border-black"
                :class="dialogBtnThemeMap[leftBtnType]"
                @click="$emit('left')"
              >
                {{ leftBtnText }}
              </button>
              <button
                class="w-1/2 py-1 border-l-2 border-black"
                :class="dialogBtnThemeMap[rightBtnType]"
                @click="$emit('right')"
              >
                {{ rightBtnText }}
              </button>
            </div>
          </div>
        </div>
      </BlurMask>
    </Transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
</style>
