<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import type { UserInfo } from "@/class/User";
import { UserFieldsName, userFieldsValidation } from "@/validation/userField";
import { axiosUserSignUp } from "@/api/user/index";
import VerifyInput from "@/components/basic/VerifyInput.vue";

const { handleSubmit, setFieldError } = useForm<Omit<UserInfo, "id">>({
  validationSchema: object({
    [UserFieldsName.NAME]: userFieldsValidation.name,
    [UserFieldsName.EMAIL]: userFieldsValidation.email,
    [UserFieldsName.PASSWORD]: userFieldsValidation.password,
  }),
});

const confirmHandler = handleSubmit(async (values) => {
  await axiosUserSignUp(values).catch(() => {
    setFieldError(UserFieldsName.EMAIL, "email is already used");
  });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="mb-3">
      <label
        :for="UserFieldsName.NAME"
        class="block mb-1 text-gray-500 text-xs font-bold"
      >
        <div class="first-letter:text-base uppercase">
          {{ UserFieldsName.NAME }}
        </div>
      </label>
      <VerifyInput
        :field="UserFieldsName.NAME"
        type="text"
        placeholder="Type Your Name"
      />
    </div>

    <div class="mb-3">
      <label
        :for="UserFieldsName.EMAIL"
        class="block mb-1 text-gray-500 text-xs font-bold"
      >
        <div class="first-letter:text-base uppercase">
          {{ UserFieldsName.EMAIL }}
        </div>
      </label>
      <VerifyInput
        :field="UserFieldsName.EMAIL"
        type="text"
        placeholder="Type Your Email"
      />
    </div>

    <div>
      <label
        :for="UserFieldsName.PASSWORD"
        class="flex-between-end mb-1 text-gray-500 text-xs font-bold"
      >
        <div class="first-letter:text-base uppercase">
          {{ UserFieldsName.PASSWORD }}
        </div>
      </label>
      <VerifyInput
        :field="UserFieldsName.PASSWORD"
        type="password"
        placeholder="Type Your Password"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
