export function useBodyScrollFixed() {
  function fixedBody(): void {
    const top = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${top}px`;
  }

  function resetBody(): void {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  function resizeHandler(): void {
    resetBody();
    fixedBody();
  }

  function fixed(): void {
    window.addEventListener("resize", resizeHandler);
    fixedBody();
  }

  function reset(): void {
    window.removeEventListener("resize", resizeHandler);
    resetBody();
  }

  return {
    fixed,
    reset,
  };
}
