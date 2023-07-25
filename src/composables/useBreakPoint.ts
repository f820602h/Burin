import { useBreakpoints } from "@vueuse/core";

export function useBreakPoint() {
  return useBreakpoints({
    xs: "320px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  });
}
