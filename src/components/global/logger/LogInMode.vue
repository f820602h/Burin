<script setup lang="ts">
import type { ScreenConfigModesMap } from "./type";

defineEmits<{
  (e: "change-mode", mode: keyof ScreenConfigModesMap): void;
}>();
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">WELCOME</div>
    <div class="w-[250px] mx-auto">
      <div class="text-sm mt-3">電子信箱</div>
      <input type="text" class="my-1" />
      <div class="text-xs text-right">123</div>

      <div class="text-sm">密碼</div>
      <input type="text" class="my-1" />
      <div class="text-xs text-right">123</div>

      <div class="flex-center-center text-sm mt-4">
        <div class="mr-10 border-b-[1px] border-[#13fc5c]">忘記密碼</div>
        <div
          class="border-b-[1px] border-[#13fc5c] cursor-pointer"
          @click="$emit('change-mode', 'SignUp')"
        >
          註冊
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
