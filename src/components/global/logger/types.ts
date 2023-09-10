import type { Component } from "vue";

export enum Modes {
  LOGIN = "login",
  SIGN_UP = "signUp",
  // Forget,
}

export type ScreenConfig = {
  component: Component;
  title: string;
  confirmButtonText: string;
  confirmButtonCallback: () => void;
  cancelButtonText: string;
  cancelButtonCallback: () => void;
};

export type ScreenConfigModesMap = Record<Modes, ScreenConfig>;
