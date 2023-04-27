<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import LogCard from "@/components/common/LogCard.vue";
import { dateFormatter } from "@/helper/dateFormatter";
import { timestampCalculator } from "@/helper/timestampCalculator";

const route = useRoute();
const logStore = useLogStore();

const dateStamp = computed<number>(() => Number(route.params.date as string));
const dateText = computed<string>(() =>
  dateFormatter(dateStamp.value, {
    month: "short",
    day: "2-digit",
    hour: undefined,
    minute: undefined,
    second: undefined,
  })
);

async function fetchDailyLogs(stamp: number): Promise<void> {
  if (stamp === timestampCalculator("today") || !logStore.dailyLogs[stamp]) {
    await logStore._actFetchDailyLogs({ stamp });
  }
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
    <h2 class="flex items-center text-lg text-gray-500 mb-5">
      <div class="icon-file mr-3 text-xl" />
      {{ dateText }}
    </h2>
    <template v-if="logStore.dailyLogs[dateStamp]?.length">
      <LogCard
        v-for="log in logStore.dailyLogs[dateStamp]"
        :key="log.id"
        :log="log"
        class="mb-2"
      />
    </template>
    <template v-else> Empty </template>
  </div>
</template>

<style lang="scss" scoped></style>
