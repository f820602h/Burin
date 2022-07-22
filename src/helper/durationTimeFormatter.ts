type durationTimeObject = {
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

  const hours = Math.floor(milliseconds / hour);
  const minutes = Math.floor((milliseconds % hour) / minute);
  const seconds = Math.floor(((milliseconds % hour) % minute) / second);

  const hoursText = hours ? hours + "小時" : "";
  const minutesText = minutes ? minutes + "分鐘" : "";
  const secondsText = hours || minutes ? "" : seconds + "秒";
  const outputText = hoursText + minutesText + secondsText;

  return {
    hours,
    minutes,
    seconds,
    outputText,
  };
};
