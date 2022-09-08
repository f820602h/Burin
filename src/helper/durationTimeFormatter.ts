export type durationTimeObject = {
  hours: number;
  minutes: number;
  seconds: number;
  outputText: string;
};

export const durationTimeFormatter: (
  milliseconds: number
) => durationTimeObject = (milliseconds) => {
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  const hours = Math.max(Math.floor(milliseconds / hour), 0);
  const minutes = Math.max(Math.floor((milliseconds % hour) / minute), 0);
  const seconds = Math.max(
    Math.floor(((milliseconds % hour) % minute) / second),
    0
  );

  const hoursText = hours ? hours + "小時" : "";
  const minutesText = minutes ? minutes + "分鐘" : "";
  const secondsText = hours ? "" : seconds + "秒";
  const outputText = hoursText + minutesText + secondsText;

  return {
    hours,
    minutes,
    seconds,
    outputText,
  };
};
