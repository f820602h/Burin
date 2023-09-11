<script setup lang="ts">
import { ref, onBeforeMount, watch, computed, h } from "vue";
import type { Log, CurrentLog } from "@/class/Log";
import type { ViewExpose } from "@/types/viewExpose";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import { useLogPanelStore } from "@/stores/logPanel";
import { timestampCalculator } from "@/helper/timestampCalculator";
import { dateFormatter } from "@/helper/dateFormatter";
import LogCard from "@/components/common/LogCard.vue";
import LogPanelCreator from "@/components/common/LogPanelCreator.vue";
import ButtonBasic from "@/components/basic/ButtonBasic.vue";

const route = useRoute();
const logStore = useLogStore();
const logPanelStore = useLogPanelStore();

const logs = ref<(Log | CurrentLog)[]>();
const isPanelCreatorShow = ref<boolean>(false);

// const panels = computed(() => {
//   return logPanelStore.daily.userPanels.length
//     ? logPanelStore.daily.userPanels
//     : logPanelStore.daily.defaultPanels;
// });

async function fetchDailyLogs(stamp: number): Promise<void> {
  if (stamp === timestampCalculator("today") || !logStore.dailyLogs[stamp]) {
    await logStore._actFetchDailyLogs({ stamp });
  }
  logs.value = logStore.dailyLogs[stamp];
}

onBeforeMount(async () => {
  await fetchDailyLogs(Number(route.params.date as string));
});
onBeforeRouteUpdate(async (to, from, next) => {
  await fetchDailyLogs(Number(to.params.date as string));
  next();
});

watch(
  () => logStore.currentLog,
  () => fetchDailyLogs(Number(route.params.date as string)),
);

defineExpose<ViewExpose>({
  title: computed(() => {
    return dateFormatter(Number(route.params.date as string), {
      month: "short",
      day: "2-digit",
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
  }),
  subtitle: computed(() => {
    return Number(route.params.date as string) === timestampCalculator("today")
      ? "Today"
      : "";
  }),
  extra: [
    h(
      ButtonBasic,
      { size: "sm", onClick: () => (isPanelCreatorShow.value = true) },
      () => "+ View Panel",
    ),
  ],
});
</script>

<template>
  <div class="daily-view">
    <template v-if="logs && logs.length">
      <div v-for="panel in logPanelStore._getDailyPanels" :key="panel.id">
        <div v-if="panel.calculator(logs).length">
          <div class="flex justify-between items-center">
            <div class="flex text-gray-500 mb-2 px-1 text-base font-bold">
              <span
                v-for="(text, index) in panel.title.split(' ')"
                :key="index"
                class="first-letter:text-xl ml-1 first:ml-0"
              >
                {{ text }}
              </span>
            </div>
          </div>

          <template v-for="log in panel.calculator(logs)" :key="log.id">
            <LogCard :log="log" class="mb-2" />
          </template>
        </div>
      </div>
    </template>
    <template v-else> Empty </template>

    <LogPanelCreator
      :show="isPanelCreatorShow"
      @close="isPanelCreatorShow = false"
    />
  </div>
</template>

<style lang="scss" scoped></style>
