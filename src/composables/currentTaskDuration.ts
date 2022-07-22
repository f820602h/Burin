import { useTaskStore } from "@/stores/task";
import { useTimestamp } from "@vueuse/core";
import { computed } from "vue";

export function useCurrentTaskDuration() {
  const taskStore = useTaskStore();

  const { timestamp, pause, resume } = useTimestamp({ controls: true });

  const duration = computed(() => {
    if (!taskStore.currentTask?.lastStartTimestamp) return 0;
    return timestamp.value - taskStore.currentTask.lastStartTimestamp;
  });

  return { duration, pause, resume };
}
