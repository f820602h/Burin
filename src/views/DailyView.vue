<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from "vue";
import type { Log, CurrentLog } from "@/class/Log";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { useLogStore } from "@/stores/log";
import { useLogPanelStore } from "@/stores/logPanel";
import { timestampCalculator } from "@/helper/timestampCalculator";
import { dateFormatter } from "@/helper/dateFormatter";
import LogCard from "@/components/common/LogCard.vue";
import LogPanelCreator from "@/components/common/LogPanelCreator.vue";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import { NPopover } from "naive-ui";
import { LogPanel } from "@/class/Panel";

defineEmits<{ (e: "toggle-launcher"): void }>();

const route = useRoute();
const logStore = useLogStore();
const logPanelStore = useLogPanelStore();

const logs = ref<(Log | CurrentLog)[]>();
const isPanelManagerShow = ref<boolean>(false);
const isPanelDeleteConfirmShow = ref<boolean>(false);
const isPanelCreatorShow = ref<boolean>(false);
const initPanelCreatorValues = ref<LogPanel>();
const deletingPanel = ref<LogPanel>();

const viewTitle = computed(() => {
  return dateFormatter(Number(route.params.date as string), {
    month: "short",
    day: "2-digit",
    hour: undefined,
    minute: undefined,
    second: undefined,
  });
});

const viewSubtitle = computed(() => {
  return Number(route.params.date as string) === timestampCalculator("today")
    ? "Today"
    : "";
});

async function fetchDailyLogs(stamp: number): Promise<void> {
  if (stamp === timestampCalculator("today") || !logStore.dailyLogs[stamp]) {
    await logStore._actFetchDailyLogs({ stamp });
  }
  logs.value = logStore.dailyLogs[stamp];
}

onBeforeMount(async () => {
  await fetchDailyLogs(Number(route.params.date as string));
});
onBeforeRouteUpdate(async (to, _from, next) => {
  await fetchDailyLogs(Number(to.params.date as string));
  next();
});

function closePanelManager(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  if (target.getAttribute("aria-label") !== "toggle-panel-manager-button") {
    isPanelManagerShow.value = false;
  }
}

function openPanelDeleteConfirm(panel: LogPanel): void {
  deletingPanel.value = panel;
  isPanelDeleteConfirmShow.value = true;
}

function closePanelDeleteConfirm(): void {
  isPanelDeleteConfirmShow.value = false;
  deletingPanel.value = undefined;
}

function deletePanel(): void {
  if (deletingPanel.value) {
    logPanelStore._actDeleteDailyPanel(deletingPanel.value.id);
    closePanelDeleteConfirm();
  }
}

function openPanelCreator(panel?: LogPanel): void {
  initPanelCreatorValues.value = panel;
  isPanelManagerShow.value = false;
  isPanelCreatorShow.value = true;
}

function closePanelCreator(): void {
  isPanelCreatorShow.value = false;
  initPanelCreatorValues.value = undefined;
}

watch(
  () => logStore.currentLog,
  () => fetchDailyLogs(Number(route.params.date as string)),
);
</script>

<template>
  <div class="daily-view">
    <Teleport to="#view-header__title">{{ viewTitle }}</Teleport>
    <Teleport to="#view-header__subtitle">{{ viewSubtitle }}</Teleport>

    <template v-if="logs && logs.length">
      <div>
        <div
          v-for="panel in logPanelStore._getDailyPanels"
          :key="panel.id"
          class="mb-2 pb-4 border-b border-white/10 last:border-b-0"
        >
          <div class="flex justify-between items-center mb-2 px-1">
            <div class="flex text-gray-500 text-base font-bold">
              <span
                v-for="(text, index) in panel.title.split(' ')"
                :key="index"
                class="ml-1 first:ml-0 first-letter:text-xl uppercase"
              >
                {{ text }}
              </span>
            </div>
          </div>

          <div v-if="panel.calculator(logs).length">
            <template v-for="log in panel.calculator(logs)" :key="log.id">
              <LogCard :log="log" class="mb-2 last:mb-0" />
            </template>
          </div>
          <div v-else class="p-2 rounded bg-gray-800 text-gray-500 text-sm">
            <div
              class="flex-center-center py-5 border-2 border-gray-500 border-dashed rounded"
            >
              No Matching Log
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mx-auto text-center">
        <h2 class="mb-3 text-gray-500 text-2xl font-bold">
          You don't have any work today.
        </h2>
        <p class="mb-5 text-gray-600">Let's start from here</p>
        <ButtonBasic class="mx-auto" @click="$emit('toggle-launcher')">
          <div class="icon-task mr-2" size="lg" />
          New Work
        </ButtonBasic>
      </div>
    </template>

    <LogPanelCreator
      :show="isPanelCreatorShow"
      :initial-values="initPanelCreatorValues"
      @close="closePanelCreator()"
    />

    <Teleport to="#view-header__extra">
      <NPopover
        style="max-height: 240px"
        trigger="manual"
        placement="bottom-end"
        :show="isPanelManagerShow"
        :show-arrow="false"
        :width="350"
        :scrollable="true"
        :on-clickoutside="closePanelManager"
      >
        <template #trigger>
          <ButtonBasic
            class="!text-sm !font-normal"
            theme="gray-transparent"
            aria-label="toggle-panel-manager-button"
            @click="isPanelManagerShow = !isPanelManagerShow"
          >
            <span class="icon-panel mr-2" /> View Panels
          </ButtonBasic>
        </template>

        <template #header>
          <div class="flex-between-center">
            <div class="flex text-xs font-bold uppercase">
              <div class="first-letter:text-base mr-1">View</div>
              <div class="first-letter:text-base">Panels</div>
            </div>
            <ButtonLinkLike
              class="font-bold !text-white"
              @click="openPanelCreator()"
            >
              + New
            </ButtonLinkLike>
          </div>
        </template>

        <template #default>
          <div class="py-1">
            <div
              v-for="panel in logPanelStore._getDailyPanels"
              :key="panel.id"
              class="flex justify-between items-center mb-2 last:mb-0 p-[6px] rounded bg-white/20"
            >
              <div class="flex items-center truncate">
                <span class="icon-order mr-1 cursor-move" />
                <span class="font-bold uppercase truncate">
                  {{ panel.title }}
                </span>
              </div>

              <div class="flex items-center shrink-0">
                <ButtonBasic
                  theme="gray-transparent"
                  @click="openPanelCreator(panel)"
                >
                  <span class="icon-edit text-white"></span>
                </ButtonBasic>
                <ButtonBasic
                  theme="gray-transparent"
                  @click="openPanelDeleteConfirm(panel)"
                >
                  <span class="icon-delete text-white"></span>
                </ButtonBasic>
              </div>
            </div>
          </div>
        </template>
      </NPopover>
    </Teleport>

    <ModelBasic
      :show="isPanelDeleteConfirmShow"
      :title="'Delete Panel'"
      :right-button-text="'DELETE'"
      :left-button-text="'CANCEL'"
      :right-button-handler="deletePanel"
      :left-button-handler="closePanelDeleteConfirm"
      @close="closePanelDeleteConfirm()"
    >
      <template #body>
        <div class="text-center py-5 leading-8">
          Are you sure you want to <br />
          delete 「{{ deletingPanel?.title }}」 panel?
        </div>
      </template>
    </ModelBasic>
  </div>
</template>

<style lang="scss" scoped></style>
