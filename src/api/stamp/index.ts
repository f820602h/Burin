import { BaseAxiosRequestor } from "../axios/index";

export const axiosStampGetList: () => Promise<number[]> = () => {
  return BaseAxiosRequestor.get({
    url: "/stamp/all",
  });
};
