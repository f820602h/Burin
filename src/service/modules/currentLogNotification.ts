import type { CurrentLog } from "@/class/Log";

declare let self: ServiceWorkerGlobalScope;

type CurrentLogNotificationData = {
  title: CurrentLog["title"];
  startTimestamp: CurrentLog["startTimestamp"];
  pauseDurationTime: CurrentLog["pauseDurationTime"];
  intervalMinutes: number;
};

let afterTimes = 0;
let intervalId = 0;

function calcAfterTimes(data: CurrentLogNotificationData): number {
  const now = new Date().getTime();
  return Math.floor(
    (now - data.startTimestamp - data.pauseDurationTime) /
      (data.intervalMinutes * 1000)
  );
}

function initAfterTimes(data: CurrentLogNotificationData): void {
  afterTimes = calcAfterTimes(data);
}

function sendNotification(data: CurrentLogNotificationData): void {
  intervalId = self.setInterval(() => {
    const newAfterTimes = calcAfterTimes(data);
    if (afterTimes < newAfterTimes) {
      afterTimes = newAfterTimes;
      self.registration.showNotification("Burin", {
        body: `${data.title} 已經進行 ${
          data.intervalMinutes * afterTimes
        } 分鐘囉！`,
      });
    }
  }, 500);
}

export function subscribeCurrentLogNotification(
  data: CurrentLogNotificationData
): void {
  initAfterTimes(data);
  sendNotification(data);
}

export function unsubscribeCurrentLogNotification(): void {
  afterTimes = 0;
  self.clearInterval(intervalId);
}
