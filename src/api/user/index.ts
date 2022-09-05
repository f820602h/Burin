import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { UserId, UserInfo, UserCompleteInfo } from "@/class/User";

export const axiosUserGetStatus: () => Promise<AxiosResponse<boolean>> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/status",
  });
};

export const axiosUserGetInfo: () => Promise<
  AxiosResponse<UserCompleteInfo>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/info",
  });
};

export const axiosUserSignUp: (
  payload: UserInfo
) => Promise<AxiosResponse<UserId>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: payload,
  });
};

export const axiosUserLogin: (
  payload: Omit<UserInfo, "id" | "name">
) => Promise<AxiosResponse<never>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
  });
};
