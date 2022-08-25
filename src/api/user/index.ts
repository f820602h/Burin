import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";
import type { User, UserObject } from "@/class/User";

export const axiosUserGetStatus: () => Promise<AxiosResponse<boolean>> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/status",
  });
};

export const axiosUserGetInfo: () => Promise<
  AxiosResponse<UserObject>
> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/info",
  });
};

export const axiosUserSignUp: (
  payload: Required<Pick<User, "name" | "email" | "password">>
) => Promise<AxiosResponse<number>> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: payload,
  });
};

export const axiosUserLogin: (
  payload: Required<Pick<User, "email" | "password">>
) => Promise<AxiosResponse> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
  });
};
