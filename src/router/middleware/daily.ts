import type { Middleware } from "./types";
import { useUserStore } from "@/stores/user";
import { useLogStore } from "@/stores/log";
import { useCategoryStore } from "@/stores/category";
import { useStampStore } from "@/stores/stamp";
import { useLogPanelStore } from "@/stores/logPanel";
import { timestampCalculator } from "@/helper/timestampCalculator";

export const checkDailyStampMiddleware: Middleware = async (
  to,
  _from,
  next,
  done,
) => {
  const userStore = useUserStore();
  const logStore = useLogStore();
  const categoryStore = useCategoryStore();
  const stampStore = useStampStore();
  const logPanelStore = useLogPanelStore();

  await Promise.all([
    userStore._actFetchUserInfo(),
    stampStore._actFetchStamps(),
  ]);

  const isAllowedStamp = stampStore.stamps.some(
    (stamp) =>
      to.params.date === stamp.toString() ||
      to.params.date === timestampCalculator("today").toString(),
  );

  if (!isAllowedStamp) return next({ name: "Error404" });
  await Promise.all([
    categoryStore._actFetchCategories(),
    logStore._actFetchCurrentLog(),
    logPanelStore._actFetchDailyPanels(),
  ]);

  done();
};
