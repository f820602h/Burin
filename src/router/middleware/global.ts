import type { Middleware } from "./types";
import { axiosUserGetStatus } from "@/api/user/index";
import { useUserStore } from "@/stores/user";
import { useLogStore } from "@/stores/log";
import { useCategoryStore } from "@/stores/category";
import { useStampStore } from "@/stores/stamp";

export const checkUserStatusMiddleware: Middleware = async (
  _to,
  from,
  _next,
  done,
) => {
  if (from.name) return done();

  const userStore = useUserStore();
  const logStore = useLogStore();
  const categoryStore = useCategoryStore();
  const stampStore = useStampStore();

  if (await axiosUserGetStatus()) {
    await Promise.all([
      userStore._actFetchUserInfo(),
      categoryStore._actFetchCategories(),
      logStore._actFetchCurrentLog(),
      stampStore._actFetchStamps(),
    ]);
  }

  done();
};
