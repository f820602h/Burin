import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/css/tailwind.css";
import "@/css/icons.css";

import ButtonBasic from "@/components/basic/ButtonBasic.vue";
import ButtonLinkLike from "@/components/basic/ButtonLinkLike.vue";

Object.typedKeys = Object.keys as any;
Object.typedValues = Object.values as any;
Object.typedEntries = Object.entries as any;

const app = createApp(App);

app.component("ButtonBasic", ButtonBasic);
app.component("ButtonLinkLike", ButtonLinkLike);

app.use(createPinia());
app.use(router);
app.mount("#app");
