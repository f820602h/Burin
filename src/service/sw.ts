/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

import {
  subscribeTaskNotification,
  unsubscribeTaskNotification,
} from "./modules/taskNotification";

enum ServiceWorkerMethods {
  SUBSCRIBE = "subscribeTaskNotification",
  UNSUBSCRIBE = "unsubscribeTaskNotification",
}

export const serviceWorkerMethods = {
  [ServiceWorkerMethods.SUBSCRIBE]: subscribeTaskNotification,
  [ServiceWorkerMethods.UNSUBSCRIBE]: unsubscribeTaskNotification,
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
    event.data.data
  );
});

export default null;
