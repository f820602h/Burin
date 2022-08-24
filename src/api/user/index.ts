import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";

export const axiosUserGetStatus: () => Promise<AxiosResponse> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/status",
  });
};

export const axiosUserGetInfo: () => Promise<AxiosResponse> = () => {
  return BaseAxiosRequestor.get({
    url: "/user/info",
  });
};

type UserSignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export const axiosUserSignUp: (
  payload: UserSignUpPayload
) => Promise<AxiosResponse> = ({ name, email, password }) => {
  return BaseAxiosRequestor.post({
    url: "/user/sign-up",
    data: { name, email, password },
  });
};

type UserLoginPayload = {
  email: string;
  password: string;
};

export const axiosUserLogin: (
  payload: UserLoginPayload
) => Promise<AxiosResponse> = ({ email, password }) => {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: { email, password },
  });
};
