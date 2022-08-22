<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import LoggerField from "./LoggerField.vue";
import { axiosUserSignUp } from "@/api/user/index";

const validationSchema = object({
  name: userFieldValidation.name,
  email: userFieldValidation.email,
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { name, email, password } = values;
  await axiosUserSignUp({ name, email, password });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="w-[250px] mx-auto pt-2">
      <LoggerField label="使用者" name="name" type="text" />
      <LoggerField label="電子信箱" name="email" type="text" />
      <LoggerField label="密碼" name="password" type="password" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
