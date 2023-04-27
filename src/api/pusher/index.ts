import { BaseAxiosRequestor } from "../axios/index";

export function axiosPusherGetVapidPublicKey(): Promise<string> {
  return BaseAxiosRequestor.get({
    url: `/pusher/vapidPublicKey`,
  });
}

export function axiosPusherPostRegister(payload: any): Promise<never> {
  return BaseAxiosRequestor.post({
    url: `/pusher/register`,
    data: payload,
  });
}

export function axiosPusherPostSendNotification(): Promise<string> {
  return BaseAxiosRequestor.post({
    url: `/pusher/sendNotification`,
  });
}
