<script setup lang="ts">
import { ref } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";
import { axiosUserLogin } from "@/api/user/index";
import type { ScreenConfigModesMap } from "./types";
import LoggerField from "./LoggerField.vue";

defineEmits<{ (e: "change-mode", mode: keyof ScreenConfigModesMap): void }>();

const userStore = useUserStore();
const taskStore = useTaskStore();
const isAccountWrong = ref<boolean>(false);

const validationSchema = object({
  email: userFieldValidation.email,
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { email, password } = values;
  await axiosUserLogin({ email, password })
    .then(async () => {
      await userStore._actFetchUserInfo();
      await taskStore._actFetchTaskCategoryList();
      await taskStore._actFetchCurrentTask();
    })
    .catch(() => {
      isAccountWrong.value = true;
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">WELCOME</div>
    <div class="min-h-5 text-sm text-center text-red-500 my-2">
      {{ isAccountWrong ? "!! 錯誤的帳號或密碼 !!" : "" }}
    </div>
    <div class="w-[250px] mx-auto">
      <LoggerField label="電子信箱" name="email" type="text" value="" />
      <LoggerField label="密碼" name="password" type="password" value="" />

      <div class="flex-center-center text-sm mt-3">
        <div class="link">忘記密碼</div>
        <div class="link" @click="$emit('change-mode', 'SignUp')">註冊</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply mx-3 border-b-[1px] border-[#13fc5c] cursor-pointer;
}
</style>
