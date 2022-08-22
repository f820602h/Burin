import { BaseAxiosRequestor } from "../axios/index";
import type { AxiosResponse } from "axios";

type UserSignUpPayload = {
  name: string;
  email: string;
  password: string;
};

type UserSignUpResponse = {
  id: number;
};

export const axiosUserSignUp: (
  payload: UserSignUpPayload
) => Promise<AxiosResponse> = ({ name, email, password }) => {
  return BaseAxiosRequestor.post<UserSignUpResponse>({
    url: "/user/sign-up",
    data: { name, email, password },
  });
};

type UserLoginPayload = {
  email: string;
  password: string;
};

type UserLoginResponse = {
  id: number;
};

export const axiosUserLogin: (
  payload: UserLoginPayload
) => Promise<AxiosResponse> = ({ email, password }) => {
  return BaseAxiosRequestor.post<UserLoginResponse>({
    url: "/user/login",
    data: { email, password },
  });
};
