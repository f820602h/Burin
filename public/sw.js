// install
self.addEventListener("install", () => {
  console.log("installing…");
});

// activate
self.addEventListener("activate", () => {
  console.log("now ready to handle fetches!");
});

// fetch
self.addEventListener("fetch", () => {
  console.log("now fetch!");
});
