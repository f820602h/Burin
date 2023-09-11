/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

import {
  subscribeCurrentLogNotification,
  unsubscribeCurrentLogNotification,
} from "./modules/currentLogNotification";

enum ServiceWorkerMethods {
  SUBSCRIBE = "subscribeCurrentLogNotification",
  UNSUBSCRIBE = "unsubscribeCurrentLogNotification",
}

export const serviceWorkerMethods = {
  [ServiceWorkerMethods.SUBSCRIBE]: subscribeCurrentLogNotification,
  [ServiceWorkerMethods.UNSUBSCRIBE]: unsubscribeCurrentLogNotification,
};

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  if (event.origin !== self.location.origin) return;
  serviceWorkerMethods[event.data.method as ServiceWorkerMethods](
    event.data.data,
  );
});

export default null;
