import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OPc_bL1v5xaA6TKtkQC_wAsOC4g7JEs",
  authDomain: "burin-e5cb0.firebaseapp.com",
  projectId: "burin-e5cb0",
  storageBucket: "burin-e5cb0.appspot.com",
  messagingSenderId: "36735080632",
  appId: "1:36735080632:web:36b03204343eb2a4563c4d",
  measurementId: "G-NM57RFF3RT",
};

const fcmApp = initializeApp(firebaseConfig);
const messaging = getMessaging(fcmApp);

getToken(messaging, {
  vapidKey:
    "BOHyg9W2-fE0V_l7yZ3qWuEk3jHa5joMny0fiM9gGR1lSW1MLC2RdX2CHTsHQDC21KaLlzqlC02O7jRC293BUPw",
})
  .then((currentToken) => {
    console.log(currentToken);
  })
  .catch((err) => {
    console.log(err);
  });

onMessage(messaging, (payload) => {
  new Notification(payload.notification?.title || "", {
    body: payload.notification?.body || "",
  });
});

import App from "./App.vue";
import router from "./router";

import "@/css/tailwind.css";
import "@/css/icons.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
