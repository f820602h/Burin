import type { Middleware } from "./types";
import { useStampStore } from "@/stores/stamp";
import { timestampCalculator } from "@/helper/timestampCalculator";

export const checkDailyStampMiddleware: Middleware = async (
  to,
  from,
  next,
  done
) => {
  const stampStore = useStampStore();
  const isAllowedStamp = stampStore.stamps.some(
    (stamp) =>
      to.params.date === stamp.toString() ||
      to.params.date === timestampCalculator("today").toString()
  );

  if (!isAllowedStamp) return next({ name: "Error404" });

  done();
};
