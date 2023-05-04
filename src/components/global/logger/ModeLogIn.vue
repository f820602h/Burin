<script setup lang="ts">
import { ref } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldsValidation } from "@/system/fieldValidation";
import { useUserStore } from "@/stores/user";
import { useLogStore } from "@/stores/log";
import { useCategoryStore } from "@/stores/category";
import { useStampStore } from "@/stores/stamp";
import { axiosUserLogin } from "@/api/user/index";
import type { ScreenConfigModesMap } from "./types";
import LoggerField from "./LoggerField.vue";

defineEmits<{ (e: "change-mode", mode: keyof ScreenConfigModesMap): void }>();

const userStore = useUserStore();
const logStore = useLogStore();
const categoryStore = useCategoryStore();
const stampStore = useStampStore();
const isAccountWrong = ref<boolean>(false);

const validationSchema = object({
  email: userFieldsValidation.email,
  password: userFieldsValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  isAccountWrong.value = false;
  const { email, password } = values;
  return await axiosUserLogin({ email, password })
    .then(async () => {
      await userStore._actFetchUserInfo();
      await categoryStore._actFetchCategories();
      await logStore._actFetchCurrentLog();
      await stampStore._actFetchStamps();
      return Promise.resolve();
    })
    .catch(() => {
      isAccountWrong.value = true;
      return Promise.reject();
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
      <LoggerField label="電子信箱" field="email" type="text" />
      <LoggerField label="密碼" field="password" type="password" />

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
