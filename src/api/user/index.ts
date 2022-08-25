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

export const axiosUserSignUp: (payload: {
  name: User["name"];
  email: User["email"];
  password: NonNullable<User["password"]>;
}) => Promise<AxiosResponse<number>> = ({ name, email, password }) => {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: { name, email, password },
  });
};

export const axiosUserLogin: (payload: {
  email: User["email"];
  password: NonNullable<User["password"]>;
}) => Promise<AxiosResponse> = ({ email, password }) => {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: { email, password },
  });
};
