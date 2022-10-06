export function useBodyScrollFixed() {
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

  const fixed: () => void = () => {
    window.addEventListener("resize", resizeHandler);
    fixedBody();
  };

  const reset: () => void = () => {
    window.removeEventListener("resize", resizeHandler);
    resetBody();
  };

  return {
    fixed,
    reset,
  };
}
