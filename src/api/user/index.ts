import { BaseAxiosRequestor } from "../axios/index";
import type { UserId, UserInfo, UserCompleteInfo } from "@/class/User";

export const axiosUserGetStatus: () => Promise<boolean> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/status",
  });
};

export const axiosUserGetInfo: () => Promise<UserCompleteInfo> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/info",
  });
};

export const axiosUserSignUp: (
  payload: Omit<UserInfo, "id">
) => Promise<UserId> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: payload,
  });
};

export const axiosUserLogin: (
  payload: Omit<UserInfo, "id" | "name">
) => Promise<never> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
  });
};

export const axiosUserLogout: () => Promise<never> = () => {
  return BaseAxiosRequestor.post({
    url: "/user/logout",
  });
};
