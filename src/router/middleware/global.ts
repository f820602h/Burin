import type { Middleware } from "./types";
import { axiosUserGetStatus } from "@/api/user/index";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";

export const checkUserStatusMiddleware: Middleware = async (
  to,
  from,
  next,
  done
) => {
  if (from.name) return;
  const userStore = useUserStore();
  const taskStore = useTaskStore();
  const res = await axiosUserGetStatus();
  if (res.data) {
    await userStore._actFetchUserInfo();
    await taskStore._actFetchTaskCategoryList();
    await taskStore._actFetchCurrentTask();
  }
  done();
};
