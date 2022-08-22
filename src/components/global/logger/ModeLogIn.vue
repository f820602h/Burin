<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import type { ScreenConfigModesMap } from "./types";
import LoggerField from "./LoggerField.vue";
import { axiosUserLogin } from "@/api/user/index";

defineEmits<{ (e: "change-mode", mode: keyof ScreenConfigModesMap): void }>();

const validationSchema = object({
  email: userFieldValidation.email,
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { email, password } = values;
  await axiosUserLogin({ email, password });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">WELCOME</div>
    <div class="w-[250px] mx-auto pt-3">
      <LoggerField label="電子信箱" name="email" type="text" />
      <LoggerField label="密碼" name="password" type="password" />

      <div class="flex-center-center text-sm mt-4">
        <div class="mr-7 border-b-[1px] border-[#13fc5c] cursor-pointer">
          忘記密碼
        </div>
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
