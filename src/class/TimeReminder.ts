export class TimeReminder {
  interval: number;
  timerId = 0;

  constructor(interval: number) {
    this.interval = interval;
  }

  setReminder(cb: (timeStamp: number) => void): void {
    this.timerId = window.setInterval(cb, this.interval);
  }

  removeReminder(): void {
    window.clearInterval(this.timerId);
  }
}
