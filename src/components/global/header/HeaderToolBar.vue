<script setup lang="ts">
import { useLogStore } from "@/stores/log";
import { LogStatus } from "@/class/Log";
import { durationTimeFormatter } from "@/helper/durationTimeFormatter";

defineEmits<{
  (e: "toggle-sidebar"): void;
  (e: "toggle-logger"): void;
  (e: "toggle-launcher"): void;
}>();

const logStore = useLogStore();
</script>

<template>
  <div class="tool-bar flex h-[40px] text-gray-400 bg-gray-800">
    <div class="tool-bar__aside">
      <div class="flex-shrink-0 p-1">
        <div
          class="flex items-center p-2 cursor-pointer"
          @click="$emit('toggle-sidebar')"
        >
          <div class="icon-side" />
        </div>
      </div>

      <div class="flex-shrink-0 p-1 border-l border-slate-600">
        <div
          aria-label="toggle-sidebar-button"
          class="tool-btn flex items-center"
          @click="$emit('toggle-sidebar')"
        >
          <div class="icon-side" />
        </div>
      </div>
    </div>

    <div class="flex-shrink-0 flex p-1 border-r border-slate-600">
      <div class="tool-btn flex items-center" @click="$emit('toggle-launcher')">
        <div class="icon-task" />
        <span class="hidden lg:block ml-2 text-sm">New Work</span>
      </div>
    </div>

    <div class="flex-grow flex items-center p-1 overflow-hidden">
      <div v-if="!logStore.currentLog" class="tool-bar__progress--is-idle">
        <div class="px-1 text-sm">Nothing In Progress...</div>
      </div>

      <router-link
        v-else
        :to="{ name: 'Today' }"
        class="tool-bar__progress--is-working"
      >
        <div class="px-1 md:text-lg font-bold truncate">
          {{ logStore.currentLog.title }}
        </div>

        <div
          class="flex-shrink-0 px-2 py-[2px] rounded-sm text-sm font-bold bg-white/20"
        >
          <span>{{
            durationTimeFormatter(logStore.currentLog.duringTime).hoursText
          }}</span>
          <span class="hidden lg:inline text-xs mx-1">hour</span>
          <span class="inline lg:hidden mx-1">:</span>

          <span>{{
            durationTimeFormatter(logStore.currentLog.duringTime).minutesText
          }}</span>
          <span class="hidden lg:inline text-xs mx-1">min</span>
          <span class="inline lg:hidden mx-1">:</span>

          <span>{{
            durationTimeFormatter(logStore.currentLog.duringTime).secondsText
          }}</span>
          <span class="hidden lg:inline text-xs mx-1">sec</span>
        </div>

        <div class="tool-bar__progress--is-working__lighting"></div>
      </router-link>

      <div v-if="logStore.currentLog" class="hidden md:flex text-gray-300">
        <button
          v-if="logStore.currentLog.status === LogStatus.IN_PROGRESS"
          class="btn p-2 rounded-sm mx-1"
          @click="logStore.currentLog?.pause"
        >
          <div class="icon-pause" />
        </button>

        <button
          v-else-if="logStore.currentLog.status === LogStatus.PAUSE"
          class="btn p-2 rounded-sm mx-1"
          @click="logStore.currentLog?.resume"
        >
          <div class="icon-play relative left-[2px]" />
        </button>

        <button class="btn p-2 rounded-sm" @click="logStore.currentLog?.finish">
          <div class="icon-stop" />
        </button>
      </div>
    </div>

    <div class="flex-shrink-0 flex p-1 border-l border-slate-600">
      <div class="tool-btn flex items-center" @click="$emit('toggle-logger')">
        <div class="icon-config" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  &__aside {
    @apply min-w-0 flex-shrink-0 flex justify-between border-r border-slate-600;
    @apply lg:min-w-[var(--asideWidth)] transition-all duration-200;
  }

  &__progress--is-idle {
    @apply flex-grow self-stretch flex justify-between items-center p-1 rounded-sm text-gray-200 bg-gray-700;
  }

  &__progress--is-working {
    @apply relative flex-grow self-stretch flex justify-between items-center p-1 rounded-sm text-gray-200 bg-primary overflow-hidden cursor-pointer transition duration-200 hover:bg-primary-500;

    * {
      z-index: 2;
    }

    &__lighting {
      @apply absolute full top-0 opacity-50;
      z-index: 1;
      left: -100%;
      background: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 33%,
        theme("colors.primary.500"),
        rgba(0, 0, 0, 0) 66%
      );
      animation: shine 2.5s infinite linear;

      @keyframes shine {
        65% {
          left: 100%;
        }
        100% {
          left: 100%;
        }
      }
    }
  }
}

.tool-btn {
  @apply p-2 rounded-sm cursor-pointer transition duration-200 hover:bg-gray-600;
}
</style>
