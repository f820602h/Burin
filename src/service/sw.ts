/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

import {
  subscribeTaskNotification,
  unsubscribeTaskNotification,
} from "./modules/taskNotification";

const methods: Record<string, (data: any) => void> = {
  subscribeTaskNotification,
  unsubscribeTaskNotification,
};

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  if (event.origin !== self.location.origin) return;
  methods[event.data.method](event.data.data);
});

self.addEventListener("push", function (event) {
  event.waitUntil(
    // Retrieve a list of the clients of this service worker.
    self.clients.matchAll({ type: "window" }).then(function (clientList) {
      // Check if there's at least one focused client.
      const focused = clientList.some(function (client) {
        return client.focused;
      });

      let notificationMessage;
      if (focused) {
        notificationMessage = "You're still here, thanks!";
      } else if (clientList.length > 0) {
        notificationMessage =
          "You haven't closed the page, " + "click here to focus it!";
      } else {
        notificationMessage =
          "You have closed the page, " + "click here to re-open it!";
      }

      // Show a notification with title 'ServiceWorker Cookbook' and body depending
      // on the state of the clients of the service worker (three different bodies:
      // 1, the page is focused; 2, the page is still open but unfocused; 3, the page
      // is closed).
      return self.registration.showNotification("ServiceWorker Cookbook", {
        body: notificationMessage,
      });
    })
  );
});

export default null;
