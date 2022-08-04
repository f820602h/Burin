import { useTaskStore } from "@/stores/task";
import { useTimestamp } from "@vueuse/core";
import { computed } from "vue";

export function useCurrentTaskDuration() {
  const taskStore = useTaskStore();
  const timestamp = useTimestamp();

  const duration = computed<number>(() => {
    const now = new Date().getTime();
    const taskStartTime = taskStore.currentTask?.lastStartTimestamp || now;
    return Math.max(timestamp.value - taskStartTime, 0);
  });

  return { duration };
}
