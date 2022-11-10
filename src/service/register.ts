import {
  axiosPusherGetVapidPublicKey,
  axiosPusherPostRegister,
} from "@/api/pusher";

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

navigator.serviceWorker.ready
  .then(function (registration) {
    // Use the PushManager to get the user's subscription to the push service.
    return registration.pushManager
      .getSubscription()
      .then(async function (subscription) {
        // If a subscription was found, return it.
        if (subscription) return subscription;

        // Get the server's public key
        const vapidPublicKey = await axiosPusherGetVapidPublicKey();
        // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
        // urlBase64ToUint8Array() is defined in /tools.js
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      });
  })
  .then(function (subscription) {
    // Send the subscription details to the server using the Fetch API.
    axiosPusherPostRegister(subscription);
  });
