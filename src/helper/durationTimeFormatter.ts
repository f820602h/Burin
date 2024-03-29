export type DurationTimeObject = {
  totalMilliseconds: number;
  hours: number;
  minutes: number;
  seconds: number;
  hoursText: string;
  minutesText: string;
  secondsText: string;
  completeText: string;
};

export function durationTimeFormatter(
  milliseconds: number,
): DurationTimeObject {
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  const hours = Math.max(Math.floor(milliseconds / hour), 0);
  const minutes = Math.max(Math.floor((milliseconds % hour) / minute), 0);
  const seconds = Math.max(
    Math.floor(((milliseconds % hour) % minute) / second),
    0,
  );

  const hoursText = String(hours).padStart(2, "0");
  const minutesText = String(minutes).padStart(2, "0");
  const secondsText = String(seconds).padStart(2, "0");
  const completeText = `${hoursText} hour ${minutesText} min ${secondsText} sec`;

  return {
    totalMilliseconds: milliseconds,
    hours,
    minutes,
    seconds,
    hoursText,
    minutesText,
    secondsText,
    completeText,
  };
}
