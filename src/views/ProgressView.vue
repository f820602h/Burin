<script setup lang="ts">
import { computed } from "vue";
import { object } from "yup";
import { useLogStore } from "@/stores/log";
import { useForm } from "vee-validate";
import {
  type WorkFields,
  WorkFieldsName,
  WorkTagsFieldsName,
  workFieldsValidation,
} from "@/system/fieldValidation";
import LogCard from "@/components/common/LogCard.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import TagSelector from "@/components/common/TagSelector.vue";
import { useAlarm } from "@/composables/useAlarm";
import { LogStatus } from "@/class/Log";
import CollapseHTransition from "@/components/common/transition/CollapseHTransition.vue";

const logStore = useLogStore();

const { handleSubmit, values, resetForm } = useForm<WorkFields>({
  validationSchema: object({ ...workFieldsValidation }),
});
const bindingTags = computed(() => {
  return values[WorkFieldsName.TAGS][WorkTagsFieldsName.BINDING];
});
const startHandler = handleSubmit(async (values) => {
  return await logStore
    ._actPushLog({
      title: values[WorkFieldsName.TITLE],
      startTimestamp: new Date().getTime(),
      categories: bindingTags.value,
    })
    .then(async () => {
      resetForm();
      await logStore._actFetchCurrentLog();
    })
    .catch((err) => err);
});

const {
  alarmSetting,
  toggleAlarm,
  intervalMinutes,
  intervalIncreaseDisabled,
  intervalDecreaseDisabled,
  increaseIntervalIndex,
  decreaseIntervalIndex,
} = useAlarm();
</script>

<template>
  <div class="progress-view">
    <div class="progress-view__progressing">
      <template
        v-if="logStore.currentLog && !logStore.currentLog.finishTimestamp"
      >
        <LogCard :log="logStore.currentLog" />
      </template>
      <template v-else>
        <div class="px-4 py-3 rounded bg-gray-700 overflow-hidden">
          Nothing In Progress...
        </div>
      </template>

      <template v-if="logStore.currentLog">
        <div class="progress-view__progressing__controller">
          <div class="flex px-3 py-2 rounded-full bg-white/10 mr-2">
            <button
              v-if="logStore.currentLog.status === LogStatus.IN_PROGRESS"
              class="btn w-8 h-8 rounded-full mr-3"
              @click="logStore.currentLog?.pause"
            >
              <div class="icon-pause" />
            </button>

            <button
              v-else-if="logStore.currentLog.status === LogStatus.PAUSE"
              class="btn w-8 h-8 rounded-full mr-3"
              @click="logStore.currentLog?.resume"
            >
              <div class="icon-play pl-[2px]" />
            </button>

            <button
              class="btn btn w-8 h-8 rounded-full"
              @click="logStore.currentLog?.finish"
            >
              <div class="icon-stop" />
            </button>
          </div>

          <div class="flex-center-center px-3 py-2 rounded-full bg-white/10">
            <button class="btn btn w-7 h-7 rounded-full" @click="toggleAlarm">
              <div
                class="text-sm"
                :class="alarmSetting.isAlarmOn ? 'icon-bell-off' : 'icon-bell'"
              />
            </button>

            <CollapseHTransition
              :duration="150"
              :easing-enter="'linear'"
              :easing-leave="'linear'"
            >
              <div v-if="alarmSetting.isAlarmOn" class="flex">
                <div class="mx-2 text-xs leading-[1]">rings<br />every</div>
                <div class="flex font-bold">
                  <button
                    class="btn w-8 h-7 pl-1 rounded-l-full"
                    :disabled="intervalDecreaseDisabled"
                    @click="decreaseIntervalIndex"
                  >
                    <div class="icon-down" />
                  </button>
                  <div class="alarm-min">{{ intervalMinutes }} mins</div>
                  <button
                    class="btn w-8 h-7 pr-1 rounded-r-full"
                    :disabled="intervalIncreaseDisabled"
                    @click="increaseIntervalIndex"
                  >
                    <div class="icon-top" />
                  </button>
                </div>
              </div>
            </CollapseHTransition>
          </div>
        </div>
      </template>
    </div>

    <form class="progress-view__new-work" @keypress.enter.prevent>
      <fieldset class="border border-gray-300 rounded-lg">
        <legend class="px-2 text-center text-4xl text-gray-300 font-bold">
          New Work
        </legend>

        <div class="px-3 py-4">
          <div class="mb-1">
            <div class="text-sm text-gray-500 mb-1">
              <label for="title">WORK TITLE</label>
            </div>
            <VerifyInput
              :field="WorkFieldsName.TITLE"
              type="text"
              placeholder="Please Input Work Title"
            />
          </div>

          <div>
            <div class="flex-between-center text-sm text-gray-500 mb-1">
              <label for="tags">TAGS</label>
              <span v-if="values.tags">{{ bindingTags.length }}／5</span>
            </div>
            <TagSelector
              v-model="values.tags"
              :field="WorkFieldsName.TAGS"
              placeholder="Please Select Tags"
            />
          </div>

          <div class="mt-5 text-center">
            <button
              class="btn w-full h-9 rounded text-lg font-bold"
              @click="startHandler"
              v-text="'START'"
            />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/animation.scss";
.progress-view {
  @apply relative flex justify-center items-center;

  &__progressing {
    @apply absolute-default w-full p-2;

    &__controller {
      @apply flex justify-center mt-2;

      .alarm-min {
        @apply w-[78px] h-7 leading-7 text-center text-slate-700 bg-slate-200;
      }
    }
  }

  &__new-work {
    @apply w-full max-w-[500px];
    @media screen and (max-height: 800px) {
      @apply self-end mb-3;
    }
  }
}
</style>
