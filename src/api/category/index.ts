import { BaseAxiosRequestor } from "../axios/index";
import type {
  CategoryCompleteInfo,
  CategoryId,
  CategoryInfo,
} from "@/class/Category";

export const axiosCategoryGetList: () => Promise<
  CategoryCompleteInfo[]
> = () => {
  return BaseAxiosRequestor.get({
    url: "/category",
    showLoading: true,
  });
};

export const axiosCategoryCreate: (
  payload: Omit<CategoryInfo, "id">,
) => Promise<CategoryId> = (payload) => {
  return BaseAxiosRequestor.post({
    url: "/category",
    data: payload,
  });
};
