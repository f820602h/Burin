import { defineStore } from "pinia";
import { type CategoryInfo, Category } from "@/class/Category";
import { axiosCategoryGetList, axiosCategoryCreate } from "@/api/category";

export type CategoryState = {
  categories: Category[];
};

export const useCategoryStore = defineStore({
  id: "category",
  state: (): CategoryState => ({
    categories: [],
  }),
  actions: {
    async _actFetchCategories(): Promise<void> {
      const date = await axiosCategoryGetList();
      this.categories = date.map((cate) => new Category(cate));
    },
    async _actCreateCategory(
      payload: Omit<CategoryInfo, "id">
    ): Promise<CategoryInfo["id"]> {
      const now = new Date().getTime();
      const { id } = await axiosCategoryCreate(payload);
      const newCategory = new Category({
        ...payload,
        id,
        createTimestamp: now,
        updateTimestamp: now,
      });
      this.categories.push(newCategory);
      return id;
    },
  },
});
