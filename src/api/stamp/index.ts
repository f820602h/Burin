import { BaseAxiosRequestor } from "../axios/index";

export const axiosStampGetList: () => Promise<number[]> = () => {
  return BaseAxiosRequestor.get({
    url: "/stamp/all",
    params: { timezoneOffset: new Date().getTimezoneOffset() },
    // params: { timezoneOffset: 0 },
  });
};
