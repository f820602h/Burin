import type { Middleware } from "./types";
import { axiosUserGetStatus } from "@/api/user/index";
import { useUserStore } from "@/stores/user";

export const checkUserStatusMiddleware: Middleware = async (
  to,
  from,
  next,
  done
) => {
  if (from.name) return;
  const userStore = useUserStore();
  const res = await axiosUserGetStatus();
  if (res.data) await userStore._actFetchUserInfo();
  done();
};
