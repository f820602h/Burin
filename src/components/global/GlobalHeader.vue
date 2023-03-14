<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { axiosUserLogout } from "@/api/user/index";

const emit = defineEmits<{ (e: "toggle-logger"): void }>();

const userStore = useUserStore();

function onAvatarClick(): void {
  if (userStore.user) {
    axiosUserLogout().then(() => {
      userStore.$reset();
    });
  } else {
    emit("toggle-logger");
  }
}
</script>

<template>
  <header
    ref="header"
    class="h-[55px] pt-2 pb-1 bg-[#131417] shadow-md shadow-dark"
  >
    <div class="flex-between-center h-full px-4">
      <span></span>
      <div
        class="text-white/75 text-[32px] cursor-pointer hover:text-white"
        @click="onAvatarClick"
      >
        <span class="icon-avatar" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
