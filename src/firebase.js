import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function getToken() {
  messaging
    .getToken({
      vapidKey:
        "BOHyg9W2-fE0V_l7yZ3qWuEk3jHa5joMny0fiM9gGR1lSW1MLC2RdX2CHTsHQDC21KaLlzqlC02O7jRC293BUPw",
    })
    .then((currentToken) => {
      if (currentToken) console.log(currentToken);
      else console.log("No registration token available.");
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}

export { getToken };
