/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyC3OPc_bL1v5xaA6TKtkQC_wAsOC4g7JEs",
  authDomain: "burin-e5cb0.firebaseapp.com",
  projectId: "burin-e5cb0",
  storageBucket: "burin-e5cb0.appspot.com",
  messagingSenderId: "36735080632",
  appId: "1:36735080632:web:36b03204343eb2a4563c4d",
  measurementId: "G-NM57RFF3RT",
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

// 後端推播
messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  console.log("self...", self);
  // Customize notification here
  const notificationTitle = `${notification.title}`;
  const notificationOptions = {
    body: `${notification.body}`,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
