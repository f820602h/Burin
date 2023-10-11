<script setup lang="ts">
import TransitionBasic from "@/components/common/transition/TransitionBasic.vue";
import BlurMask from "@/components/common/BlurMask.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const props = withDefaults(
  defineProps<{
    show?: boolean;
    title: string;
    leftButtonText?: string;
    rightButtonText?: string;
    leftButtonDisabled?: boolean;
    rightButtonDisabled?: boolean;
    leftButtonHandler?: () => void;
    rightButtonHandler?: () => void;
    showBodyMask?: boolean;
  }>(),
  {
    show: false,
    leftButtonText: "Cancel",
    rightButtonText: "Confirm",
    leftButtonDisabled: false,
    rightButtonDisabled: false,
    leftButtonHandler: undefined,
    rightButtonHandler: undefined,
    showBodyMask: false,
  },
);
</script>

<template>
  <TransitionBasic :name="'model-fade'">
    <BlurMask v-if="show" class="justify-center items-start">
      <div class="model">
        <div class="min-w-0 h-full pt-9 border-2 border-gray-400 rounded-lg">
          <div class="model__title">
            <slot name="title">
              {{ props.title }}
            </slot>
          </div>

          <div class="model__body">
            <slot name="body" />

            <div class="model__body__buttons">
              <ButtonBasic
                v-if="leftButtonText && leftButtonHandler"
                class="w-full uppercase"
                :size="'lg'"
                :theme="'primary-outline'"
                :text="leftButtonText"
                :disabled="leftButtonDisabled"
                @click="leftButtonHandler"
              />
              <ButtonBasic
                v-if="rightButtonText && rightButtonHandler"
                class="w-full uppercase"
                :size="'lg'"
                :text="rightButtonText"
                :disabled="rightButtonDisabled"
                @click="rightButtonHandler"
              />
            </div>

            <TransitionBasic :name="'fade'">
              <div v-if="showBodyMask" class="model__body__mask"></div>
            </TransitionBasic>
          </div>
        </div>

        <div class="model__close-btn" @click="emit('close')">
          <div class="icon-cancel" />
        </div>
      </div>
    </BlurMask>
  </TransitionBasic>
</template>

<style scoped lang="scss">
.model {
  @apply relative w-full h-full md:h-auto md:max-w-[500px] md:mt-[10vh] p-2 rounded-xl bg-black;

  &__title {
    @apply absolute top-0 md:-top-3 left-1/2 text-center text-3xl text-gray-300 font-bold -translate-x-1/2;

    &::before {
      @apply absolute top-0 md:top-auto md:bottom-0 -left-3 -z-1 h-1/2 bg-black;
      width: calc(100% + 24px);
      content: "";
    }
  }

  &__body {
    @apply relative flex flex-col px-3 py-4 min-h-full;

    &__buttons {
      @apply flex justify-between mt-auto pt-5 text-center empty:hidden;

      button:first-child:not(:last-child) {
        @apply mr-2;
      }
    }

    &__mask {
      @apply absolute inset-0 bg-black/70;
    }
  }

  &__close-btn {
    @apply absolute top-0 right-0 w-8 h-8 rounded-full flex-center-center text-white bg-black text-lg cursor-pointer;
  }
}
</style>
