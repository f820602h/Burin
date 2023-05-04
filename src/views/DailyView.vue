<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import { Report } from "@/class/Report";
import type { CurrentLog, Log } from "@/class/Log";
import LogCard from "@/components/common/LogCard.vue";
import { timestampCalculator } from "@/helper/timestampCalculator";

const route = useRoute();
const logStore = useLogStore();
const report = ref<Report<Log | CurrentLog>>();

async function fetchDailyLogs(stamp: number): Promise<void> {
  if (stamp === timestampCalculator("today") || !logStore.dailyLogs[stamp]) {
    await logStore._actFetchDailyLogs({ stamp });
  }
  report.value = new Report(logStore.dailyLogs[stamp]);
}

onBeforeMount(async () => {
  await fetchDailyLogs(Number(route.params.date as string));
});

onBeforeRouteUpdate(async (to, from, next) => {
  await fetchDailyLogs(Number(to.params.date as string));
  next();
});
</script>

<template>
  <div class="daily-view">
    <template v-if="report?.logs.length">
      <!-- <button class="btn" @click="report.direction = 'asc'">asc</button>
      <button class="btn" @click="report.direction = 'desc'">desc</button> -->
      <div>
        <div class="text-gray-500 mb-2 text-sm px-1">LOGS</div>
        <LogCard
          v-for="log in report.logs"
          :key="log.id"
          :log="log"
          class="mb-2"
        />

        <!-- {{ report.categories }} -->
      </div>
    </template>
    <template v-else> Empty </template>
  </div>
</template>

<style lang="scss" scoped></style>
