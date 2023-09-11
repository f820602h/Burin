<script setup lang="ts">
import { computed, ref } from "vue";
import { Modes, type ScreenConfig, type ScreenConfigModesMap } from "./types";
import ModeLogIn from "./ModeLogIn.vue";
import ModeSignUp from "./ModeSignUp.vue";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import { useRouter } from "vue-router";

const emit = defineEmits<{ (e: "close"): void }>();
const props = defineProps<{ show?: boolean }>();

const router = useRouter();

type ModeInstance = InstanceType<typeof ModeLogIn | typeof ModeSignUp>;
const currentMode = ref<keyof ScreenConfigModesMap>(Modes.LOGIN);
const currentModeInstance = ref<ModeInstance | null>(null);

const screenConfigModesMap: ScreenConfigModesMap = {
  [Modes.LOGIN]: {
    component: ModeLogIn,
    title: "Welcome Back",
    confirmButtonText: "LOGIN",
    confirmButtonCallback: () => {
      currentModeInstance.value
        ?.confirmHandler()
        .then(() => {
          emit("close");
          router.push({ name: "Today" });
        })
        .catch((err) => err);
    },
    cancelButtonText: "CANCEL",
    cancelButtonCallback: () => emit("close"),
  },
  [Modes.SIGN_UP]: {
    component: ModeSignUp,
    title: "Join Us",
    confirmButtonText: "SIGN UP",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "BACK",
    cancelButtonCallback: () => changeMode(Modes.LOGIN),
  },
};

const currentScreenConfig = computed<ScreenConfig>(() => {
  return screenConfigModesMap[currentMode.value];
});

function changeMode(mode: keyof ScreenConfigModesMap): void {
  currentMode.value = mode;
}
</script>

<template>
  <ModelBasic
    :show="props.show"
    :title="currentScreenConfig.title"
    :left-button-text="currentScreenConfig.cancelButtonText"
    :right-button-text="currentScreenConfig.confirmButtonText"
    :left-button-handler="currentScreenConfig.cancelButtonCallback"
    :right-button-handler="currentScreenConfig.confirmButtonCallback"
    @close="emit('close')"
  >
    <template #body>
      <form @keypress.enter.prevent>
        <fieldset>
          <component
            :is="currentScreenConfig.component"
            ref="currentModeInstance"
            @change-mode="changeMode"
          />
        </fieldset>
      </form>
    </template>
  </ModelBasic>
</template>

<style scoped lang="scss"></style>
