import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/css/tailwind.css";
import "@/css/icons.css";

Object.typedKeys = Object.keys as any;
Object.typedValues = Object.values as any;
Object.typedEntries = Object.entries as any;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
