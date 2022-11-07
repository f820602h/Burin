import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC3OPc_bL1v5xaA6TKtkQC_wAsOC4g7JEs",
  authDomain: "burin-e5cb0.firebaseapp.com",
  projectId: "burin-e5cb0",
  storageBucket: "burin-e5cb0.appspot.com",
  messagingSenderId: "36735080632",
  appId: "1:36735080632:web:36b03204343eb2a4563c4d",
  measurementId: "G-NM57RFF3RT",
});

const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
