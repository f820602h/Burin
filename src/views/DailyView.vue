<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import type { Log, CurrentLog } from "@/class/Log";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import { usePanelStore } from "@/stores/panel";
import { timestampCalculator } from "@/helper/timestampCalculator";
import LogCard from "@/components/common/LogCard.vue";

const route = useRoute();
const logStore = useLogStore();
const panelStore = usePanelStore();
const logs = ref<(Log | CurrentLog)[]>();

async function fetchDailyLogs(stamp: number): Promise<void> {
  if (stamp === timestampCalculator("today") || !logStore.dailyLogs[stamp]) {
    await logStore._actFetchDailyLogs({ stamp });
  }
  logs.value = logStore.dailyLogs[stamp];
}

const panels = computed(() => {
  return panelStore.daily.userPanels.length
    ? panelStore.daily.userPanels
    : panelStore.daily.defaultPanels;
});

onBeforeMount(async () => {
  await fetchDailyLogs(Number(route.params.date as string));
});
onBeforeRouteUpdate(async (to, from, next) => {
  await fetchDailyLogs(Number(to.params.date as string));
  next();
});

watch(
  () => logStore.currentLog,
  () => fetchDailyLogs(Number(route.params.date as string))
);
</script>

<template>
  <div class="daily-view">
    <template v-if="logs && logs.length">
      <div v-for="panel in panels" :key="panel.id">
        <template v-if="panel.calculator(logs).length">
          <div class="flex text-gray-500 mb-2 px-1 text-xs font-bold">
            <span
              v-for="(text, index) in panel.name.split(' ')"
              :key="index"
              class="first-letter:text-base ml-1 first:ml-0"
            >
              {{ text }}
            </span>
          </div>

          <template v-for="log in panel.calculator(logs)" :key="log.id">
            <LogCard :log="log" class="mb-2" />
          </template>
        </template>
      </div>
    </template>
    <template v-else> Empty </template>
  </div>
</template>

<style lang="scss" scoped></style>
