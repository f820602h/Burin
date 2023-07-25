<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import { Report } from "@/class/Report";
import { LogStatus, type CurrentLog, type Log } from "@/class/Log";
import LogCard from "@/components/common/LogCard.vue";
import AlarmSetter from "@/components/common/AlarmSetter.vue";
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

watch(
  () => logStore.currentLog,
  () => fetchDailyLogs(Number(route.params.date as string))
);
</script>

<template>
  <div class="daily-view">
    <template v-if="report">
      <div v-if="report.currentLog">
        <div class="flex mb-2 pl-1 text-gray-500 text-xs font-bold">
          <span class="first-letter:text-base">IN</span>
          <span class="first-letter:text-base ml-1">PROGRESS</span>
        </div>

        <div class="flex justify-between items-end mb-1 bg-violet-900/30">
          <div class="flex">
            <button
              v-if="report.currentLog.status === LogStatus.IN_PROGRESS"
              class="btn p-2 rounded-sm mr-1"
              @click="report.currentLog?.pause"
            >
              <div class="icon-pause" />
            </button>

            <button
              v-else-if="report.currentLog.status === LogStatus.PAUSE"
              class="btn p-2 rounded-sm mr-1"
              @click="report.currentLog?.resume"
            >
              <div class="icon-play relative left-[2px]" />
            </button>

            <button
              class="btn p-2 rounded-sm mr-1"
              @click="report.currentLog?.finish"
            >
              <div class="icon-stop" />
            </button>
          </div>

          <AlarmSetter />
        </div>

        <LogCard :log="report.currentLog" class="mb-2" />
      </div>
      <!-- <button class="btn" @click="report.direction = 'asc'">asc</button>
      <button class="btn" @click="report.direction = 'desc'">desc</button> -->
      <div v-if="report.logs.length">
        <div class="flex text-gray-500 mb-2 px-1 text-xs font-bold">
          <span class="first-letter:text-base">HISTORY</span>
        </div>
        <template v-for="log in report.logs" :key="log.id">
          <LogCard v-if="log !== report.currentLog" :log="log" class="mb-2" />
        </template>
      </div>
    </template>
    <template v-else> Empty </template>
  </div>
</template>

<style lang="scss" scoped></style>
