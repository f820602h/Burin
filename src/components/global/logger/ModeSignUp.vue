<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldsValidation } from "@/system/fieldValidation";
import LoggerField from "./LoggerField.vue";
import { axiosUserSignUp } from "@/api/user/index";
import { ref } from "vue";

const isEmailUsed = ref<boolean>(false);

const validationSchema = object({
  name: userFieldsValidation.name,
  email: userFieldsValidation.email,
  password: userFieldsValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { name, email, password } = values;
  await axiosUserSignUp({ name, email, password }).catch(() => {
    isEmailUsed.value = true;
  });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="min-h-5 text-sm text-center mb-3">
      {{ isEmailUsed ? "!! 電子信箱已被註冊 !!" : "填入資料完成註冊" }}
    </div>
    <div class="w-[250px] mx-auto">
      <LoggerField label="使用者" field="name" type="text" />
      <LoggerField label="電子信箱" field="email" type="text" />
      <LoggerField label="密碼" field="password" type="password" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
