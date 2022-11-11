import { BaseAxiosRequestor } from "../axios/index";

export function axiosPusherGetVapidPublicKey(): Promise<string> {
  return BaseAxiosRequestor.get({
    url: `/pusher/vapidPublicKey`,
    showLoading: false,
  });
}

export function axiosPusherPostRegister(payload: any): Promise<never> {
  return BaseAxiosRequestor.post({
    url: `/pusher/register`,
    data: payload,
    showLoading: false,
  });
}

export function axiosPusherPostSendNotification(): Promise<string> {
  return BaseAxiosRequestor.post({
    url: `/pusher/sendNotification`,
    showLoading: false,
  });
}
