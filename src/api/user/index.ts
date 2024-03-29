import { BaseAxiosRequestor } from "../axios/index";
import type { UserId, UserInfo, UserCompleteInfo } from "@/class/User";

export function axiosUserGetStatus(): Promise<boolean> {
  return BaseAxiosRequestor.get({
    url: "/user/status",
    showLoading: true,
  });
}

export function axiosUserGetInfo(): Promise<UserCompleteInfo> {
  return BaseAxiosRequestor.get({
    url: "/user/info",
    showLoading: true,
  });
}

export function axiosUserSignUp(
  payload: Omit<UserInfo, "id">,
): Promise<UserId> {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: payload,
    showLoading: true,
  });
}

export function axiosUserLogin(
  payload: Omit<UserInfo, "id" | "name">,
): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
    showLoading: true,
  });
}

export function axiosUserLogout(): Promise<never> {
  return BaseAxiosRequestor.post({
    url: "/user/logout",
    showLoading: true,
  });
}
