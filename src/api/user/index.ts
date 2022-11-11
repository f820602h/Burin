import { BaseAxiosRequestor } from "../axios/index";
import type { UserId, UserInfo, UserCompleteInfo } from "@/class/User";

export function axiosUserGetStatus(): Promise<boolean> {
  return BaseAxiosRequestor.get({
    url: "/user/status",
  });
}

export function axiosUserGetInfo(): Promise<UserCompleteInfo> {
  return BaseAxiosRequestor.get({
    url: "/user/info",
  });
}

export function axiosUserSignUp(
  payload: Omit<UserInfo, "id">
): Promise<UserId> {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: payload,
  });
}

export function axiosUserLogin(
  payload: Omit<UserInfo, "id" | "name">
): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
  });
}

export function axiosUserLogout(): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/user/logout",
  });
}
