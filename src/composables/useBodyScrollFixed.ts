import { watch, type Ref } from "vue";

const fixedBody: () => void = () => {
  const top = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${top}px`;
};

const resetBody: () => void = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
};

const resizeHandler: () => void = () => {
  resetBody();
  fixedBody();
};

export function useBodyScrollFixed(flag: Ref<boolean>): void {
  watch(
    flag,
    (value) => {
      if (value) {
        window.addEventListener("resize", resizeHandler);
        fixedBody();
      } else {
        window.removeEventListener("resize", resizeHandler);
        resetBody();
      }
    },
    { immediate: true }
  );
}
