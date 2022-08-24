import { defineStore } from "pinia";
import { User } from "@/class/User";
import { axiosUserGetInfo } from "@/api/user/index";

export type UserState = {
  user: User | null;
};

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async _actFetchUserInfo(): Promise<void> {
      const res = await axiosUserGetInfo();
      this.user = new User(res.data);
    },
  },
});
