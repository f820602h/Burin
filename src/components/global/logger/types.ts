import type { Component } from "vue";

const enum Modes {
  LogIn,
  SignUp,
  // Forget,
}

export type ScreenConfig = {
  component: Component;
  confirmButtonText: string;
  confirmButtonCallback: () => void;
  cancelButtonText: string;
  cancelButtonCallback: () => void;
};

export type ScreenConfigModesMap = {
  [key in keyof typeof Modes]: ScreenConfig;
};
