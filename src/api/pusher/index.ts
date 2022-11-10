import { BaseAxiosRequestor } from "../axios/index";

export const axiosPusherGetVapidPublicKey: () => Promise<string> = () => {
  return BaseAxiosRequestor.get({
    url: `/pusher/vapidPublicKey`,
    showLoading: false,
  });
};

export const axiosPusherPostRegister: (payload: any) => Promise<never> = (
  payload
) => {
  return BaseAxiosRequestor.post({
    url: `/pusher/register`,
    data: payload,
    showLoading: false,
  });
};

export const axiosPusherPostSendNotification: () => Promise<string> = () => {
  return BaseAxiosRequestor.post({
    url: `/pusher/sendNotification`,
    showLoading: false,
  });
};
