<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import type { UserInfo } from "@/class/User";
import { UserFieldsName, userFieldsValidation } from "@/validation/userField";
import { axiosUserLogin } from "@/api/user/index";
import { Modes } from "./types";
import VerifyInput from "@/components/basic/VerifyInput.vue";

defineEmits<{ (e: "change-mode", mode: Modes): void }>();

const { handleSubmit, setErrors } = useForm<
  Pick<UserInfo, "email" | "password">
>({
  validationSchema: object({
    [UserFieldsName.EMAIL]: userFieldsValidation.email,
    [UserFieldsName.PASSWORD]: userFieldsValidation.password,
  }),
});

const confirmHandler = handleSubmit(async (values) => {
  return await axiosUserLogin(values)
    .then(async () => {
      return Promise.resolve();
    })
    .catch(() => {
      setErrors({
        [UserFieldsName.EMAIL]: "incorrect email or password",
        [UserFieldsName.PASSWORD]: "incorrect email or password",
      });
      return Promise.reject();
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
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
        <ButtonLinkLike
          text="Forget Your Password?"
          class="!text-xs font-normal"
        />
      </label>
      <VerifyInput
        :field="UserFieldsName.PASSWORD"
        type="password"
        placeholder="Type Your Password"
      />
    </div>

    <div class="mt-10 text-center text-xs">
      <span class="mr-2 text-gray-400">New to Burin?</span>
      <ButtonLinkLike
        text="Sign Up"
        class="font-bold"
        @click="$emit('change-mode', Modes.SIGN_UP)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply mx-3 border-b-[1px] border-[#13fc5c] cursor-pointer;
}
</style>
