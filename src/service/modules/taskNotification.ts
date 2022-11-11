declare let self: ServiceWorkerGlobalScope;

type TaskNotificationData = {
  taskName: string;
  startTime: number;
  intervalMinutes: number;
};

let afterTimes = 0;
let intervalId = 0;

function calcAfterTimes(data: TaskNotificationData): number {
  const now = new Date().getTime();
  const duration = Math.max(now - data.startTime, 0);
  return Math.floor(duration / (data.intervalMinutes * 1000));
}

function initAfterTimes(data: TaskNotificationData): void {
  afterTimes = calcAfterTimes(data);
}

function sendNotification(data: TaskNotificationData): void {
  intervalId = self.setInterval(() => {
    const newAfterTimes = calcAfterTimes(data);
    if (afterTimes < newAfterTimes) {
      afterTimes = newAfterTimes;
      self.registration.showNotification("Burin", {
        body: `${data.taskName} 已經進行 ${
          data.intervalMinutes * afterTimes
        } 分鐘囉！`,
      });
    }
  }, 500);
}

export function subscribeTaskNotification(data: TaskNotificationData): void {
  initAfterTimes(data);
  sendNotification(data);
}

export function unsubscribeTaskNotification(): void {
  afterTimes = 0;
  self.clearInterval(intervalId);
}
