declare let self: ServiceWorkerGlobalScope;

type TaskNotificationData = {
  taskName: string;
  startTime: number;
  intervalMinutes: number;
};

let afterTimes = 0;
let intervalId = 0;

const calcAfterTimes: (data: TaskNotificationData) => number = (data) => {
  const now = new Date().getTime();
  const duration = Math.max(now - data.startTime, 0);
  return Math.floor(duration / (data.intervalMinutes * 1000));
};

const initAfterTimes: (data: TaskNotificationData) => void = (data) => {
  afterTimes = calcAfterTimes(data);
};

const sendNotification: (data: TaskNotificationData) => void = (data) => {
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
};

export const subscribeTaskNotification: (data: TaskNotificationData) => void = (
  data
) => {
  initAfterTimes(data);
  sendNotification(data);
};

export const unsubscribeTaskNotification: () => void = () => {
  afterTimes = 0;
  self.clearInterval(intervalId);
};
